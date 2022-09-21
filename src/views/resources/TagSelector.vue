<template>
  <el-card class="tag-selector">
    <template #header>
      <el-row class="tag-selector_header" :gutter="10" justify="space-between">
        <el-col :xs="24" :sm="12" :md="6" :lg="6" class="tag-selector_title"
          >选择标签</el-col
        >
        <el-col :xs="24" :sm="12" :md="6" :lg="6" class="tag-selector_action">
          <el-input placeholder="输入标签名" v-model="tagKeywords">
            <template #append>
              <el-button :icon="Search" @click="searchTags(tagKeywords)" />
            </template>
          </el-input>
        </el-col>
      </el-row>
    </template>

    <div class="tag-tree-container">
      <div class="tag-tree-group">
        <div class="tag-tree" v-for="({ title, children }, i) in tags" :key="i">
          <div class="tag-tree_title">{{ title }}</div>
          <el-radio-group
            v-model="currentTags[i]"
            class="tag-tree_children"
            @change="handleTagSelect"
          >
            <el-radio-button
              :label="title"
              size="small"
              class="tag-tree_child"
              v-for="({ title }, j) in children"
              :key="j"
            />
          </el-radio-group>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
//#region 依赖
import { ref, reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { Search } from '@element-plus/icons-vue';
import { dynGridLayout } from '@/components/dyn-el';

const store = useStore();
//#endregion

//#region 视图构建
const tags = [
  {
    title: '用途',
    children: [
      {
        title: '工具',
      },
      {
        title: '教程',
      },
      {
        title: '规范',
      },
      {
        title: '文档',
      },
      {
        title: '文章',
      },
      {
        title: '资讯',
      },
    ],
  },
  {
    title: '关注点',
    children: [
      {
        title: '体系梳理',
      },
      {
        title: '概念阐释',
      },
      {
        title: '对比分析',
      },
      {
        title: '思维提升',
      },
      {
        title: '问题处理',
      },
      {
        title: '技巧',
      },
    ],
  },
  {
    title: '关注点',
    children: [
      {
        title: '体系梳理',
      },
      {
        title: '概念阐释',
      },
      {
        title: '对比分析',
      },
      {
        title: '思维提升',
      },
      {
        title: '问题处理',
      },
      {
        title: '技巧',
      },
    ],
  },
  {
    title: '关注点',
    children: [
      {
        title: '体系梳理',
      },
      {
        title: '概念阐释',
      },
      {
        title: '对比分析',
      },
      {
        title: '思维提升',
      },
      {
        title: '问题处理',
      },
      {
        title: '技巧',
      },
    ],
  },
  {
    title: '关注点',
    children: [
      {
        title: '体系梳理',
      },
      {
        title: '概念阐释',
      },
      {
        title: '对比分析',
      },
      {
        title: '思维提升',
      },
      {
        title: '问题处理',
      },
      {
        title: '技巧',
      },
    ],
  },
  {
    title: '关注点',
    children: [
      {
        title: '体系梳理',
      },
      {
        title: '概念阐释',
      },
      {
        title: '对比分析',
      },
      {
        title: '思维提升',
      },
      {
        title: '问题处理',
      },
      {
        title: '技巧',
      },
    ],
  },
  {
    title: '关注点',
    children: [
      {
        title: '体系梳理',
      },
      {
        title: '概念阐释',
      },
      {
        title: '对比分析',
      },
      {
        title: '思维提升',
      },
      {
        title: '问题处理',
      },
      {
        title: '技巧',
      },
    ],
  },
  {
    title: '关注点',
    children: [
      {
        title: '体系梳理',
      },
      {
        title: '概念阐释',
      },
      {
        title: '对比分析',
      },
      {
        title: '思维提升',
      },
      {
        title: '问题处理',
      },
      {
        title: '技巧',
      },
    ],
  },
  {
    title: '关注点',
    children: [
      {
        title: '体系梳理',
      },
      {
        title: '概念阐释',
      },
      {
        title: '对比分析',
      },
      {
        title: '思维提升',
      },
      {
        title: '问题处理',
      },
      {
        title: '技巧',
      },
    ],
  },
];

//#endregion

//#region 交互

// 搜索主题
const tagKeywords = ref('');
const filteredTags = reactive(tags);
// console.log('filteredTags', filteredTags);

const searchTags = (tagKeywords) => {
  if (tagKeywords) {
    filteredTags.value = tags.filter(
      (tag) => tag.title.indexOf(tagKeywords) > -1
    );
  } else {
    filteredTags.value = tags;
  }
};

// 选择主题
const currentTags = reactive(new Array(tags.length).fill(''));
const updateCurrentTags = (topic) =>
  store.dispatch('resources/updateCurrentTags', topic);
const initCurrentTags = () => {
  for (let i = 0; i < tags.length; i++) {
    currentTags[i] = '';
  }
  updateCurrentTags(currentTags);
};

function handleTagSelect() {
  updateCurrentTags(currentTags);
}

//#endregion

//#region 生命周期
onMounted(() => {
  initCurrentTags();
});

//#endregion
</script>
