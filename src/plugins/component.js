const component = {
  install(app) {
    const ctx = require.context('../components/', true, /\.vue$/)
    ctx.keys().forEach(comp => {
      const option = ctx(comp).default
      app.component('X' + option.name, option)
    })
  },
}

export default component
