import { random } from 'lodash'
import { createStore } from 'vuex'

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
  },
})

export default store
