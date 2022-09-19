<template>
  <el-menu-item-group
    v-for="({ title, children }, index) in groupList"
    :key="index"
  >
    <template #title>
      <slot name="title" :title="title">{{ title }}</slot>
    </template>

    <slot :children="children"></slot>
  </el-menu-item-group>
</template>

<script>
import { castArray } from 'lodash';
export default {
  name: 'dyn-menu-item-group-list',
  computed: {
    groupList() {
      return castArray(this.groups);
    },
  },
  props: {
    // 菜单分组数组，没有分组时不用嵌套数组
    groups: {
      type: [Array, Object],
      require: true,
    },
  },
};
</script>
