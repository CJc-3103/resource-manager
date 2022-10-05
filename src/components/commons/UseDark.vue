<template>
  <el-switch
    size="small"
    v-model="isDark"
    :active-text="$t('setting.view.darkMode')"
  />
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
