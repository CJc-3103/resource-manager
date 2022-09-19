<template>
  <div class="aside-title">选择主题</div>
  <el-menu
    class="topic-menu"
    :default-active="currentTopic"
    @select="selectTopic"
  >
    <!-- <el-menu-item class="topic-item basic-topic" index="All">全部</el-menu-item>
    <el-menu-item class="topic-item basic-topic" index="NoTopic"
      >未整理</el-menu-item
    > -->

    <el-tooltip
      :content="title"
      placement="right"
      v-for="({ title }, i) in topics"
      :key="i"
    >
      <el-menu-item class="topic-item" :index="title">
        <span class="topic-txt">{{ title }}</span>
      </el-menu-item>
    </el-tooltip>
  </el-menu>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { fetchTopic } from '@/api';
import '@/assets/styles/index.scss';

const store = useStore();

//#region 视图构建
const topics = [
  {
    title: '全部',
  },
  {
    title: '未分组',
  },
  {
    title: '网页收藏夹',
  },
  {
    title: '图片收集',
  },
];
//#endregion

//#region 交互

// 选择主题
const currentTopic = computed(() => store.state.currentTopic);
const updateCurrentTopic = (topic) =>
  store.dispatch('updateCurrentTopic', topic);

const initTopic = (currentTopic) => {
  if (!currentTopic) updateCurrentTopic(topics[0].title);
};
initTopic(currentTopic.value);

function selectTopic(topic) {
  updateCurrentTopic(topic);
}

// const currentTopic = ref(topics[0].title);
// const selectTopic = (i, path, item) => {
//   currentTopic.value = item.index;
//   console.log(currentTopic.value);
// };

//#endregion
</script>
