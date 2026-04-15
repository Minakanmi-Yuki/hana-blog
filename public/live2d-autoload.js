// Live2D async autoload with multi-CDN fallback
const widgetBaseCandidates = [
  window.__LIVE2D_WIDGET_BASE__,
  'https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/',
  'https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/'
].filter(Boolean)

const localCdnPath = (() => {
  const fromWindow = window.__LIVE2D_CDN_PATH__
  if (typeof fromWindow === 'string' && fromWindow.length > 0) {
    return fromWindow.endsWith('/') ? fromWindow : `${fromWindow}/`
  }

  const script = document.currentScript
  if (script && typeof script.src === 'string' && script.src.length > 0) {
    const scriptUrl = new URL(script.src, window.location.href)
    const base = scriptUrl.pathname.replace(/live2d-autoload\.js(?:\?.*)?$/, '')
    const normalizedBase = base.endsWith('/') ? base : `${base}/`
    return `${normalizedBase}live2d-api/`
  }

  return '/live2d-api/'
})()

function loadExternalResource(url, type) {
  return new Promise((resolve, reject) => {
    let tag

    if (type === 'css') {
      tag = document.createElement('link')
      tag.rel = 'stylesheet'
      tag.href = url
    } else if (type === 'js') {
      tag = document.createElement('script')
      tag.src = url
      tag.async = true
      tag.defer = true
    }

    if (!tag) return reject(new Error(`Unsupported resource type: ${type}`))
    tag.onload = () => resolve(url)
    tag.onerror = () => reject(new Error(`Failed to load: ${url}`))
    document.head.appendChild(tag)
  })
}

async function loadWidgetBundleFromBase(base) {
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  await loadExternalResource(`${normalizedBase}waifu.css`, 'css')
  await loadExternalResource(`${normalizedBase}live2d.min.js`, 'js')
  await loadExternalResource(`${normalizedBase}waifu-tips.js`, 'js')

  if (typeof window.initWidget !== 'function') {
    throw new Error(`initWidget is not available from ${normalizedBase}`)
  }

  return normalizedBase
}

async function loadWidgetBundleWithFallback() {
  let lastError
  for (const base of widgetBaseCandidates) {
    try {
      return await loadWidgetBundleFromBase(base)
    } catch (error) {
      lastError = error
    }
  }
  throw lastError || new Error('Failed to load live2d widget bundle')
}

const minWidth = Number(window.__LIVE2D_MIN_WIDTH__ || 768)

if (window.innerWidth >= minWidth) {
  ;(async () => {
    try {
      const activeBase = await loadWidgetBundleWithFallback()

      // force default model to index 0 (our local miku)
      localStorage.setItem('modelId', '0')
      localStorage.setItem('modelTexturesId', '0')

      initWidget({
        waifuPath: `${activeBase}waifu-tips.json`,
        cdnPath: localCdnPath,
        tools: ['hitokoto', 'photo', 'info', 'quit']
      })

      // Smooth entrance: wait for widget mount, then slide in from bottom.
      const startEntrance = () => {
        const waifuEl = document.getElementById('waifu')
        if (!waifuEl) return false
        if (waifuEl.classList.contains('waifu-entered')) return true

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            waifuEl.classList.add('waifu-entered')
          })
        })
        return true
      }

      if (!startEntrance()) {
        const timer = setInterval(() => {
          if (startEntrance()) clearInterval(timer)
        }, 60)
        setTimeout(() => clearInterval(timer), 5000)
      }
    } catch (error) {
      console.error('[live2d] widget failed to load', error)
    }
  })()
}
