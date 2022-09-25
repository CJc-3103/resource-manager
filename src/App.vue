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
import { useStore } from 'vuex';
import { onBeforeMount } from 'vue';

const store = useStore();
const backupKey = 'backupState';
// 第一次加载或刷新后，根据本地存储备份情况初始化全局状态
onBeforeMount(() => {
  let backup = localStorage.getItem(backupKey);
  if (!backup) {
    store.replaceState(Object.assign(store.state, JSON.parse(backup)));
  }
  localStorage.removeItem(backupKey);
});
// 刷新前备份
window.addEventListener('beforeunload', () => {
  localStorage.setItem(backupKey, JSON.stringify(store.state));
});
</script>
