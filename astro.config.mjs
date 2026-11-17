// @ts-check

import process from 'node:process'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import { defineConfig } from 'astro/config'
// Rehype & remark packages
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

// Integrations
import AstroAxiIntegration from './src/axi-integration.ts'
// Others
// import { visualizer } from 'rollup-plugin-visualizer'

// Local integrations
// Local rehype & remark plugins
import rehypeAutolinkHeadings from './src/plugins/rehype-auto-link-headings.ts'
// Shiki
import {
  addCopyButton,
  addLanguage,
  addTitle,
  transformerNotationDiff,
  transformerNotationHighlight,
  updateStyle
} from './src/plugins/shiki-transformers.ts'
import config from './src/site.config.ts'

const platform = process.env.DEPLOYMENT_PLATFORM || (process.env.CF_PAGES ? 'cloudflare' : 'vercel')
/** @type {Record<string, string>} */
const siteUrls = {
  vercel: 'https://hana-blog.top/',
  cloudflare: 'https://hana-blog.pages.dev/',
  github: 'https://hana-blog.github.io/'
}

// https://astro.build/config
export default defineConfig({
  // Top-Level Options
  site: process.env.SITE_URL || siteUrls[platform] || siteUrls.vercel,
  // base: '/docs',
  trailingSlash: 'never',

  // Internationalization
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
    routing: {
      prefixDefaultLocale: false
    }
  },

  // Every route, including RSS, is generated once at build time and served by the CDN.
  output: 'static',

  // Shared styles are downloaded once and reused across the whole archive.
  build: {
    inlineStylesheets: 'never'
  },

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },

  integrations: [
    // astro-axi will automatically add sitemap, mdx & tailwind
    // sitemap(),
    // mdx(),
    // tailwind({ applyBaseStyles: false }),
    AstroAxiIntegration(config)
    // (await import('@playform/compress')).default({
    //   SVG: false,
    //   Exclude: ['index.*.js']
    // }),
  ],
  // root: './my-project-directory',

  // Prefetch Options
  prefetch: false,
  // Server Options
  server: {
    host: true
  },
  // Markdown Options
  markdown: {
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [
      rehypeHeadingIds,
      [rehypeKatex, {}],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { className: ['anchor'] },
          content: { type: 'text', value: '#' }
        }
      ]
    ],
    remarkRehype: {
      footnoteLabel: '脚注',
      footnoteBackLabel: '返回内容',
      footnoteBackContent: '↑'
    },
    // https://docs.astro.build/en/guides/syntax-highlighting/
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        updateStyle(),
        addTitle(),
        addLanguage(),
        addCopyButton(2000)
      ]
    }
  },
  vite: {
    build: {
      // Keep shared scripts and small assets cacheable instead of repeating them in HTML.
      assetsInlineLimit: 0
    }
    // plugins: [
    //   visualizer({
    //     emitFile: true,
    //     filename: 'stats.html'
    //   })
    // ]
  }
})
