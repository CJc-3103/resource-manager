<template>
  <!-- 搜索 -->
  <el-input size="small" placeholder="输入主题名" v-model="topicKeywords">
    <template #append>
      <el-button :icon="Search" @click="searchTopics(topicKeywords)" />
    </template>
  </el-input>
  <!-- 排序 -->
  <!-- 新增 -->
  <!-- 多选 -->

  <!-- 主题区域 -->
  <div class="aside-title">选择主题</div>
  <span class="action-group"> </span>
  <!-- 默认主题 -->
  <el-menu
    class="topic-menu"
    :default-active="currentTopic"
    @select="selectTopic"
  >
    <el-menu-item
      class="topic-item"
      :index="title"
      v-for="({ title }, i) in defaultTopics"
      :key="i"
    >
      <span class="topic-txt">{{ title }}</span>
    </el-menu-item>
    <!-- 自定义主题 -->
    <el-tooltip
      :content="title"
      placement="right"
      v-for="({ title }, i) in filteredTopics"
      :key="i"
    >
      <el-menu-item class="topic-item" :index="title">
        <span class="topic-txt">{{ title }}</span>
      </el-menu-item>
    </el-tooltip>
  </el-menu>
</template>

<script setup>
//#region 依赖
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { fetchTopic } from '@/api';
import { Search } from '@element-plus/icons-vue';

const store = useStore();
//#endregion

//#region 视图构建
const defaultTopics = [
  {
    title: '全部',
  },
  {
    title: '未分组',
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
  let filteredData = [];
  if (topicKeywords) {
    filteredTopics.value = filteredData = topics.filter(
      (topic) => topic.title.indexOf(topicKeywords) > -1
    );
  } else {
    // filteredTopics.value = cloneDeep(topics);
    filteredTopics.value = topics;
  }
};

// 选择主题
const currentTopic = computed(() => store.state.currentTopic);
const updateCurrentTopic = (topic) =>
  store.dispatch('updateCurrentTopic', topic);

function initTopic(currentTopic) {
  if (!currentTopic) updateCurrentTopic(topics[0].title);
}
initTopic(currentTopic.value);

function selectTopic(topic) {
  updateCurrentTopic(topic);
}

// 声明周期
onMounted(() => {
  searchTopics(); // 初始化主题列表
});

//#endregion
</script>
