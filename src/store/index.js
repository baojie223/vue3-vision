import { createStore } from 'vuex'

const store = createStore({
  state: {
    components: [
      {
        id: 1,
        tag: 'a-button',
        attrs: { type: 'primary', disabled: false },
        children: '这是按钮',
        style: {
          w: 200,
          h: 200,
          x: 100,
          y: 100,
        },
      },
    ],
    currentComponent: null,
  },
  mutations: {
    addComponent(state, payload) {
      state.components.push(payload)
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
  },
})

export default store
