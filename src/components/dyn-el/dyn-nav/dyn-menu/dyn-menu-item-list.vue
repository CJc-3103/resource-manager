<template>
  <dynMenuItem
    v-for="(menuItem, index) in menuItemList"
    :key="index"
    v-bind="menuItem"
  >
  </dynMenuItem>
</template>

<script>
import { castArray } from 'lodash';
import dynMenuItem from './dyn-menu-item.vue';

export default {
  name: 'dyn-menu-item-list',
  computed: {
    menuItemList() {
      return castArray(this.menuItems);
    },
  },
  props: {
    // 卡片数组，只有一个卡片时可以不用嵌套数组
    menuItems: {
      type: [Array, Object],
      require: true,
    },
  },
  components: {
    dynMenuItem,
  },
};
</script>
