<template>
  <el-submenu v-bind="$attrs">
    <template #title>
      <dynIcon :icon="icon" v-if="icon"></dynIcon>
      <span>{{ title }}</span>
    </template>

    <dynMenuContainer :menuList="children"></dynMenuContainer>
  </el-submenu>
</template>

<script>
import { dynIcon } from '../../dyn-basic';
const dynMenuContainer = () => import('./dyn-menu-container.vue'); // 异步导入，避免死循环

export default {
  name: 'dyn-submenu',
  components: {
    dynMenuContainer,
    dynIcon,
  },
  props: {
    title: String,
    icon: String,
    // 子组件
    children: {
      type: [Object, Array],
      default: () => ({}),
      require: true,
    },
  },
};
</script>
