<template>
  <el-date-picker v-model="val" :type="type"></el-date-picker>
</template>

<script>
import mixinInnerVal from './mixinInnerVal';
export default {
  name: 'dyn-datetime-picker',
  mixins: [mixinInnerVal],
  props: {
    // 选择器类型，日期 || 日期时间
    type: {
      type: String,
      default: 'date',
    },
  },
  methods: {
    handleInput(key, val) {
      //   console.log(key);
      //   console.log(val);
      // 触发统一的表单事件，将数据回传到表单组件
      this.$bus.emit('field-input', key, val);
      //   e.preventDefault();
    },
  },
};
</script>
