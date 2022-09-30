<template>
  <el-container>
    <el-aside class="el-aside--left" width="200px">
      <TopicPicker />
    </el-aside>
    <el-main>
      <div class="main-content">
        <TagPicker />
        <ResourceGallery />
      </div>
    </el-main>
    <el-aside class="el-aside--right" width="200px">
      <Bookmark />
    </el-aside>
  </el-container>
</template>

<script setup>
import TopicPicker from './TopicPicker.vue';
import TagPicker from './TagPicker.vue';
import ResourceGallery from './ResourceGallery.vue';
import Bookmark from './Bookmark.vue';
import '@/assets/styles/modules/resources/index.scss';
</script>
