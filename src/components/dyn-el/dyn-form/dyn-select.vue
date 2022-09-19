<template>
  <div class="dyn-input">
    <el-input v-model="val" @input="handleInput"></el-input>
  </div>
</template>

<script>
export default {
  name: 'dyn-input',
  props: {
    // 字段值，在某些场景下，比如从服务端拉取数据后提交编辑时需要提供val作为初始值，此时的重置方法也会重置为默认值而非空值
    val: {
      type: String,
      default: '',
    },
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
