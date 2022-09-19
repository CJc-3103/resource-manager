<template>
  <el-row v-for="({ children }, index) in rowList" :key="index" v-bind="$attrs">
    <slot :children="children"></slot>
  </el-row>
</template>

<script>
import { castArray } from 'lodash';
export default {
  name: 'dyn-row-group',
  computed: {
    rowList() {
      return castArray(this.rows);
    },
  },
  props: {
    // 栅格行数组，只有一行时可以不用嵌套数组
    rows: [Array, Object],
  },
};
</script>
