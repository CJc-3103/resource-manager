<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<script setup>
import { watch, computed, onBeforeMount } from 'vue';
import { backup2Local } from '@/utils/storage/backup';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

const store = useStore();
const i18n = useI18n();
const currentLang = computed(() => store.state.currentLang);
watch(
  () => currentLang.value,
  () => {
    i18n.locale.value = currentLang;
  }
);

// 刷新前备份
window.addEventListener('beforeunload', () => backup2Local());
</script>
