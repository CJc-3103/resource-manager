<template>
  <div class="topic-picker">
    <!-- 搜索 -->
    <el-input
      size="small"
      clearable
      :placeholder="$t('topicMenu.placeholder')"
      v-model="search"
    >
      <template #append>
        <el-button :icon="Search" @click="handleSearchTopic(search)" />
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
import { ref, computed, watch, onBeforeMount, onMounted } from 'vue';
import { useStore } from 'vuex';
import { fetchTopic } from '@/api';
import { Search } from '@element-plus/icons-vue';
import { cloneDeep } from 'lodash';
import {
  getBackupLocal,
  setBackupLocal,
} from '@/utils/storage/backupState/utils';

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
const search = ref('');
const filteredTopics = ref(topics);
watch(search, (search) => {
  if (!search) searchTopics(search);
});
const searchTopics = (search) => {
  let filter = [];
  if (search) {
    filter = topics.filter((topic) => topic.title.indexOf(search) > -1);
  } else {
    filter = topics;
  }
  filteredTopics.value = filter;
};

function handleSearchTopic(search) {
  searchTopics(search);
}

// 选择主题
const currentTopic = computed(() => store.state.resources.currentTopic);
const setCurrentTopic = (topic) =>
  store.commit('resources/setCurrentTopic', topic);

function initTopic(currentTopic) {
  if (!currentTopic) setCurrentTopic(defaultTopics[0].index);
}

function handleSelectTopic(topic) {
  setCurrentTopic(topic);
}

// 生命周期
const backupKey = 'backupTopicPicker';

function init() {
  const backup = getBackupLocal(backupKey);
  search.value = backup?.search || '';
  initTopic(currentTopic.value);
  // 若之前有筛选，切回来时保持
  searchTopics(search.value);
}
const backupState = () =>
  setBackupLocal(backupKey, {
    search: search.value,
  });

onMounted(() => {
  init();
  window.addEventListener('beforeunload', () => backupState());
});

onBeforeMount(() => {
  window.removeEventListener('beforeunload', () => backupState());
});
//#endregion
</script>
