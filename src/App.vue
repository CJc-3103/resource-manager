<template>
  <div id="app">
    <el-config-provider :locale="locale">
      <router-view />
    </el-config-provider>
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
import { ref, watch, computed } from 'vue';
import { backup2Local } from '@/utils/storage/backup';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { elLocalLangs } from '@/i18n';

const store = useStore();
const i18n = useI18n();
// const elLangs = { elZhCn: elZhCn, elEn: elEn };
// const elLangs = ref({ zhCn, en });
// const locale = computed(() => elLangs[i18n.locale.value]);
const locale = computed(() => elLocalLangs[i18n.locale.value]);
const currentLang = computed(() => store.state.currentLang);
watch(currentLang, (newLang) => {
  i18n.locale.value = newLang;
});

// 刷新前备份
window.addEventListener('beforeunload', () => backup2Local());
</script>
