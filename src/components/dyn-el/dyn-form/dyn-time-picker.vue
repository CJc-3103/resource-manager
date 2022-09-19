<template>
  <el-time-picker v-model="innerVal" :picker-options="{}"></el-time-picker>
</template>

<script>
import mixinInnerVal from './mixinInnerVal';
export default {
  name: 'dyn-time-picker',
  computed: {
    opts() {
      return {
        start: this.start,
        end: this.end,
        // 时间间隔
        step: this.step,
        // 可选时间范围
        selectableRange: this.selectableRange,
      };
    },
  },
  mixins: [mixinInnerVal],
  props: {
    isArrowControl: Boolean, // 默认false
    // 开始时间
    start: Number,
    // 结束时间
    end: Number,
    // 时间间隔
    step: Number,
    // 可选时间范围
    selectableRange: String,
  },
  methods: {
    handleInput(key, val) {
      //   console.log(key);
      //   console.log(val);
      // 触发统一的表单事件，将数据回传到表单组件
      this.$emit('field-input', key, val);
      //   e.preventDefault();
    },
  },
};
</script>
