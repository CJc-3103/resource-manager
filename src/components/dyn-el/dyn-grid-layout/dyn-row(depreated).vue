<template>
  <el-row v-bind="$attrs">
    <slot :children="children"></slot>
  </el-row>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'dyn-row',
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
