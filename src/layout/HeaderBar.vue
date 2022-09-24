<template>
  <div class="nav-bar">
    <div>LOGO</div>
    <div class="nav-menu_wrapper">
      <el-menu
        mode="horizontal"
        :default-active="currentNav"
        @select="handleSelectNav"
        router
      >
        <el-menu-item
          v-for="({ name, index }, i) in menuList"
          :key="i"
          :index="index"
          >{{ $t(`navbar.${name}.title`) }}</el-menu-item
        >
      </el-menu>
    </div>

    <el-dropdown class="lang-menu">
      <span class="el-dropdown-link">
        {{ $t(`navbar.dropdown.title`) }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            :class="{ active: lang === currentLang }"
            v-for="({ lang, title }, j) in langs"
            :key="j"
            :index="j"
            @click="handleLangShift(lang)"
            >{{ title }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
// import { dynMenuItemList } from '@/components/dyn-el';
// import { arrowDown } from 'element-plus/icons';
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import langs from '@/i18n/langs';

const store = useStore();

const menuList = ref([
  {
    // title: '资源管理',
    name: 'resources',
    index: '/resources',
  },
  {
    // title: '标签管理',
    name: 'tags',
    index: '/tags',
  },
  {
    // title: '设置中心',
    name: 'settings',
    index: '/settings',
  },
]);

const currentNav = computed(() => store.state.currentNav);
const updateCurrentNav = (navItem) =>
  store.dispatch('updateCurrentNav', navItem);

const initMenu = (currentNav) => {
  if (!currentNav) updateCurrentNav(menuList.value[0].index);
};

function handleSelectNav(navItem) {
  updateCurrentNav(navItem);
}

// 切换语言
const currentLang = computed(() => store.state.currentLang);
function handleLangShift(lang) {
  console.log('lang', lang);
}

onMounted(() => {
  initMenu(currentNav.value);
});
</script>
