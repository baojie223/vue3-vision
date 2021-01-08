<script>
import { computed, ref, reactive, onMounted, onUnmounted, toRef } from 'vue'
import { useStore } from 'vuex'
import { clone, debounce } from 'lodash'

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
    const store = useStore()

    const style = reactive(clone(props.component.style))
    const zIndex = toRef(props.component.style, 'zIndex')

    const computedStyle = computed({
      get() {
        return {
          width: numberToPx(style.w),
          height: numberToPx(style.h),
          transform: `translate(${numberToPx(style.x)}, ${numberToPx(style.y)})`,
          zIndex: zIndex,
        }
      },
    })

    const isActive = computed(() => store.state.currentComponent?.uid === props.component.uid)

    // 拖拽
    const wrapperRef = ref()

    const container = reactive({
      el: null,
      w: 0,
      h: 0,
    })

    const offset = reactive({
      x: 0,
      y: 0,
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

    // 原生resize
    const wrapper = ref()
    let mutationObserver = null

    onMounted(() => {
      mutationObserver = new MutationObserver(() => {
        const w = getComputedStyle(wrapper.value).getPropertyValue('width')
        const h = getComputedStyle(wrapper.value).getPropertyValue('height')
        style.w = pxToNumber(w)
        style.h = pxToNumber(h)
      })

      mutationObserver.observe(wrapper.value, {
        attributes: true,
        attributeFilter: ['style'],
        attributeOldValue: true,
      })
    })

    onUnmounted(() => {
      mutationObserver.disconnect()
    })

    // 自定义resize, 未使用
    const points = [
      ['top-0', 'left-0', 'cursor-se-resize'],
      ['top-1/2', 'left-0', 'cursor-ew-resize'],
      ['top-full', 'left-0', 'cursor-sw-resize'],
      ['top-full', 'left-1/2', 'cursor-ns-resize'],
      ['top-full', 'left-full', 'cursor-se-resize'],
      ['top-1/2', 'left-full', 'cursor-ew-resize'],
      ['top-0', 'left-full', 'cursor-sw-resize'],
      ['top-0', 'left-1/2', 'cursor-ns-resize'],
    ]

    const initial = reactive({
      x: 0,
      y: 0,
    })

    function onPointMouseDown(event) {
      initial.x = event.clientX
      initial.y = event.clientY

      document.addEventListener('mousemove', onPointMouseMove)
      document.addEventListener('mouseup', onPointMouseUp)
    }

    function onPointMouseMove(event) {
      const w = initial.x - event.clientX + style.w,
        h = initial.y - event.clientY + style.h

      style.w = w
      style.h = h
    }

    function onPointMouseUp() {
      document.removeEventListener('mousemove', onPointMouseMove)
      document.removeEventListener('mouseup', onPointMouseUp)
    }

    return {
      computedStyle,
      isActive,
      style,
      wrapperRef,
      points,
      currentComponent: store.state.currentComponent,

      onWrapperMouseDown,

      onPointMouseDown,
      wrapper,
    }
  },
}
</script>

<template>
  <div
    ref="wrapper"
    class="absolute top-0 left-0 overflow-auto"
    :class="{ resize: isActive }"
    :style="computedStyle"
    @click.stop
  >
    <component v-bind="component.attrs" :is="component.name">
      {{ component.children }}
    </component>

    <div
      class="absolute top-0 left-0 w-full h-full bg-gray-100 cursor-move select-none border border-dashed border-indigo-300"
      :class="{ 'opacity-50': isActive, 'opacity-0': !isActive }"
      ref="wrapperRef"
      @mousedown.stop="onWrapperMouseDown"
    ></div>

    <!-- <template v-if="isActive">
      <template v-for="(item, index) of points" :key="index">
        <div
          class="absolute w-2 h-2 bg-indigo-400 rounded-full transform transition-all hover:scale-150 -translate-x-1/2 -translate-y-1/2"
          :class="item"
          @mousedown="onPointMouseDown"
        ></div>
      </template>
    </template> -->
  </div>
</template>
