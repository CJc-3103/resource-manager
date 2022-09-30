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
          <template v-for="(tag, i) in pickedTags" :key="i">
            <el-tag
              v-show="tag"
              class="tag"
              closable
              @close="handleCloseTag(i)"
            >
              {{ tag }}
            </el-tag></template
          >
        </div>
      </div>

      <el-scrollbar>
        <div class="tag-tree-group">
          <div
            class="tag-tree"
            v-for="({ title, children }, i) in tags"
            :key="i"
          >
            <div class="tag-tree_title">{{ title }}</div>
            <el-radio-group
              v-model="pickedTags[i]"
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
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { Search } from '@element-plus/icons-vue';

const store = useStore();
//#endregion

//#region 视图构建
const isDisplayPicked = ref(false); // 是否渲染已选标签列表
//#endregion

//#region 数据模型
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
const tagCount = tags.length;

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
const storedPickedTags = computed(() => store.state.resources.pickedTags);
// const { pickedTags: storedPickedTags } = useStates(['pickedTags'], 'resources');

const pickedTags = ref(new Array(tagCount));
const setPickedTags = (tags) => store.commit('resources/setPickedTags', tags);
watch(pickedTags.value, (pickedTags) => setPickedTags(pickedTags));

const pickedTagsCount = ref(0);
const isPickedList = ref(new Array(tagCount));

const setIsPickedInList = (tagId, isPicked) =>
  (isPickedList.value[tagId] = isPicked);

// 事件实际执行函数
const pickTag = (tagGroupId) => {
  if (!isPickedList.value[tagGroupId]) {
    pickedTagsCount.value = Math.min(tagCount, pickedTagsCount.value + 1);
    setIsPickedInList(tagGroupId, true);
  }
};
const closeTag = (tagId) => {
  pickedTagsCount.value = Math.max(0, pickedTagsCount.value - 1);
  setIsPickedInList(tagId, false);
  pickedTags.value[tagId] = '';
};
const resetPicked = () => {
  pickedTagsCount.value = 0;
  for (let i = 0; i < pickedTags.value.length; i++) {
    pickedTags.value[i] = '';
    isPickedList.value[i] = false;
  }
};

const logResult = () => {
  //   console.log('pickedTagsCount', pickedTagsCount.value);
  //   console.log('pickedTags', pickedTags.value);
  //   console.log('storedPickedTags', storedPickedTags.value);
};

// 事件处理器
function handleTagPicked(tagId) {
  if (!isDisplayPicked.value) isDisplayPicked.value = true;
  pickTag(tagId);

  logResult();
}
function handleCloseTag(tagId) {
  closeTag(tagId);

  logResult();
}
function handleCloseAll() {
  resetPicked();

  logResult();
}
//#endregion

//#endregion

//#region 生命周期
onMounted(() => {
  isDisplayPicked.value = !!pickedTagsCount.value;
  resetPicked();
});

//#endregion
</script>
