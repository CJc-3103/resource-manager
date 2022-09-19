<template>
  <el-col v-bind="$attrs">
    <slot :children="children"></slot>
  </el-col>
</template>

<script>
export default {
  name: 'dyn-col',
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
