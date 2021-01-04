<script>
import { computed, watch, ref, reactive } from 'vue'
import { useStore } from '@/store'
import { useMouse } from '@vueuse/core'

export default {
  name: 'Wrapper',
  props: ['component'],
  setup(props) {
    const computedStyle = computed(() => ({
      position: 'absolute',
      ...props.component.style
    }))

    const store = useStore()

    const isActive = computed(() => store.state.currentComponent === props.component)

    const isMoving = ref(false)
    const offset = reactive({
      x: 0,
      y: 0
    })

    const { x, y } = useMouse()

    watch(
      () => [x, y],
      (pos, oldVal) => {
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
      onWrapperMouseUp
    }
  }
}
</script>

<template>
  <div :style="computedStyle" @mousedown.stop="onWrapperClick" @mouseup="onWrapperMouseUp">
    <component v-bind="component.attrs" :is="component.tag">
      {{ component.children }}
    </component>
    <div class="cover" :style="{ opacity: isActive ? 0.5 : 0, cursor: 'move' }"></div>
  </div>
</template>

<style lang="less">
.cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #eee;
}
</style>
