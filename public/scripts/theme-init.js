// Applies saved design theme before first paint to prevent flash
(function () {
  try {
    var theme = localStorage.getItem('design-theme')
    if (theme) {
      var root = document.documentElement
      root.classList.forEach(function (cls) {
        if (cls.startsWith('theme-')) root.classList.remove(cls)
      })
      root.classList.add('theme-' + theme)
    }
  } catch (e) {}
})()
