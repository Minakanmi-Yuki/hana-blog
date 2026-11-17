import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

// Event/clock fixtures exercise the actual loader without claiming a real GPU benchmark.
const loader = readFileSync(new URL('../public/live2d-autoload.js', import.meta.url), 'utf8')
const component = readFileSync(
  new URL('../src/components/basic/Live2D.astro', import.meta.url),
  'utf8'
)
const script = ts.transpileModule(component.match(/<script>([\s\S]*?)<\/script>/)[1], {
  compilerOptions: { target: ts.ScriptTarget.ES2022 }
}).outputText

function fixture({ hidden = false, desktop = true, ratio = 2 } = {}) {
  let time = 0
  let id = 0
  let draws = 0
  let initCalls = 0
  let fail = false
  const pending = new Map()
  const idle = []
  const requested = []
  const storage = new Map([['waifu-display', 'closed']])
  const media = Object.assign(new EventTarget(), { matches: desktop })
  const observers = []
  const canvas = { width: 800, height: 800, toDataURL: () => 'data:image/png;base64,fixture' }
  const dataset = {
    source: '/live2d-autoload.js?v=test',
    engine: '/_astro/engine.js',
    widget: '/_astro/widget.js',
    style: '/_astro/widget.css',
    messages: '/_astro/messages.json',
    modelPath: '/live2d-api/'
  }
  class Element extends EventTarget {
    dataset = {}
    remove() {}
    setAttribute() {}
    click() {
      this.clicked = true
    }
  }
  class IntersectionObserver {
    constructor(callback) {
      this.callback = callback
      observers.push(this)
    }
    observe() {}
    disconnect() {
      this.disconnected = true
    }
    emit(isIntersecting) {
      this.callback([{ isIntersecting }])
    }
  }
  const window = Object.assign(new EventTarget(), {
    devicePixelRatio: ratio,
    matchMedia: () => media,
    IntersectionObserver,
    requestAnimationFrame: (callback) => {
      pending.set(++id, callback)
      return id
    },
    cancelAnimationFrame: (handle) => pending.delete(handle),
    requestIdleCallback: (callback) => {
      idle.push(callback)
    }
  })
  const nativeRaf = window.requestAnimationFrame
  const document = Object.assign(new EventTarget(), {
    hidden,
    currentScript: { dataset },
    querySelector: () => ({ dataset }),
    createElement: () => new Element(),
    body: { appendChild: (element) => requested.push(element) },
    head: {
      appendChild: (element) => {
        requested.push(element)
        queueMicrotask(() => {
          if (fail) {
            element.onerror()
            return
          }
          if (element.src === dataset.widget) {
            window.initWidget = (options) => {
              initCalls++
              assert.equal(options.cdnPath, '/live2d-api/')
              window.__hanaLive2D.prepareCanvas(canvas)
              window.__hanaLive2D.start(() => {
                draws++
              }, canvas)
            }
          }
          element.onload()
        })
      }
    }
  })
  const context = vm.createContext({
    window,
    document,
    IntersectionObserver,
    AbortController,
    Event,
    console: { error() {} },
    canvas,
    modelDraws: 0,
    localStorage: {
      setItem: (key, value) => storage.set(key, value),
      removeItem: (key) => storage.delete(key)
    }
  })
  return {
    window,
    document,
    media,
    canvas,
    idle,
    requested,
    observers,
    storage,
    context,
    pending,
    nativeRaf,
    get draws() {
      return draws
    },
    get initCalls() {
      return initCalls
    },
    fail: (value) => {
      fail = value
    },
    load: async () => {
      vm.runInContext(loader, context)
      await new Promise(setImmediate)
    },
    advance(rate, count) {
      for (let i = 0; i < count; i++) {
        time += 1000 / rate
        const callbacks = [...pending.values()]
        pending.clear()
        callbacks.forEach((callback) => callback(time))
      }
    }
  }
}

const rates = []
for (const rate of [60, 120, 144, 240]) {
  const f = fixture()
  await f.load()
  assert.equal(f.window.requestAnimationFrame, f.nativeRaf)
  assert.equal(f.initCalls, 1)
  assert.equal(f.storage.get('modelId'), '0')
  assert.equal(f.storage.has('waifu-display'), false)
  assert.equal(f.canvas.width, 600)
  f.advance(rate, rate * 10)
  assert.ok(f.draws <= 301 && f.draws >= 280, `${rate}Hz: ${f.draws} draws`)
  rates.push({ display_hz: rate, simulated_seconds: 10, draws: f.draws })
  await f.load()
  assert.equal(f.initCalls, 1, 'duplicate loader must not initialize another renderer')
}

