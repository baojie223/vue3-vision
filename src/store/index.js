import { createStore } from 'vuex'

const store = createStore({
  state: {
    components: [],
    currentComponent: null,
  },
  mutations: {
    setCurrentComponent(state, payload) {
      state.currentComponent = payload
    },
    setCurrentComponentStyle(state, payload) {
      state.currentComponent.style = payload
    },
  },
})

export default store
