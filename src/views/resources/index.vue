<template>
  <el-container>
    <el-aside class="el-aside--left" width="200px">
      <TopicGroup />
    </el-aside>
    <el-main>
      <ResourceContainer />
    </el-main>
    <el-aside class="el-aside--right" width="200px">AsideRight</el-aside>
  </el-container>
</template>

<script setup>
import ResourceContainer from './ResourceContainer.vue';
import TopicGroup from './TopicGroup.vue';
import '@/assets/styles/layout/resources.scss';
</script>
