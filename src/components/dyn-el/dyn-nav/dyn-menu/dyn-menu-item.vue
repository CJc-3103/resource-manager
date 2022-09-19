<template>
  <!-- <dynSubmenu v-if="children?.length" v-bind="$attrs" :children="children">
  </dynSubmenu> -->

  <!-- 若有子菜单，调用 submenu 组件 -->
  <el-sub-menu v-if="children?.length" v-bind="$attrs">
    <template #title>
      <dynIcon :icon="icon" v-if="icon"></dynIcon>
      {{ title }}
    </template>

    <dynMenuContainer :menus="children"></dynMenuContainer>
  </el-sub-menu>
  <!-- 无子菜单时，只显示菜单项文本 -->
  <el-menu-item v-else v-bind="$attrs">
    <dynIcon v-if="icon" :icon="icon"></dynIcon>
    <template #title>{{ title }}</template>
  </el-menu-item>
</template>

<script>
import { dynIcon } from '../../dyn-basic';
import { defineAsyncComponent } from 'vue';
// const dynMenuContainer = () => import('./dyn-menu-container.vue'); // 异步导入，避免死循环

export default {
  name: 'dyn-menu-item',
  create() {
    console.log(this.title);
  },
  props: {
    title: String,
    icon: {
      type: String,
      default: '',
    },
    // 子组件
    children: {
      type: [Object, Array],
      default: () => ({}),
      require: true,
    },
  },
  components: {
    // dynSubmenu,
    dynMenuContainer: defineAsyncComponent((_) =>
      import('./dyn-menu-container.vue')
    ), // 异步导入，避免死循环
    dynIcon,
  },
};
</script>
