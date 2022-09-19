<template>
  <el-link :icon="'el-icon-' + icon" v-bind="$attrs"></el-link>
</template>

<script>
export default {
  name: 'dyn-link',
  props: {
    icon: String,
  },
};
</script>
