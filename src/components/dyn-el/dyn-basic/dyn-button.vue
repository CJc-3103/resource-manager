<template>
  <el-button :icon="'el-icon-' + icon" v-bind="$attrs">
    <slot></slot
  ></el-button>
</template>

<script>
export default {
  name: 'dyn-button',
  props: {
    icon: String,
  },
};
</script>
