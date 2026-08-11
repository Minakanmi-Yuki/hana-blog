#!/usr/bin/env node
import { execFileSync, spawnSync } from 'node:child_process'
import { mkdir, mkdtemp, readdir, rm, stat } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import sharp from 'sharp'

const DEFAULT_REPO = 'git@github.com:Minakanmi-Yuki/picx-images-hosting.git'
const DEFAULT_BRANCH = 'master'
const DEFAULT_BASE_URL = 'https://pic.hana0721.top'
const IMAGE_EXTENSIONS = new Set(['.avif', '.jpeg', '.jpg', '.png', '.webp'])

const printHelp = () => {
  console.log(`用法：
  pnpm images:upload -- <图片或目录> [...更多图片或目录]

选项：
  --quality <1-100>       WebP 质量，默认 80
  --remote-dir <目录>     图床仓库中的目标目录，默认根目录
  --repo <SSH 地址>       图床仓库，默认 ${DEFAULT_REPO}
  --branch <分支>         目标分支，默认 ${DEFAULT_BRANCH}
  --pages-branch <分支>   GitHub Pages 分支，默认 gh-pages
  --base-url <地址>       输出链接前缀，默认 ${DEFAULT_BASE_URL}
  --no-pages              只推送图片分支，不同步 GitHub Pages
  --dry-run               只转换并打印结果，不 clone、commit 或 push
  --keep-temp              保留临时目录，便于排查问题
  -h, --help              显示帮助

也可以使用环境变量：PICX_REPO、PICX_BRANCH、PICX_PAGES_BRANCH、PICX_BASE_URL、PICX_REMOTE_DIR。
`)
}

const parseArgs = (args) => {
  const options = {
    baseUrl: process.env.PICX_BASE_URL || DEFAULT_BASE_URL,
    branch: process.env.PICX_BRANCH || DEFAULT_BRANCH,
    deployPages: true,
    dryRun: false,
    keepTemp: false,
    pagesBranch: process.env.PICX_PAGES_BRANCH || 'gh-pages',
    quality: 80,
    remoteDir: process.env.PICX_REMOTE_DIR || '',
    repo: process.env.PICX_REPO || DEFAULT_REPO,
    inputs: []
  }

  const valueOptions = new Map([
    ['--base-url', 'baseUrl'],
    ['--branch', 'branch'],
    ['--pages-branch', 'pagesBranch'],
    ['--quality', 'quality'],
    ['--remote-dir', 'remoteDir'],
    ['--repo', 'repo']
  ])

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]

    if (arg === '--') {
      continue
    }

    if (arg === '-h' || arg === '--help') {
      printHelp()
      process.exit(0)
    }

    if (arg === '--dry-run') {
      options.dryRun = true
      continue
    }

    if (arg === '--keep-temp') {
      options.keepTemp = true
      continue
    }

    if (arg === '--no-pages') {
      options.deployPages = false
      continue
    }

    const optionName = valueOptions.get(arg)
    if (optionName) {
      const value = args[index + 1]
      if (!value || value.startsWith('-')) {
        throw new Error(`${arg} 需要一个参数`)
      }
      options[optionName] = value
      index += 1
      continue
    }

    if (arg.startsWith('-')) {
      throw new Error(`未知选项：${arg}`)
    }

    options.inputs.push(arg)
  }

  options.quality = Number(options.quality)
  if (!Number.isInteger(options.quality) || options.quality < 1 || options.quality > 100) {
    throw new Error('--quality 必须是 1 到 100 之间的整数')
  }

  if (!options.inputs.length) {
    throw new Error('至少需要提供一个图片文件或目录；使用 --help 查看用法')
  }

  return options
}

const normalizeRemoteDir = (remoteDir) => {
  const normalized = remoteDir.replaceAll('\\', '/').replace(/^\/+|\/+$/g, '')
  if (!normalized) {
    return ''
  }
  if (
    path.posix.isAbsolute(remoteDir.replaceAll('\\', '/')) ||
    normalized.split('/').some((part) => !part || part === '..' || part === '.')
  ) {
    throw new Error('--remote-dir 不能包含空目录名、. 或 ..')
  }
  return normalized
}

const collectImages = async (inputPath, images = []) => {
  const inputStat = await stat(inputPath)

  if (inputStat.isFile()) {
    if (IMAGE_EXTENSIONS.has(path.extname(inputPath).toLowerCase())) {
      images.push(inputPath)
    }
    return images
  }

  if (!inputStat.isDirectory()) {
    return images
  }

  const entries = await readdir(inputPath, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.isSymbolicLink()) {
      continue
    }
    await collectImages(path.join(inputPath, entry.name), images)
  }
  return images
}

const getPicxHash = () => {
  // PicX v3 uses Number(Math.random().toString().substring(2, 4) + Date.now()).toString(36).
  return Number(`${Math.random().toString().substring(2, 4)}${Date.now()}`).toString(36)
}

