<template>
  <el-container>
    <el-header>
      <HeaderBar />
    </el-header>
    <router-view />
  </el-container>
</template>

<script setup>
import HeaderBar from './HeaderBar.vue';
import Resources from '../views/resources';
import Tags from '../views/tags';
import Settings from '../views/settings';
import { useRouter } from 'vue-router';
import '@/styles/modules/index.scss';

const router = useRouter();
const currentPath = router.currentRoute.value.fullPath;

const bodyComp = { resources: Resources, tags: Tags, settings: Settings };
</script>
