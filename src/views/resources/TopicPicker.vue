<template>
  <div class="topic-picker">
    <!-- 搜索 -->
    <el-input
      size="small"
      :placeholder="$t('topicMenu.placeholder')"
      v-model="topicKeywords"
    >
      <template #append>
        <el-button :icon="Search" @click="searchTopics(topicKeywords)" />
      </template>
    </el-input>
    <!-- 排序 -->
    <!-- 新增 -->
    <!-- 多选 -->

    <!-- 主题区域 -->
    <div class="aside-title">{{ $t('topicMenu.title') }}</div>
    <span class="action-group"> </span>
    <!-- 默认主题 -->
    <el-menu
      class="topic-menu"
      :default-active="currentTopic"
      @select="handleSelectTopic"
    >
      <el-menu-item
        class="topic-item"
        :index="index"
        v-for="({ name, index }, i) in defaultTopics"
        :key="i"
      >
        <span class="topic-txt">{{ $t(`topicMenu.${name}`) }}</span>
      </el-menu-item>
      <!-- 自定义主题 -->
      <el-tooltip
        :content="title"
        placement="right"
        v-for="({ title }, i) in filteredTopics"
        :key="i"
      >
        <el-menu-item class="topic-item" :index="i + ''">
          <span class="topic-txt">{{ title }}</span>
        </el-menu-item>
      </el-tooltip>
    </el-menu>
  </div>
</template>

<script setup>
//#region 依赖
import { ref, computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { fetchTopic } from '@/api';
import { Search } from '@element-plus/icons-vue';
import { cloneDeep } from 'lodash';

const store = useStore();
//#endregion

//#region 视图构建
const defaultTopics = [
  {
    name: 'all',
    index: 'All',
  },
  {
    name: 'noTopic',
    index: 'NoTopic',
  },
];
const topics = [
  {
    title: '网页收藏夹',
  },
  {
    title: '图片收集',
  },
];
//#endregion

//#region 交互

// 搜索主题
const topicKeywords = ref('');
const filteredTopics = ref(topics);

const searchTopics = (topicKeywords) => {
  if (topicKeywords) {
    filteredTopics.value = topics.filter(
      (topic) => topic.title.indexOf(topicKeywords) > -1
    );
  } else {
    filteredTopics.value = topics;
  }
};

// 选择主题
const currentTopic = computed(() => store.state.resources.currentTopic);
const updateCurrentTopic = (topic) =>
  store.dispatch('resources/updateCurrentTopic', topic);

function initCurrentTopic(currentTopic) {
  if (!currentTopic) updateCurrentTopic(defaultTopics[0].index);
}

function handleSelectTopic(topic) {
  updateCurrentTopic(topic);
}

// 生命周期
function init() {
  initCurrentTopic(currentTopic.value);
  searchTopics(topicKeywords.value); // 初始化主题列表
}
init();

onBeforeMount(() => {
  //   init();
  //   initCurrentTopic(currentTopic.value);
  //   searchTopics(topicKeywords.value); // 初始化主题列表
  //   console.log('currentTopic.value', currentTopic);
});

//#endregion
</script>
