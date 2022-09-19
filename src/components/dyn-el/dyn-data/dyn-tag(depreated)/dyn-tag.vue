<template>
  <el-tag
    :text="text"
    :type="type"
    :closable="closable"
    :disable-transitions="disableTransitions"
    :hit="border"
    :color="color"
    :size="size"
    :effect="effect"
  ></el-tag>
</template>

<script>
export default {
  name: 'dyn-tag',
  prop: {
    text: String,
    type: String,
    closable: Boolean,
    disableTransitions: Boolean,
    border: Boolean,
    color: String,
    size: String,
    effect: String,
  },
};
</script>
