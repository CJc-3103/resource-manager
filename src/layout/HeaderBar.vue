<template>
  <div class="nav-bar">
    <div></div>
    <el-menu
      mode="horizontal"
      :default-active="currentMenu"
      @select="selectCurrenMenu"
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
    title: '资源中心',
    index: '/',
  },
  {
    title: '标签中心',
    index: '/tags',
  },
  {
    title: '设置中心',
    index: '/settings',
  },
];

const currentMenu = computed(() => store.state.currentMenu);
const updateCurrentMenu = (menuItem) =>
  store.dispatch('updateCurrentMenu', menuItem);

const initMenu = (currentMenu) => {
  if (!currentMenu) updateCurrentMenu(menuList[0].index);
};
initMenu(currentMenu.value);

function selectCurrenMenu(menuItem) {
  updateCurrentMenu(menuItem);
}
</script>
