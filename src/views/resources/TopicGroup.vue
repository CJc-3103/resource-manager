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
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { fetchTopic } from '@/api';
import { Search } from '@element-plus/icons-vue';
import '@/assets/styles/index.scss';
import { useArrayMap } from '@vueuse/shared';
import { cloneDeep } from 'lodash';

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
// const filteredTopics = reactive([]);
// const filteredTopics = reactive({ value: [] });
// const filteredTopics = ref([]);
// console.log('filteredTopics', filteredTopics);

// const filteredTopics = computed(() => searchTopics(topicKeywords));
// function handleChange(topicKeywords) {
//   console.log('topicKeywords', topicKeywords);
// }
const filteredTopics = ref(topics);
// watch(topicKeywords, (topicKeywords) => searchTopics(topicKeywords));

// 通过 filter 方法
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

// 通过 computed 或 watch
// const searchTopics = (topicKeywords) => {
//   let filteredData = [];
//   if (topicKeywords) {
//     filteredData = topics.filter(
//       (topic) => topic.title.indexOf(topicKeywords) > -1
//     );
//   } else {
//     filteredData = topics;
//   }
//   //   filteredTopics._value = cloneDeep(filteredData);
//   //   console.log('filteredData', filteredData);
//   //   console.log('filteredTopics', filteredTopics);
//   return filteredData;
// };

// 通过事件调用
// const searchTopics = (topicKeywords) => {
//   let filteredData = [];
//   if (topicKeywords) {
//     //   topics.filter((topic) => topic.title.indexOf(topicKeywords) > 0);
//     filteredData = topics.filter(
//       (topic) => topic.title.indexOf(topicKeywords) > -1
//     );
//     // filteredData.map((topic) => filteredTopics.value.push(topic));
//   } else {
//     filteredData = topics;
//     // filteredTopics.value = cloneDeep(topics);
//     // filteredTopics.value.length = 0;
//     // filteredTopics.value.splice(0, filteredTopics.value.length);
//   }
//   filteredTopics._value = cloneDeep(filteredData);
//   // filteredData.map((topic) => filteredTopics.value.push(topic));
//   console.log('filteredData', filteredData);
//   console.log('filteredTopics', filteredTopics);
//   //   console.log('filteredTopics', filteredTopics._value);
// };
// const searchTopics = (topicKeywords) => {
//   let filteredData = [];
//   if (topicKeywords)
//     //   topics.filter((topic) => topic.title.indexOf(topicKeywords) > 0);
//     filteredData = topics.filter(
//       (topic) => topic.title.indexOf(topicKeywords) > -1
//     );
//   else {
//     filteredData = topics;
//     // filteredTopics.length = 0;
//     filteredTopics.splice(0, filteredTopics.length);
//   }
//   filteredData.map((topic) => filteredTopics.push(topic));
//   console.log('filteredData', filteredData);
//   console.log('filteredTopics', filteredTopics);

//   //   if (topicKeywords)
//   //     //   topics.filter((topic) => topic.title.indexOf(topicKeywords) > 0);
//   //     topics.map((topic) => {
//   //       if (topic.title.indexOf(topicKeywords) > 0) filteredTopics.push(topic);
//   //     });
//   //   else {
//   //     filteredTopics.length = 0;
//   //     topics.map((topic) => filteredTopics.push(topic));
//   //     // filteredTopics = reactive([].concat(topics));
//   //   }
//   //   filteredTopics.length = 0;
//   //   topics.map((topic) => {
//   //     if (
//   //       !topicKeywords ||
//   //       (topicKeywords && topic.title.indexOf(topicKeywords) > 0)
//   //     ) {
//   //       filteredTopics.push(topic);
//   //     }
//   //   });
// };

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

onMounted(() => {
  searchTopics(); // 初始化主题列表
});
// const currentTopic = ref(topics[0].title);
// const selectTopic = (i, path, item) => {
//   currentTopic.value = item.index;
//   console.log(currentTopic.value);
// };

//#endregion
</script>
