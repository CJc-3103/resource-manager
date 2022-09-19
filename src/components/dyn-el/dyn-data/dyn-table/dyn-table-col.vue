<template>
  <el-table-column
    v-if="!shield || false"
    v-show="!hidden || false"
    :prop="colKey || ''"
    :column-key="colKey"
    :label="label"
    :fixed="fixed || false"
    :sortable="sortable || false"
    :width="width"
    :min-width="minWidth"
    :align="align"
    :header-align="headerAlign"
    :resizable="resizable"
  >
    <!-- 宽度自适应还没搞定
   -->
    <!-- min-width="100px" -->
    <!-- :fit="col.fit || false" -->
  </el-table-column>
</template>

<script>
export default {
  name: 'dyn-table-col',
  props: {
    //#region 原生相关属性
    colKey: String,
    label: String,
    // 隐藏列
    hidden: {
      type: Boolean,
      default: false,
    },
    fixed: [Boolean, String],
    // 是否可选
    sortable: Boolean,
    sortMethod: Function,
    sortBy: [String, Array, Function],
    sortOrders: Array,
    // 列内容对齐方式
    align: String,
    // 单独设置表头的对象方式，未设置时使用列的对齐方式
    headerAlign: String,
    width: Number,
    minWidth: Number,
    // 允许用户拖动列宽
    resizable: Boolean,
    renderHeaderFn: Function,
    // 类名
    className: String,
    lableClassName: String,

    //#endregion

    //#region 自定义属性
    // 屏蔽列，使用户无法操作使该列显示；应用场景如隐藏ID列
    shield: Boolean,
    //#endregion
  },
};
</script>
