<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: '',
  setup() {
    const store = useStore()

    return {
      currentComponent: computed(() => store.state.currentComponent),
      updateCurrentComponent: value => store.commit('updateCurrentComponent', { key: 'style.w', value }),
    }
  },
}
</script>

<template>
  <div v-if="currentComponent">
    <a-form-item label="宽度">
      <a-input-number :value="currentComponent.style.w" :min="0" @change="updateCurrentComponent"></a-input-number>
    </a-form-item>
  </div>
</template>
