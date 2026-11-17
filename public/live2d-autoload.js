// Desktop auto-start. Only this widget's draw loop is capped; native RAF stays untouched.
;(() => {
  if (window.__hanaLive2D?.booting || window.__hanaLive2D?.loaded) return
  const config = document.currentScript.dataset
  const desktop = window.matchMedia('(min-width: 768px)')
  let draw = null
  let frame = null
  const frameInterval = 1000 / 120
  let nextDraw = null
  let inViewport = true
  let pageActive = true
  let observer = null
  const listeners = new AbortController()
  const eventOptions = { signal: listeners.signal }

  function canDraw() {
    return pageActive && !document.hidden && desktop.matches && inViewport
  }

  function cancelFrame() {
    if (frame !== null) window.cancelAnimationFrame(frame)
    frame = null
  }

  function tick(timestamp) {
    frame = null
    if (!draw || !canDraw()) return
    if (nextDraw === null || timestamp >= nextDraw - 0.1) {
      // Keep the cadence on screens such as 144Hz instead of dropping to every second frame.
      // Discard missed frames after a stall rather than trying to catch up in a burst.
      nextDraw =
        nextDraw === null || timestamp - nextDraw >= frameInterval
          ? timestamp + frameInterval
          : nextDraw + frameInterval
      draw()
    }
    frame = window.requestAnimationFrame(tick)
  }

  function syncVisibility() {
    cancelFrame()
    nextDraw = null
    if (draw && canDraw()) frame = window.requestAnimationFrame(tick)
  }

  const controller = {
    booting: true,
    loaded: false,
    prepareCanvas(canvas) {
      // CSS remains 300x300. Avoid oversized buffers on 1x screens and >2x supersampling.
      const ratio = Math.min(Math.max(window.devicePixelRatio || 1, 1), 2)
      const size = Math.round(300 * ratio)
      if (canvas.width !== size) canvas.width = size
      if (canvas.height !== size) canvas.height = size
    },
    start(callback, canvas) {
      draw = callback
      observer?.disconnect()
      if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting === inViewport) return
          inViewport = entry.isIntersecting
          syncVisibility()
        })
        observer.observe(canvas)
      }
      syncVisibility()
    }
  }
  window.__hanaLive2D = controller
  document.addEventListener('visibilitychange', syncVisibility, eventOptions)
  desktop.addEventListener('change', syncVisibility, eventOptions)
  window.addEventListener(
    'pagehide',
    () => {
      pageActive = false
      cancelFrame()
    },
    eventOptions
  )
  window.addEventListener(
    'pageshow',
    () => {
      pageActive = true
      syncVisibility()
    },
    eventOptions
  )

  function loadResource(url, type) {
    return new Promise((resolve, reject) => {
      const element = document.createElement(type === 'css' ? 'link' : 'script')
      if (type === 'css') {
        element.rel = 'stylesheet'
        element.href = url
      } else {
        element.src = url
        element.async = true
      }
      element.onload = resolve
      element.onerror = () => {
        element.remove()
        reject(new Error(`Live2D resource failed: ${url}`))
      }
      document.head.appendChild(element)
    })
  }

  ;(async () => {
    try {
      await Promise.all([loadResource(config.style, 'css'), loadResource(config.engine, 'js')])
      await loadResource(config.widget, 'js')
      if (typeof window.initWidget !== 'function')
        throw new Error('Live2D widget did not initialize')

      // Preserve model index 0 (the existing local Shizuku). Auto-show on each new page.
      localStorage.setItem('modelId', '0')
      localStorage.setItem('modelTexturesId', '0')
      localStorage.removeItem('waifu-display')
      window.initWidget({
        waifuPath: config.messages,
        cdnPath: config.modelPath,
        tools: ['hitokoto', 'photo', 'info', 'quit']
      })
      controller.booting = false
      controller.loaded = true
      window.dispatchEvent(new Event('live2d:ready'))
    } catch (error) {
      controller.booting = false
      cancelFrame()
      observer?.disconnect()
      listeners.abort()
      console.error('[live2d] widget failed to load', error)
      window.dispatchEvent(new Event('live2d:error'))
    }
  })()
})()
