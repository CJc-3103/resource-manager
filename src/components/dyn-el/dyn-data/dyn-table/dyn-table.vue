<template>
  <div class="dyn-table">
    <el-table
      :ref="tableRef"
      :data="tableData"
      :stripe="striped"
      :border="bordered"
      style="width: 100%"
      :max-height="maxHeight"
      highlight-current-row
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
      @select-all="handleSelectAll"
    >
      <!-- v-fit-columns -->

      <!-- 左侧功能区 -->
      <!-- 选中列 -->
      <slot name="table-selection">
        <dyn-table-col-selection v-if="hasSelection"></dyn-table-col-selection
      ></slot>
      <!-- 展开列 -->
      <slot name="table-expand">
        <el-table-column
          v-if="hasExpand"
          width="40"
          type="expand"
          align="center"
          fixed
        >
        </el-table-column
      ></slot>
      <!-- 自动序号 -->
      <slot name="table-index">
        <dyn-table-col-index
          v-if="hasIndex"
          label="序号"
          :firstIndex="firstIndex"
        ></dyn-table-col-index
      ></slot>

      <!-- 中间数据区 -->
      <slot name="table-data">
        <template v-for="(col, key) in tableCols">
          <el-table-column
            v-if="!colOps.shield || false"
            v-show="!colOps.hidden || false"
            :prop="col.key || ''"
            :label="col.label"
            :fixed="col.fixed || false"
            :sortable="col.sortable || false"
            :key="key"
          >
            <!-- min-width="100px" -->
            <!-- :fit="col.fit || false" -->
          </el-table-column>
        </template></slot
      >

      <!-- 右侧功能区 -->
      <slot name="table-action"></slot>
    </el-table>

    <!-- 分页器 -->
    <slot name="table-pagination">
      <div class="block">
        <el-pagination
          v-model:current-page="paginationOpts.currentPage"
          v-model:page-size="paginationOpts.pageSize"
          :page-sizes="paginationOpts.pageSizes"
          :total="paginationOpts.total"
          :layout="paginationOpts.layout"
        >
        </el-pagination></div
    ></slot>
  </div>
</template>

<script>
import dynTableCol from './dyn-table-col.vue';
import dynTableColIndex from './dyn-table-col_index.vue';
import dynTableColSelection from './dyn-table-col_selection.vue';

export default {
  name: 'dyn-table',
  components: {
    dynTableCol,
    dynTableColIndex,
    dynTableColSelection,
  },
  data() {
    return {
      //   // 单选选中行，通过点击数据行选中，而非按钮获取
      //   currentRow: {},
      // 多选选中行
      selections: [],
    };
  },
  computed: {
    selectionCount() {
      return this.selections.length;
    },
    isLimited() {
      return this.selectionLimit && this.selectionCount > this.selectionLimit;
    },
  },
  watch: {
    selections(rows) {
      for (const row of rows) {
        console.log(row.id + ' ' + row.name);
      }
      //   console.log(rows);
    },
  },
  created() {},
  methods: {
    //#region 选中
    // 设置选中行
    // setCurrent(row) {
    //   this.$refs[this.tableRef].setCurrentRow(row);
    // },
    // 切换行选中状态时，将数据保存到本地
    // 所有选中操作都通过这个事件进行赋值，不能直接操作本地数据
    // 多选框一列的选中事件已经被element封装好了，因此不需要手动触发
    handleSelectionChange(rows) {
      //   let isChanged = false;
      //   console.log(rows.length > this.selectionLimit);
      //   if (this.selectionLimit && rows.length > this.selectionLimit) {
      //     let idList = [];
      //     selections.forEach((selection) => {
      //       idList.push(selection.id);
      //     });
      //     console.log(selectionLimit);
      //     let gap = rows.length - this.selectionLimit;
      //     let newRows = []; // 新选中的，且按照序号从上往下排列正好达到多选上限的数据行
      //     rows.forEach((row) => {
      //       if (gap && idList.indexOf(row.id) === -1) {
      //         newRows.push(row);
      //         gap--;
      //       }
      //     });
      //     this.selections = this.selections.concat(newRows);
      //     isChanged = true;
      //   } else {
      //     this.selections = rows;
      //     isChanged = true;
      //   }
      //   if (isChanged) this.$emit('selection-change', this.selections); // 通过二次封装的事件触发外部数据更新
      this.selections = rows;
      this.$emit('selection-change', this.selections); // 通过二次封装的事件触发外部数据更新
    },
    // 检查是否已到多选上限
    isSelectionLimited() {},
    // 单击某行时触发选中当前行的事件
    handleCurrentChange(currentRow, oldRow) {
      //   this.selections = [];
      //   this.selections[0] = currentRow;
    },
    // 点击切换单行的选中状态，内部触发
    handleRowClick(row, column, event) {
      this.$refs[this.tableRef].toggleRowSelection(row);
    },
    // 全选/全不选
    handleSelectAll(selection) {
      console.log(selection);
    },
    // 全选/全不选处理器，内部触发
    handleToggleAllSelect(selection) {
      //   this.$refs[this.tableRef].toggleAllSelection();
      //   selection
      //     ? this.$refs[this.tableRef].toggleAllSelection()
      //     : this.$refs[this.tableRef].clearSelection();
    },
    // 全选/全不选，由外部触发
    toggleAllSelection() {
      this.handleToggleAllSelect(allSelected);
    },
    // 反选，由外部触发
    reverseSelect() {
      // 将当前表格页数据中，选中项剔除，返回过滤后新数组
      this.tableData.forEach((rows) =>
        this.$refs[this.tableRef].toggleRowSelection(rows)
      );
    },
    // 判断是否达到或超过多选上限

    //#endregion
  },
  props: {
    //#region 原生相关属性 --
    //#region 表格数据 ----
    tableData: {
      default: () => [],
    },
    // 最大高度，取代高度，避免两侧固定列高度异常
    maxHeight: Number,
    // 是否带斑马纹
    striped: Boolean,
    // 是否带纵向边框
    bordered: Boolean,
    // 表格尺寸
    size: String,
    // 列宽自撑开，有BUG
    fit: Boolean,
    // 是否显示表头
    showHeader: Boolean,
    // 方便改变指定规则下的行显示状态
    tableRowClassName: Array,
    // 允许单选
    highlightCurrentRow: Boolean,
    //#endregion ----

    //#region 分页器配置参数 ----
    hasPagination: {
      type: Boolean,
      default: true,
    },
    paginationOpts: Object,
    //#endregion --

    //#region 自定义属性
    tableRef: String,
    // 数据区配置参数
    tableCols: {
      type: [Object, Array],
      default: () => [],
    },
    // 显示序号列
    hasIndex: {
      type: Boolean,
      default: true,
    },
    // 当前页第一条数据的序号；
    // 翻页继续计数模式下，必须提供由页码和每页条数计算而来的序号；
    // 否则默认翻页后从1开始重新计数
    firstIndex: {
      type: [Number, Function],
      default: 1,
    },
    // 显示展开列
    hasExpand: Boolean,

    // 多选选中行
    // selections: {
    //   type: Array,
    //   require: true,
    // },
    // 允许多选
    hasSelection: {
      type: Boolean,
      default: true,
    },
    selectionLimit: Number,
    // 部分交互行为启用前端（默认启用后端），如筛选、排序、搜索、分页等
    allowFrontEnd: {
      type: Boolean,
      default: false,
    },
    //#endregion
  },
};
</script>
