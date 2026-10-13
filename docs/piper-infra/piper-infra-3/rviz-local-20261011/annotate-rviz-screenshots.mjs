import fs from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '../../../..')
if (!process.argv[2]) {
  throw new Error('用法：node annotate-rviz-screenshots.mjs <本地原始截图目录>')
}
const assetDir = path.resolve(process.argv[2])
const require = createRequire(path.join(root, 'package.json'))
const sharp = require('sharp')
const width = 1850
const screenshotHeight = 1016
const color = '#087f70'
const amber = '#b65c0b'
const font = 'Noto Sans CJK SC, sans-serif'

const escape = (value) =>
  String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

function box(x, y, w, h, stroke = color) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="none" stroke="white" stroke-width="8"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="none" stroke="${stroke}" stroke-width="4"/>`
}

function badge(value, x, y, fill = color, radius = 21) {
  return `<circle cx="${x}" cy="${y}" r="${radius}" fill="${fill}" stroke="white" stroke-width="3"/><text x="${x}" y="${y + 9}" text-anchor="middle" fill="white" font-family="${font}" font-size="27" font-weight="700">${escape(value)}</text>`
}

function leader(points, stroke = color, arrow = true) {
  return `<polyline points="${points}" fill="none" stroke="white" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><polyline points="${points}" fill="none" stroke="${stroke}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"${arrow ? ' marker-end="url(#arrow)"' : ''}/>`
}

const figures = [
  {
    input: 'rviz-overview.png',
    output: 'rviz-interface-annotated',
    title: 'RViz 界面：先找到模型、规划面板与视角工具',
    subtitle: '官方本地 MoveIt 演示 · Piper + agx_gripper',
    marks:
      box(4, 59, 684, 302) +
      box(4, 372, 684, 412) +
      box(4, 800, 684, 187) +
      box(8, 23, 353, 33) +
      box(726, 71, 1096, 906) +
      badge('A', 710, 91) +
      badge('B', 710, 393) +
      badge('C', 710, 825) +
      badge('D', 385, 39) +
      badge('E', 1788, 102),
    items: [
      ['A', 'Displays：模型、坐标系与显示选项'],
      ['B', 'MotionPlanning：选择目标、规划和执行'],
      ['C', 'Views：当前视角与观察距离'],
      ['D', '工具栏：Interact 操作目标，Move Camera 调整视角'],
      ['E', '三维视图：观察机械臂、目标姿态与规划轨迹']
    ],
    note: 'Move Camera / Orbit：左键旋转，中键平移，滚轮缩放。Fixed Frame 使用 base_link。'
  },
  {
    input: 'rviz-overview.png',
    output: 'rviz-overview-annotated',
    title: '操作 1：选择机械臂目标，并拖动末端标记',
    subtitle: '按图中 1 → 5 操作；箭头标出本次向上拖动的方向',
    marks:
      box(187, 487, 150, 30) +
      badge(1, 165, 502) +
      box(187, 539, 150, 80) +
      badge(2, 165, 554) +
      box(507, 515, 156, 53) +
      badge(3, 686, 530) +
      box(9, 23, 91, 34) +
      badge(4, 400, 39) +
      leader('378,51 364,56 101,56', color, false) +
      box(1306, 283, 51, 91, amber) +
      badge(5, 1452, 306, amber) +
      leader('1430,306 1360,306', amber, false) +
      '<path d="M 1374 333 L 1374 240" fill="none" stroke="white" stroke-width="13" stroke-linecap="round"/><path d="M 1374 333 L 1374 240" fill="none" stroke="#b65c0b" stroke-width="8" stroke-linecap="round" marker-end="url(#drag-arrow)"/>',
    items: [
      ['1', 'Planning Group 选择 arm'],
      ['2', 'Start State 选 <current>；Goal State 选 home'],
      ['3', 'Velocity / Accel. Scaling 都设为 0.10'],
      ['4', '点击工具栏中的 Interact'],
      ['5', '拖动框出的红色箭头，让目标末端向上移动']
    ],
    note: '彩色箭头改变末端位置，圆环改变朝向。本次示例使用箭头调整位置。'
  },
  {
    input: 'rviz-plan-trail.png',
    output: 'rviz-plan-trail-annotated',
    title: '操作 2：点击 Plan，并查看轨迹中的沿途姿态',
    subtitle: '本图展示规划完成后开启 Show Trail 的界面',
    marks:
      box(26, 465, 150, 29) +
      badge(1, 24, 480) +
      box(59, 153, 307, 21) +
      badge(2, 391, 164) +
      box(344, 171, 336, 22) +
      badge(3, 704, 181) +
      box(1407, 474, 148, 85) +
      badge(4, 1634, 614) +
      leader('1611,602 1543,557'),
    items: [
      ['1', '点击 Plan，生成并预览轨迹'],
      ['2', '在 Displays → MotionPlanning → Planned Path\n勾选 Show Trail'],
      ['3', 'Trail Step Size 设为 10'],
      ['4', '观察叠影，查看机械臂经过的姿态']
    ],
    note: 'Plan 完成后 Execute 按钮可用；右侧叠影展示本次规划的轨迹。'
  },
  {
    input: 'rviz-arm-executed.png',
    output: 'rviz-arm-executed-annotated',
    title: '操作 3：执行机械臂轨迹，并查看完成状态',
    subtitle: '本图展示本地演示中点击 Execute 后的完成状态',
    marks:
      box(26, 492, 150, 29) +
      badge(1, 24, 507) +
      box(27, 572, 148, 22) +
      badge(2, 24, 583) +
      badge(3, 1585, 708) +
      leader('1564,696 1260,586'),
    items: [
      ['1', '轨迹预览完成后，点击 Execute'],
      ['2', '执行完成后，状态显示 Executed'],
      ['3', '观察模型更新到执行后的姿态']
    ],
    note: '截图取自执行完成之后，此时 Execute 已变灰。此处执行的是本地虚拟机械臂。'
  },
  {
    input: 'rviz-gripper-executed.png',
    output: 'rviz-gripper-executed-annotated',
    title: '操作 4：切换夹爪规划组，执行半开目标',
    subtitle: '本图展示 gripper_half 目标执行完成后的界面',
    marks:
      box(187, 487, 150, 30) +
      badge(1, 165, 502) +
      box(187, 591, 150, 29) +
      badge(2, 165, 606) +
      box(26, 465, 150, 56) +
      badge(3, 24, 490) +
      box(27, 572, 148, 22) +
      badge(4, 24, 583) +
      box(1410, 329, 188, 157) +
      badge(4, 1625, 329),
    items: [
      ['1', 'Planning Group 切换为 gripper'],
      ['2', 'Goal State 选择 gripper_half'],
      ['3', '先点击 Plan，再点击 Execute'],
      ['4', '查看 Executed，并观察夹爪的半开状态']
    ],
    note: 'Start State 保持 <current>。截图取自执行完成之后，此时 Execute 已变灰。'
  }
]

for (const figure of figures) {
  const sourcePath = path.join(assetDir, figure.input)
  const original = await fs.readFile(sourcePath)
  const metadata = await sharp(original).metadata()
  if (metadata.width !== width || metadata.height !== screenshotHeight) {
    throw new Error(`Unexpected screenshot dimensions: ${figure.input}`)
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${screenshotHeight}" viewBox="0 0 ${width} ${screenshotHeight}">
<defs><marker id="arrow" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L12,6 L0,12 Z" fill="${color}"/></marker><marker id="drag-arrow" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="4" markerHeight="4" orient="auto"><path d="M0,0 L12,6 L0,12 Z" fill="${amber}"/></marker></defs>
<image width="${width}" height="${screenshotHeight}" href="data:image/png;base64,${original.toString('base64')}"/>
${figure.marks}
</svg>`
  await fs.writeFile(path.join(assetDir, `${figure.output}.svg`), svg)
  await sharp(Buffer.from(svg))
    .png()
    .toFile(path.join(assetDir, `${figure.output}.png`))
  console.log(`${figure.output}.png ${width}x${screenshotHeight}`)
}

await fs.writeFile(
  path.join(here, 'annotation-manifest.json'),
  `${JSON.stringify(
    {
      screenshotPixels:
        'Original screenshot embedded unchanged at 1850x1016; only SVG boxes, badges and arrows added as a separate layer, with no added title, legend or caption text.',
      generator: path.basename(fileURLToPath(import.meta.url)),
      figures: figures.map(({ input, output, title, items, note }) => ({
        input,
        output,
        title,
        items,
        note
      }))
    },
    null,
    2
  )}\n`
)