const getOutputName = (sourcePath, usedNames) => {
  const sourceName = path.basename(sourcePath)
  const extensionIndex = sourceName.lastIndexOf('.')
  const originalName = sourceName.slice(0, extensionIndex).trim().replaceAll(' ', '-')

  let outputName
  do {
    outputName = `${originalName}.${getPicxHash()}.webp`
  } while (usedNames.has(outputName))

  usedNames.add(outputName)
  return outputName
}

const runGit = (args, cwd) => {
  execFileSync('git', args, { cwd, stdio: 'inherit' })
}

const getRemoteBranchHash = (branch, cwd) => {
  const output = execFileSync('git', ['ls-remote', 'origin', `refs/heads/${branch}`], {
    cwd,
    encoding: 'utf8'
  })
  return output.trim().split(/\s+/)[0] || ''
}

const getGitConfig = (key) => {
  const result = spawnSync('git', ['config', '--get', key], { encoding: 'utf8' })
  return result.status === 0 ? result.stdout.trim() : ''
}

const prepareGitIdentity = (cwd) => {
  const name = process.env.PICX_GIT_NAME || getGitConfig('user.name') || 'Image uploader'
  const email =
    process.env.PICX_GIT_EMAIL || getGitConfig('user.email') || 'image-uploader@localhost'
  runGit(['config', 'user.name', name], cwd)
  runGit(['config', 'user.email', email], cwd)
}

const toUrl = (baseUrl, relativePath) => {
  const encodedPath = relativePath.split(path.sep).map(encodeURIComponent).join('/')
  return `${baseUrl.replace(/\/+$/, '')}/${encodedPath}`
}

const main = async () => {
  const options = parseArgs(process.argv.slice(2))
  options.remoteDir = normalizeRemoteDir(options.remoteDir)

  const sourceImages = []
  for (const input of options.inputs) {
    const inputPath = path.resolve(input)
    try {
      await collectImages(inputPath, sourceImages)
    } catch (error) {
      throw new Error(`无法读取 ${inputPath}：${error.message}`)
    }
  }

  const uniqueImages = [...new Set(sourceImages)]
  if (!uniqueImages.length) {
    throw new Error('没有找到支持的图片（支持 .png、.jpg、.jpeg、.webp、.avif）')
  }

  const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'hana-blog-image-host-'))
  let keepTemp = options.keepTemp

  try {
    const workingTree = path.join(tempRoot, 'repo')
    if (options.dryRun) {
      await mkdir(workingTree, { recursive: true })
    } else {
      console.log(`正在 clone 图床仓库（${options.branch}）...`)
      runGit(
        ['clone', '--depth', '1', '--branch', options.branch, options.repo, workingTree],
        tempRoot
      )
      prepareGitIdentity(workingTree)
    }

    const outputDir = path.join(workingTree, options.remoteDir)
    await mkdir(outputDir, { recursive: true })

    const usedNames = new Set(await readdir(outputDir))
    const uploads = []
    for (const sourcePath of uniqueImages) {
      const outputName = getOutputName(sourcePath, usedNames)
      const outputPath = path.join(outputDir, outputName)

      await sharp(sourcePath).rotate().webp({ quality: options.quality }).toFile(outputPath)

      const relativePath = path.relative(workingTree, outputPath)
      const sourceSize = (await stat(sourcePath)).size
      const outputSize = (await stat(outputPath)).size
      uploads.push({
        outputName,
        relativePath,
        sourcePath,
        sourceSize,
        outputSize,
        url: toUrl(options.baseUrl, relativePath)
      })
    }

    if (!options.dryRun) {
      const relativePaths = uploads.map((upload) => upload.relativePath)
      runGit(['add', '--', ...relativePaths], workingTree)
      runGit(['commit', '-m', `images: upload ${uploads.length} webp`], workingTree)
      console.log('正在推送到 GitHub...')
      runGit(['push', 'origin', options.branch], workingTree)
      if (options.deployPages) {
        console.log(`正在同步 GitHub Pages（${options.pagesBranch}）...`)
        const pagesHash = getRemoteBranchHash(options.pagesBranch, workingTree)
        const lease = pagesHash
          ? `--force-with-lease=refs/heads/${options.pagesBranch}:${pagesHash}`
          : null
        runGit(
          ['push', 'origin', ...(lease ? [lease] : []), `HEAD:${options.pagesBranch}`],
          workingTree
        )
      }
    }

    const completionMessage = options.dryRun
      ? '转换完成（dry-run，未推送）'
      : options.deployPages
        ? '上传并部署完成'
        : '上传完成'
    console.log(`\n${completionMessage}：`)
    for (const upload of uploads) {
      const ratio = ((1 - upload.outputSize / upload.sourceSize) * 100).toFixed(1)
      console.log(
        `${upload.sourcePath} -> ${upload.outputName} ` +
          `(${formatBytes(upload.sourceSize)} -> ${formatBytes(upload.outputSize)}, ${ratio}%)\n` +
          upload.url
      )
    }

    if (keepTemp) {
      console.log(`\n临时目录已保留：${tempRoot}`)
    }
  } finally {
    if (!keepTemp) {
      await rm(tempRoot, { recursive: true, force: true })
    }
  }
}

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

main().catch((error) => {
  console.error(`\n失败：${error.message}`)
  process.exitCode = 1
})
