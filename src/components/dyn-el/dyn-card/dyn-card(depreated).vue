<template>
  <el-card>
    <template #header>
      <span>{{ cardTitle }}</span>
    </template>

    <slot :children="children" v-bind="$attrs"></slot>
  </el-card>
</template>

<script>
export default {
  name: 'dyn-card',
  props: {
    cardTitle: {
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
};
</script>
