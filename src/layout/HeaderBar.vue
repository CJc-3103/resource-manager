<template>
  <div class="nav-bar">
    <div class="logo-container">LOGO</div>
    <div class="nav-content">
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
              v-for="({ lang, title }, i) in langs"
              :key="i"
              @click="handleSelectLang(lang)"
              >{{ title }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

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
// const menuConfigList = computed(() => {});

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
const updateCurrentLang = (lang) => store.dispatch('updateCurrentLang', lang);

// function initLang(lang) {
//   updateCurrentLang(lang);
// }

function handleSelectLang(lang) {
  console.log('lang', lang);
  if (currentLang) {
    store.commit('setCurrentLang', lang);
  } else {
    store.dispatch('updateCurrentLang', lang);
    // updateCurrentLang(lang);
  }
}

onMounted(() => {
  initMenu(currentNav.value);
});
</script>
