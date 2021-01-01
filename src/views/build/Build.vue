<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useStore } from '@/store'
import { SettingOutlined } from '@ant-design/icons-vue'

interface VComponent {
  tag: string
  attrs?: {}
  children?: string | unknown[]
}

export default defineComponent({
  components: {
    SettingOutlined
  },
  setup() {
    const state = reactive<{ current: string[]; components: VComponent[] }>({
      current: [],
      components: [
        {
          tag: 'a-button',
          attrs: { type: 'primary', disabled: true },
          children: '这是按钮'
        }
      ]
    })

    function addComponent({ key }) {
      state.components.push({ tag: key })
    }

    return {
      ...toRefs(state),
      addComponent
    }
  }
})
</script>

<template>
  <a-menu
    v-model:selectedKeys="current"
    mode="horizontal"
    @click="addComponent"
  >
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
    <ul
      style="flex: none; width: 240px; border-right: 1px solid #f0f0f0; padding: 24px;"
    >
      <li v-for="item in components" :key="item.tag">{{ item.tag }}</li>
    </ul>
    <div style="flex: 1; padding: 24px; background: #eee;">
      <div
        style="height: 100%; background: #fff; box-shadow: 0 9px 28px 8px rgba(0, 0, 0, 0.05)"
      >
        <component
          v-for="item in components"
          v-bind="item.attrs"
          :key="item.tag"
          :is="item.tag"
        >
          {{ item.children }}
        </component>
      </div>
    </div>
  </div>
</template>
