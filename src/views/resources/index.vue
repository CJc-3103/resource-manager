<template>
  <el-container>
    <el-aside class="el-aside--left" width="200px">
      <TopicMenu />
    </el-aside>
    <el-main>
      <TagPicker />
      <ResourceContainer />
    </el-main>
    <el-aside class="el-aside--right" width="200px">AsideRight</el-aside>
  </el-container>
</template>

<script setup>
import ResourceContainer from './ResourceContainer.vue';
import TopicMenu from './TopicMenu.vue';
import TagPicker from './TagPicker.vue';
import '@/assets/styles/layout/resources.scss';
</script>
