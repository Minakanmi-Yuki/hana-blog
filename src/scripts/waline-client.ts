import stylesheetUrl from '@waline/client/style?url'

export { init } from '@waline/client'

let stylesheet: Promise<void> | undefined

export function loadStyles() {
  if (stylesheet) return stylesheet

  stylesheet = new Promise<void>((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = stylesheetUrl
    link.onload = () => resolve()
    link.onerror = () => {
      link.remove()
      stylesheet = undefined
      reject(new Error('Could not load comment styles'))
    }
    document.head.append(link)
  })
  return stylesheet
}
