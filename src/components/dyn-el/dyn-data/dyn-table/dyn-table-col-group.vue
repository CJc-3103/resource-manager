<template>
  <!-- 参数数组长度大于1 -->
  <div class="dyn-table-col-group" v-if="colList.length > 1">
    <!-- <dyncol
      :colTitle="col.colTitle"
      :children="col.children"
      v-for="(col, index) in colList"
      :key="index"
    >
      <template v-slot="{ children }">
        <slot :children="children" v-bind="$attrs" v-on="$listeners"> </slot>
      </template>
    </dyncol> -->

    <el-table-column
      v-if="!colList.shield || false"
      v-show="!colList.hidden || false"
      :prop="colList.key"
      :label="colList.label"
      :fixed="colList.fixed || false"
      :sortable="colList.sortable || false"
      :key="key"
    >
      <!-- 将父组件的插槽内容传入子组件的插槽 -->
      <template v-slot="{ children }">
        <!-- 定义父组件的插槽，接收外部传入的内容 -->
        <slot :children="children" v-bind="$attrs" v-on="$listeners"> </slot>
      </template>
    </el-table-column>
  </div>

  <!-- 只有一个卡片时不渲染外层的组元素 -->
  <!-- 参数数组长度为1 -->
  <dyncol
    v-else
    v-show="!colList[0].hidden || false"
    :prop="colList[0].key"
    :label="colList[0].label"
    :fixed="colList[0].fixed || false"
    :sortable="colList[0].sortable || false"
    :key="key"
  >
    <!-- 将父组件的插槽内容传入子组件的插槽 -->
    <template v-slot="{ children }">
      <!-- 定义父组件的插槽，接收外部传入的内容 -->
      <slot :children="children" v-bind="$attrs" v-on="$listeners"> </slot>
    </template>
  </dyncol>
</template>

<style lang="scss">
.dyn-col-group {
  .el-col:nth-child(n + 2) {
    // 设置除第一个卡片外其他卡片的上间距
    margin-top: 30px;
  }
}
</style>

<script>
import dyncol from './dyn-col.vue';
export default {
  name: 'dyn-col-group',
  computed: {
    colList() {
      let cols = this.cols;
      // 将对象转为数组
      return !cols.length ? [].concat([cols]) : cols;
    },
  },
  props: {
    // 卡片数组，只有一个卡片时可以不用嵌套数组
    cols: {
      type: [Array, Object],
      require: true,
    },
  },
  components: {
    dyncol,
  },
};
</script>
