<template>
  <div class="nav-bar">
    <el-menu
      mode="horizontal"
      :default-active="currentNav"
      @select="handleSelectNav"
      router
    >
      <dynMenuItemList :menuItems="menuList"></dynMenuItemList>
    </el-menu>
  </div>
</template>

<script setup>
import { dynMenuItemList } from '@/components/dyn-el';
import { ref, computed, onMounted } from 'vue';
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

const currentNav = computed(() => store.state.currentNav);
const updateCurrentNav = (navItem) =>
  store.dispatch('updateCurrentNav', navItem);

const initMenu = (currentNav) => {
  if (!currentNav) updateCurrentNav(menuList[0].index);
};

function handleSelectNav(navItem) {
  updateCurrentNav(navItem);
}

onMounted(() => {
  initMenu(currentNav.value);
});
</script>
