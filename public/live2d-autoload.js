// Live2D async autoload (customized for local Miku model)
const live2d_path = 'https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/'

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

if (screen.width >= 768) {
  Promise.all([
    loadExternalResource(live2d_path + 'waifu.css', 'css'),
    loadExternalResource(live2d_path + 'live2d.min.js', 'js'),
    loadExternalResource(live2d_path + 'waifu-tips.js', 'js')
  ]).then(() => {
    // force default model to index 0 (our local miku)
    localStorage.setItem('modelId', '0')
    localStorage.setItem('modelTexturesId', '0')

    initWidget({
      waifuPath: live2d_path + 'waifu-tips.json',
      cdnPath: '/live2d-api/',
      tools: ['hitokoto', 'photo', 'info', 'quit']
    })
  })
}
