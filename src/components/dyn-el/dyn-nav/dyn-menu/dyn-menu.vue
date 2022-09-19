<template>
  <el-submenu v-bind="$attrs">
    <template v-slot="{ children }">
      <slot :children="children"></slot>
    </template>
  </el-submenu>
</template>

<script>
export default {
  name: 'dyn-menu',
  props: {
    // 子组件
    children: {
      type: [Object, Array],
      default: () => ({}),
      require: true,
    },
  },
};
</script>
