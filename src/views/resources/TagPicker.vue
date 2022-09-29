<template>
  <el-card class="tag-picker">
    <template #header>
      <el-row class="tag-picker_header" :gutter="10" justify="space-between">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" class="tag-picker_action">
          <el-input
            size="small"
            :placeholder="$t('tagPicker.placeholder')"
            v-model="tagKeywords"
          >
            <template #append>
              <el-button
                size="small"
                :icon="Search"
                @click="searchTags(tagKeywords)"
              />
            </template>
          </el-input>
        </el-col>
      </el-row>
    </template>

    <div class="tag-tree-panel">
      <!-- <el-col :xs="24" :sm="12" :md="6" :lg="6" class="tag-picker_title"> -->
      <div
        class="tag-tree tags--picked"
        v-if="isDisplayPicked"
        v-show="pickedTagsCount"
      >
        <div class="tag-tree_title">{{ $t('tagPicker.pickedTitle') }}</div>
        <el-tag type="warning" class="tag" closable @close="handleCloseAll">
          {{ $t('tagPicker.clearAll') }}
        </el-tag>
        <div class="tag-group">
          <template v-for="(tag, i) in currentTags" :key="i">
            <el-tag
              v-show="tag"
              class="tag"
              closable
              @close="handleCloseTag(i, tag)"
            >
              {{ tag }}
            </el-tag></template
          >
        </div>
      </div>
      <!-- </el-col> -->

      <el-scrollbar>
        <div class="tag-tree-group">
          <div
            class="tag-tree"
            v-for="({ title, children }, i) in tags"
            :key="i"
          >
            <div class="tag-tree_title">{{ title }}</div>
            <el-radio-group
              v-model="currentTags[i]"
              class="tag-group"
              @change="handleTagPicked(i)"
            >
              <el-radio-button
                :label="title"
                size="small"
                class="tag"
                v-for="({ title }, j) in children"
                :key="j"
              />
            </el-radio-group>
          </div></div
      ></el-scrollbar>
    </div>
  </el-card>
</template>

<script setup>
//#region 依赖
import { ref, reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { Search } from '@element-plus/icons-vue';

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
    title: '领域',
    children: [
      {
        title: 'IT',
      },
      {
        title: '设计',
      },
      {
        title: '管理',
      },
      {
        title: '娱乐',
      },
      {
        title: '数学',
      },
      {
        title: '语言',
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
    title: '领域',
    children: [
      {
        title: 'IT',
      },
      {
        title: '设计',
      },
      {
        title: '管理',
      },
      {
        title: '娱乐',
      },
      {
        title: '数学',
      },
      {
        title: '语言',
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

//#region 搜索标签
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
//#endregion

//#region 选择标签
// const storedPickedTags = computed(() => store.state.resources.currentTags);
const currentTags = ref([]);
// const currentTags = storedPickedTags.length
//   ? storedPickedTags
//   : ref(new Array(tags.length).fill(''));
const setCurrentTags = (tags) => store.commit('resources/setCurrentTags', tags);
const pickedTagsCount = computed(() => store.state.resources.pickedTagsCount);
const isPickedList = ref([]);

const isDisplayPicked = ref(!!pickedTagsCount);

const initCurrentTags = () => {
  currentTags.value = new Array(tags.length).fill('');
  isPickedList.value = new Array(tags.length).fill(false);
  if (!pickedTagsCount) setCurrentTags(currentTags);
};

const logResult = () => {
  console.log('currentTags', currentTags.value);
  console.log('pickedTagsCount', pickedTagsCount.value);
};

function handleTagPicked(id) {
  if (!isDisplayPicked.value) isDisplayPicked.value = true;
  if (!isPickedList[id]) {
    store.dispatch('resources/incrementPickedTags');
    isPickedList[id] = true;
  }
  setCurrentTags(currentTags);

  logResult();
}
//#endregion

//#region 取消已选中标签

function removeClosedTag(currentTags, tagIdx) {
  currentTags[tagIdx] = '';
}

function handleCloseTag(tagId) {
  removeClosedTag(tagId);
  setCurrentTags(currentTags);
  store.dispatch('resources/decrementPickedTags');

  logResult();
}

function closeAllTags() {
  initCurrentTags();
}

function handleCloseAll() {
  store.dispatch('resources/clearCurrentTags');
  closeAllTags();
  setCurrentTags(currentTags);

  logResult();
}
//#endregion

//#endregion

//#region 生命周期
onMounted(() => {
  initCurrentTags();
});

//#endregion
</script>
