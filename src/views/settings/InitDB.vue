<template>
  <div class="btn-group">
    <el-button @click="handleInitDB">初始化数据库</el-button>
    <el-button @click="handleDeleteDB">删除数据库</el-button>
  </div>
</template>

<script setup>
import { initDB, deleteDB } from '@/indexedDB';

const handleInitDB = () => {
  initDB();
};
const handleDeleteDB = () => {
  deleteDB();
};
</script>
