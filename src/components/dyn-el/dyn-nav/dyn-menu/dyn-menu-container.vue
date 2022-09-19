<template>
  <!-- 若数组第一项带了分组标题，说明需要先创建分组，再创建分组下的菜单列表 -->
  <dynMenuItemGroupList v-if="menuList?.[0]?.isGroup" :groups="menuList">
    <template v-slot:title="{ title }">
      <slot :title="title"></slot>
    </template>

    <template v-slot="{ children }" v-bind="$attrs">
      <dynMenuItemList :menuItems="children"> </dynMenuItemList
    ></template>
  </dynMenuItemGroupList>

  <!-- 不需要分组时直接渲染菜单项列表 -->
  <dynMenuItemList v-else :menuItems="menuList" v-bind="$attrs">
  </dynMenuItemList>
</template>

<script>
import dynMenuItemList from './dyn-menu-item-list.vue';
import dynMenuItemGroupList from './dyn-menu-item-group-list.vue';
import { castArray } from 'lodash';

export default {
  name: 'dyn-menu-container',
  computed: {
    menuList() {
      return castArray(this.menus);
    },
  },
  props: {
    menus: {
      type: Array,
      require: true,
    },
  },
  components: {
    dynMenuItemList,
    dynMenuItemGroupList,
  },
};
</script>
