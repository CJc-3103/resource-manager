<template>
  <el-col v-for="({ children }, index) in colList" :key="index" v-bind="$attrs">
    <slot :children="children"></slot>
  </el-col>
</template>

<script>
import { castArray } from 'lodash';
export default {
  name: 'dyn-col-group',
  computed: {
    colList() {
      return castArray(this.cols);
    },
  },
  props: {
    cols: [Array, Object], // 栅格列数组，只有一列时可以不用嵌套数组
  },
};
</script>
