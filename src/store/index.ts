import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  components: any[]
  currentComponent: any
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    components: [],
    currentComponent: null
  },
  mutations: {
    setCurrentComponent(state, payload) {
      state.currentComponent = payload
    },
    setCurrentComponentStyle(state, payload) {
      state.currentComponent.style = payload
    }
  }
})

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key)
}
