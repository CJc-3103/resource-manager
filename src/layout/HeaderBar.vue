<template>
  <div class="nav-bar">
    <el-menu
      mode="horizontal"
      :default-active="currentMenu"
      @select="selectCurrenNav"
      router
    >
      <dynMenuItemList :menuItems="menuList"></dynMenuItemList>
    </el-menu>
  </div>
</template>

<script setup>
import { dynMenuItemList } from '@/components/dyn-el';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const menuList = [
  {
    title: '资源管理',
    index: '/resources',
  },
  {
    title: '标签管理',
    index: '/tags',
  },
  {
    title: '设置中心',
    index: '/settings',
  },
];

const currentMenu = computed(() => store.state.currentMenu);
const updateCurrentNav = (navItem) =>
  store.dispatch('updateCurrentNav', navItem);

const initMenu = (currentMenu) => {
  if (!currentMenu) updateCurrentNav(menuList[0].index);
};
initMenu(currentMenu.value);

function selectCurrenNav(navItem) {
  updateCurrentNav(navItem);
}
</script>
