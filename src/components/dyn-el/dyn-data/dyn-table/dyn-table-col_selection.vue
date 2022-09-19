<template>
  <el-table-column width="40" type="selection" align="center" :hidden="hidden">
  </el-table-column>
</template>

<script>
export default {
  name: 'dyn-table-col_selection',
  props: {
    //#region 原生相关属性
    // 默认不隐藏（二次封装的组件既然使用了，一般就是要显示的）
    hidden: {
      type: Boolean,
      default: false,
    },
    // 宽度
    width: {
      type: Number,
      default: 40,
    },
    //#endregion
  },
};
</script>
