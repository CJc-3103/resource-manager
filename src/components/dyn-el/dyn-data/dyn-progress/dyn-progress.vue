<template>
  <el-progress
    :percentage="percentage"
    :type="type"
    :stroke-width="strokeWidth"
    :text-inside="textInside"
    :status="status"
    :color="color"
    :width="width"
    :show-text="showText"
    :stroke-linecap="strokeLinecap"
    :format="format"
  ></el-progress>
</template>

<script>
export default {
  name: 'dyn-progress',
  prop: {
    percentage: Number,
    type: String,
    strokeWidth: Number,
    textInside: Boolean,
    status: String,
    color: [String, Function, Array],
    width: Number,
    showText: Boolean,
    strokeLinecap: String,
    format: Function,
  },
};
</script>
