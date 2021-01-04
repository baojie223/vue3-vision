<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useStore } from '@/store'
import { SettingOutlined } from '@ant-design/icons-vue'
import VueDraggable from 'vuedraggable'
import Wrapper from './Wrapper.vue'

interface VComponent {
  id: number
  tag: string
  attrs?: {}
  children?: string | unknown[]
  style?: any
}

export default defineComponent({
  components: {
    SettingOutlined,
    VueDraggable,
    Wrapper
  },
  data() {
    return {
      drag: false
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },
  setup() {
    const state = reactive<{ current: string[]; components: VComponent[] }>({
      current: [],
      components: [
        {
          id: 1,
          tag: 'a-button',
          attrs: { type: 'primary', disabled: false },
          children: '这是按钮',
          style: {
            width: '500px',
            height: '500px',
            left: '100px',
            top: '100px'
          }
        }
      ]
    })

    function addComponent({ key }) {
      state.components.push({ id: Date.now(), tag: key })
    }

    return {
      ...toRefs(state),
      addComponent
    }
  }
})
</script>

<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal" @click="addComponent">
    <a-sub-menu>
      <template #title>
        <span class="submenu-title-wrapper">
          <setting-outlined />
          组件
        </span>
      </template>
      <a-menu-item key="a-button">
        按钮
      </a-menu-item>
      <a-menu-item key="image">
        图片
      </a-menu-item>
      <a-menu-item key="x-pie">
        饼图
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
  <div style="display: flex;  height: calc(100% - 48px);">
    <div style="width: 240px;">
      <VueDraggable
        class="list-group"
        tag="transition-group"
        :component-data="{
          tag: 'ul',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null
        }"
        v-model="components"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
      >
        <template #item="{ element }">
          <li style="margin: 8px; padding: 8px;background: #eee;">
            {{ element.tag }}
          </li>
        </template>
      </VueDraggable>
    </div>

    <div style="flex: 1; padding: 24px; background: #eee;">
      <div style="position: relative; height: 100%; background: #fff; box-shadow: 0 9px 28px 8px rgba(0, 0, 0, 0.05)">
        <Wrapper v-for="component in components" :key="component.id" :component="component"></Wrapper>
      </div>
    </div>
  </div>
</template>