const f = fixture()
await f.load()
f.advance(60, 60)
const before = f.draws
f.document.hidden = true
f.document.dispatchEvent(new Event('visibilitychange'))
assert.equal(f.pending.size, 0)
f.advance(60, 600)
assert.equal(f.draws, before)
f.document.hidden = false
f.document.dispatchEvent(new Event('visibilitychange'))
f.advance(60, 1)
assert.equal(f.draws, before + 1, 'resume once without a catch-up burst')
f.observers[0].emit(false)
assert.equal(f.pending.size, 0)
f.observers[0].emit(true)
assert.equal(f.pending.size, 1)
f.window.dispatchEvent(new Event('pagehide'))
assert.equal(f.pending.size, 0)
f.window.dispatchEvent(new Event('pageshow'))
assert.equal(f.pending.size, 1)
assert.equal(f.initCalls, 1, 'back/forward cache restore must reuse the model')
f.media.matches = false
f.media.dispatchEvent(new Event('change'))
assert.equal(f.pending.size, 0)
let unrelated = 0
f.window.requestAnimationFrame(() => {
  unrelated++
})
f.advance(60, 1)
assert.equal(unrelated, 1, 'widget pausing must not replace the global scheduler')

const sizes = []
for (const ratio of [1, 1.5, 2, 3]) {
  const item = fixture({ ratio })
  await item.load()
  const expected = Math.round(300 * Math.min(ratio, 2))
  assert.equal(item.canvas.width, expected)
  assert.equal(item.canvas.height, expected)
  sizes.push({ device_pixel_ratio: ratio, backing_size: expected })
}

for (const state of [{ hidden: true }, { desktop: false }, {}]) {
  const item = fixture(state)
  vm.runInContext(script, item.context)
  assert.equal(item.requested.length, 0)
  if (state.hidden) {
    assert.equal(item.idle.length, 0)
    item.document.hidden = false
    item.document.dispatchEvent(new Event('visibilitychange'))
  }
  if (state.desktop === false) {
    assert.equal(item.idle.length, 0)
    item.media.matches = true
    item.media.dispatchEvent(new Event('change'))
  }
  assert.equal(item.idle.length, 1)
  item.idle.shift()()
  assert.equal(item.requested.length, 1, 'visible desktop must start automatically without a click')
  item.window.dispatchEvent(new Event('pageshow'))
  assert.equal(item.requested.length, 1)
}

const retry = fixture()
retry.fail(true)
await retry.load()
assert.equal(retry.window.__hanaLive2D.booting, false)
assert.equal(retry.pending.size, 0)
retry.fail(false)
await retry.load()
assert.equal(retry.initCalls, 1)

const vendor = new URL('../vendor/live2d/0.9.2/', import.meta.url)
const provenance = JSON.parse(readFileSync(new URL('UPSTREAM.json', vendor), 'utf8'))
for (const [file, record] of Object.entries(provenance.files)) {
  const hash = createHash('sha256')
    .update(readFileSync(new URL(file, vendor)))
    .digest('hex')
  assert.equal(hash, record.local_sha256)
}
const engine = readFileSync(new URL('live2d-lite.js', vendor), 'utf8')
let restored = engine.slice(engine.indexOf('\n') + 1)
for (const patch of [...provenance.engine_replacements].reverse()) {
  assert.equal(restored.split(patch.new).length, 2)
  restored = restored.replace(patch.new, patch.old)
}
assert.equal(
  createHash('sha256').update(restored).digest('hex'),
  provenance.files['live2d-lite.js'].upstream_sha256
)
const start = engine.indexOf('function s(){b||')
const end = engine.indexOf('function _()', start)
const photo = fixture()
await photo.load()
photo.window.Live2D = { captureFrame: true, captureName: 'photo.png' }
vm.runInContext(
  `var b=false;var C=canvas;function _(){modelDraws++}${engine.slice(start, end)}s();s();`,
  photo.context
)
photo.advance(60, 1)
assert.equal(photo.context.modelDraws, 1)
assert.equal(photo.window.Live2D.captureFrame, false)
assert.ok(photo.requested.some((element) => element.clicked && element.download === 'photo.png'))

console.log(
  JSON.stringify(
    {
      method: 'Node VM event/clock fixtures; no real GPU or browser timing measurements',
      rates,
      sizes,
      automatic_desktop_start: true,
      hidden_and_mobile_initial_load_deferred: true,
      duplicate_start_prevented: true,
      background_zero_pending_frames: true,
      viewport_pause_and_resume: true,
      bfcache_reuses_model: true,
      native_raf_unchanged: true,
      failed_load_can_retry: true,
      upstream_restoration_sha256_verified: true,
      renderer_capture_hook_works: true
    },
    null,
    2
  )
)
