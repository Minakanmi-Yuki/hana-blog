// Astro bundles this once; pages reuse the same fingerprinted module from the browser cache.
const deferredImages = document.querySelectorAll<HTMLImageElement>(
  'img[data-deferred-image="true"][data-src]'
)

function revealImage(image: HTMLImageElement) {
  image.src = image.dataset.src || ''
  delete image.dataset.src
  delete image.dataset.deferredImage
}

if (deferredImages.length) {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          revealImage(entry.target as HTMLImageElement)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '320px 0px' }
    )
    deferredImages.forEach((image) => observer.observe(image))
  } else {
    deferredImages.forEach(revealImage)
  }
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const finePointer = window.matchMedia('(pointer: fine)')

document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return
  const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]')
  if (!link || link.closest('toc-heading') || event.defaultPrevented) return
  if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return

  const href = link.getAttribute('href')
  if (!href || href === '#') return
  let id: string
  try {
    id = decodeURIComponent(href.slice(1))
  } catch {
    return
  }
  const target = document.getElementById(id)
  if (!target) return
  event.preventDefault()
  history.pushState(null, '', href)
  target.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' })
})

// Keep the click accent, with no staggered timers or effects on touch/reduced-motion devices.
let activeParticles = 0
document.addEventListener('click', (event) => {
  if (document.hidden || reducedMotion.matches || !finePointer.matches || activeParticles >= 12) {
    return
  }

  const fragment = document.createDocumentFragment()
  for (let i = 0; i < 6; i++) {
    const particle = document.createElement('div')
    const angle = ((Math.PI * 2) / 6) * i
    const distance = 18 + Math.random() * 8
    particle.className = `click-particle color-${i + 1}`
    particle.style.setProperty('--dx', `${Math.cos(angle) * distance}px`)
    particle.style.setProperty('--dy', `${Math.sin(angle) * distance}px`)
    particle.style.left = `${event.clientX}px`
    particle.style.top = `${event.clientY}px`
    const size = `${Math.random() * 6 + 8}px`
    particle.style.width = size
    particle.style.height = size
    activeParticles++
    particle.addEventListener(
      'animationend',
      () => {
        particle.remove()
        activeParticles--
      },
      { once: true }
    )
    fragment.appendChild(particle)
  }
  document.body.appendChild(fragment)
})
