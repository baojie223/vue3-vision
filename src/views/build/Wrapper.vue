<script>
import { computed, ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { clone, debounce } from 'lodash'
// import { useMouse } from '@vueuse/core'

function numberToPx(number) {
  return number + 'px'
}

function pxToNumber(px) {
  return Number(px.slice(0, -2))
}

export default {
  name: 'Wrapper',
  props: ['component'],
  setup(props) {
    const style = reactive(clone(props.component.style))

    const computedStyle = computed(() => ({
      width: numberToPx(style.w),
      height: numberToPx(style.h),
      transform: `translate(${numberToPx(style.x)}, ${numberToPx(style.y)})`,
    }))

    const store = useStore()

    const isActive = computed(() => store.state.currentComponent === props.component)

    const offset = reactive({
      x: 0,
      y: 0,
    })

    const wrapperRef = ref()

    const container = reactive({
      el: null,
      w: 0,
      h: 0,
    })

    function onWrapperMouseDown(event) {
      store.commit('setCurrentComponent', props.component)
      offset.x = event.offsetX
      offset.y = event.offsetY

      document.addEventListener('mousemove', onWrapperMouseMove)
      document.addEventListener('mouseup', onWrapperMouseUp)
    }

    function onWrapperMouseMove(event) {
      const x = event.clientX - offset.x - 264,
        y = event.clientY - offset.y - 72

      if (x < 0) style.x = 0
      else if (x > container.w - style.w) style.x = container.w - style.w
      else style.x = x

      if (y < 0) style.y = 0
      else if (y > container.h - style.h) style.y = container.h - style.h
      else style.y = y
    }

    function onWrapperMouseUp() {
      document.removeEventListener('mousemove', onWrapperMouseMove)
      document.removeEventListener('mouseup', onWrapperMouseUp)
    }

    onMounted(() => {
      container.el = document.querySelector('#container')

      const { width, height } = getComputedStyle(container.el)
      container.w = pxToNumber(width)
      container.h = pxToNumber(height)

      window.addEventListener(
        'resize',
        debounce(() => {
          const { width, height } = getComputedStyle(container.el)
          container.w = pxToNumber(width)
          container.h = pxToNumber(height)
        }, 300)
      )
    })

    return {
      computedStyle,
      isActive,
      store,
      offset,
      style,
      wrapperRef,
      container,

      onWrapperMouseDown,
    }
  },
}
</script>

<template>
  <div class="absolute top-0 left-0" :style="computedStyle" @mousedown.stop="onWrapperMouseDown">
    <component v-bind="component.attrs" :is="component.tag">
      {{ component.children }}
    </component>
    <div
      class="absolute top-0 left-0 w-full h-full bg-gray-100 cursor-move select-none"
      :class="{ 'opacity-50': isActive, 'opacity-0': !isActive }"
      ref="wrapperRef"
    ></div>
  </div>
</template>
