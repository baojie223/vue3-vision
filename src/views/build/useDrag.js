import { reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { debounce, clone } from 'lodash'

function numberToPx(number) {
  return number + 'px'
}

function pxToNumber(px) {
  return Number(px.slice(0, -2))
}

function useDrag(component, style) {
  const store = useStore()

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
    store.commit('setCurrentComponent', component)
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
    onWrapperMouseDown,
  }
}

export default useDrag
