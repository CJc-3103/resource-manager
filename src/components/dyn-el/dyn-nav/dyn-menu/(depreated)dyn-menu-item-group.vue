<template>
  <el-menu-item-group>
    <template #title>{{ groupTitle }}</template>

    <slot :children="children"></slot>
  </el-menu-item-group>
</template>

<script>
export default {
  name: 'dyn-menu-item-group',
  props: {
    groupTitle: {
      type: String,
      default: '',
    },
    children: {
      type: [Array, Object],
      require: true,
    },
  },
};
</script>
