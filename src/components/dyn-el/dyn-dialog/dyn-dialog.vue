<template>
  <el-dialog v-bind="$attrs" v-model:visible="visible" @close="handleClose">
    <slot name="header"></slot>

    <slot></slot>

    <slot name="footer"></slot>
  </el-dialog>
</template>

<style lang="scss" scoped>
.el-dialog__wrapper.scrollable {
  .el-dialog {
    .el-dialog__body {
      overflow-y: auto;
      height: calc(100vh - 100px);
    }
  }
}
</style>

<script>
export default {
  name: 'dyn-dialog',
  data() {
    return {};
  },
  computed: {
    visible() {
      return this.dialogVisible;
    },
    // scrollableDialog() {
    //   return this.scrollable ? 'scrollable' : '';
    // },
  },
  props: {
    // scrollable: {
    //   type: Boolean,
    //   default: false,
    // },
    width: String,
    title: String,
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    // handleClose: Function,
  },
  created() {},
  methods: {
    handleClose(close) {
      this.visible = false;
    },
  },
};
</script>
