<script>
import { computed, watch, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useMouse } from '@vueuse/core'

export default {
  name: 'Wrapper',
  props: ['component'],
  setup(props) {
    const computedStyle = computed(() => ({
      ...props.component.style,
    }))

    const store = useStore()

    const isActive = computed(() => store.state.currentComponent === props.component)

    const isMoving = ref(false)
    const offset = reactive({
      x: 0,
      y: 0,
    })

    const { x, y } = useMouse()

    watch(
      () => [x, y],
      () => {
        if (isMoving.value) {
          store.commit('setCurrentComponentStyle', props.component.style)
        }
      }
    )

    function onWrapperClick() {
      isMoving.value = true
      offset.x = x
      offset.y = y
      store.commit('setCurrentComponent', props.component)
    }

    function onWrapperMouseUp() {
      isMoving.value = false
    }

    return {
      computedStyle,
      isActive,

      onWrapperClick,
      onWrapperMouseUp,
    }
  },
}
</script>

<template>
  <div class="relative m-2" :style="computedStyle" @mousedown.stop="onWrapperClick" @mouseup="onWrapperMouseUp">
    <component v-bind="component.attrs" :is="component.tag">
      {{ component.children }}
    </component>
    <div
      class="absolute top-0 left-0 w-full h-full bg-gray-100 cursor-move select-none"
      :class="{ 'opacity-50': isActive, 'opacity-0': !isActive }"
    ></div>
  </div>
</template>
