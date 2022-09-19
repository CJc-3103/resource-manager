<template>
  <i :class="'el-icon-' + icon"></i>
</template>

<script>
export default {
  name: 'dyn-icon',
  props: {
    icon: String,
  },
};
</script>
