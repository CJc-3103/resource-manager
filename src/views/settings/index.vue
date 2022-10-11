<template>
  <el-container>
    <el-aside class="el-aside--left" width="200px"> </el-aside>
    <el-main>
      <ViewSetting />
      <InitDB />
    </el-main>
  </el-container>
</template>

<script setup>
import ViewSetting from './ViewSetting.vue';
import InitDB from './InitDB.vue';
</script>
