import { random } from 'lodash'
import { createStore } from 'vuex'

export function parsePath(path) {
  const segments = path.split('.')
  return function(obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}

const store = createStore({
  state: {
    components: [],
    currentComponent: null,
    originalComponents: {},
  },
  getters: {
    sortedComponents: state => {
      return state.components.map((item, index) => {
        let zIndex = index + 1
        if (item.uid === state.currentComponent?.uid) zIndex = 999
        return {
          ...item,
          style: {
            ...item.style,
            zIndex,
          },
        }
      })
    },
  },
  mutations: {
    addComponent(state, key) {
      const component = state.originalComponents[key]
      component.uid = String(random(0, Number.MAX_SAFE_INTEGER))
      component.name = key
      state.components.unshift(component)
    },
    setCurrentComponent(state, payload) {
      state.currentComponent = payload
    },
    setCurrentComponentStyle(state, payload) {
      state.currentComponent.style = {
        ...state.currentComponent.style,
        ...payload,
      }
    },
    addOriginalComponent: (state, { key, value }) => {
      state.originalComponents[key] = value
    },

    updateCurrentComponent: (state, { key, value }) => {
      state.currentComponent.style.w = value
    },
  },
})

export default store
