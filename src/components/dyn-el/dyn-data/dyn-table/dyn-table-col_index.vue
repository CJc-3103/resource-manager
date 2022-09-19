<template>
  <!-- 翻页继续计数 -->
  <!-- <el-table-column
    v-if="indexMode === 'continue'"
    :label="label"
    :width="width"
    :hidden="hidden"
    :align="align"
    fixed
  >
    <template slot-scope="scope">
      {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
    </template>
  </el-table-column> -->

  <!-- 翻页重新计数 -->
  <!-- <el-table-column
    v-if="indexMode === 'continue'"
    type="index"
    :label="label"
    :width="width"
    :align="align"
    :index="(currentPage - 1) * pageSize + 1"
    fixed
  >
  </el-table-column> -->

  <!-- 自定义序号，包括翻页继续计数、重新计数或者其他模式 -->
  <el-table-column
    type="index"
    :label="label"
    :width="width"
    :align="align"
    :index="firstIndex"
    :fixed="fixed"
  >
  </el-table-column>
</template>

<script>
export default {
  name: 'dyn-table-col_index',
  created() {
    // if (!this.propsValidator(this.indexMode, this.currentPage, this.pageSize)) {
    //   console.error(
    //     `Dyn-El Warn: props 'currentPage' and 'pageSize' are required when props 'indexMode' is active`
    //   );
    // }
  },
  methods: {
    // propsValidator(indexMode, currentPage, pageSize) {
    //   return indexMode === 'continue' && currentPage > 0 && pageSize > 0;
    // },
  },
  props: {
    //#region 原生相关属性
    label: String,
    // 默认不隐藏（二次封装的组件既然使用了，一般就是要显示的）
    hidden: {
      type: Boolean,
      default: false,
    },
    // 默认固定在左侧
    fixed: {
      type: [Boolean, String],
      default: 'left',
    },
    // 宽度
    width: {
      type: Number,
      default: 50,
    },
    align: {
      type: String,
      default: 'center',
    },
    // 序号列计数模式
    firstIndex: {
      type: [Number, Function],
      // 默认翻页重新计数模式
      // 传入初始
      default: 1,
    },
    //#endregion

    //#region 自定义属性
    // // 翻页后计数规则
    // indexMode: {
    //   type: String,
    //   // 默认翻页后继续计数
    //   default: 'continue',
    //   validator: (val) => {
    //     return ['continue', 'restart'].indexOf(val) > -1;
    //   },
    // },
    // // 页码和每页条数两个参数与分页器配合使用；当选择翻页继续计数模式时必须提供
    // currentPage: {
    //   type: Number,
    // },
    // pageSize: {
    //   type: Number,
    // },
    //#endregion
  },
};
</script>
