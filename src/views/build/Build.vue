<script>
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { SettingOutlined } from '@ant-design/icons-vue'
import VueDraggable from 'vuedraggable'
import Wrapper from './Wrapper.vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    SettingOutlined,
    VueDraggable,
    Wrapper,
  },
  setup() {
    const store = useStore()

    const state = reactive({
      drag: false,
      dragOptions: {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      },
    })

    function onDragEnd(event) {
      console.log(event)
      state.drag = false
    }

    return {
      ...toRefs(state),
      components: computed(() => store.getters.sortedComponents),
      addComponent: ({ key }) => store.commit('addComponent', key),
      onContainerClick: () => store.commit('setCurrentComponent', null),
      onDragEnd,
      vuex: store.state,
    }
  },
})
</script>

<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal" @click="addComponent">
    <a-sub-menu>
      <template #title>
        <span>
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
      <a-menu-item key="x-table">
        表格
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
  <div class="flex" style="height: calc(100% - 48px);">
    <div class="w-60">
      <VueDraggable
        tag="transition-group"
        :component-data="{
          tag: 'ul',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }"
        v-model="components"
        v-bind="dragOptions"
        @start="drag = true"
        @end="onDragEnd"
        item-key="uid"
      >
        <template #item="{ element }">
          <li class="m-2 p-2 bg-gray-100">
            {{ element.name }}
          </li>
        </template>
      </VueDraggable>
    </div>

    <div class="flex-1 p-6 bg-gray-100">
      <div id="container" class="relative h-full bg-white shadow-lg" @click="onContainerClick">
        <Wrapper v-for="component in components" :key="component.id" :component="component"></Wrapper>
      </div>
    </div>
  </div>
</template>
