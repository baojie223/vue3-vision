import store from '@/store'
import { kebabCase } from 'lodash'

const component = {
  install(app) {
    const ctx = require.context('../components/', true, /\.vue$/)
    ctx.keys().forEach(comp => {
      const vm = ctx(comp).default
      const name = kebabCase('X' + vm.name)
      store.commit('addOriginalComponent', { key: name, value: vm.__config })
      app.component(name, vm)
    })
  },
}

export default component
