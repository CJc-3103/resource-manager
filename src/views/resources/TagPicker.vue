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
import { useStates } from '@/utils/vueHooks/useStore';

const store = useStore();
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
// const storedPickedTags = computed(() => store.state.resources.pickedTags);
const { pickedTags: storedPickedTags } = useStates(['pickedTags'], 'resources');

const pickedTags = ref(new Array(tags.length));
// const pickedTags = storedPickedTags.length
//   ? storedPickedTags
//   : ref(new Array(tags.length).fill(''));
const setPickedTags = (tags) => store.commit('resources/setPickedTags', tags);
// watch(pickedTags.value,(pickedTags)=>setPickedTags(pickedTags));

const pickedTagsCount = computed(() => store.state.resources.pickedTagsCount);

const isPickedList = ref(new Array(tags.length));
const setIsPicked = (tagId, isPicked) => (isPickedList[tagId] = isPicked);
const setPicked = (tagId) => setIsPicked(tagId, true);
const setClosed = (tagId) => setIsPicked(tagId, false);
const isDisplayPicked = ref(false);

const initPickedTags = () => {
  for (let i = 0; i < pickedTags.value.length; i++) {
    pickedTags.value[i] = '';
    isPickedList.value[i] = false;
  }
  //   if (!pickedTagsCount.value) setPickedTags(pickedTags.value);
};

const logResult = () => {
  //   console.log('pickedTags', pickedTags.value);
  //   console.log('pickedTagsCount', pickedTagsCount.value);
  //   console.log('storedPickedTags', storedPickedTags.value);
};

function handleTagPicked(tagId) {
  if (!isDisplayPicked.value) isDisplayPicked.value = true;
  if (!isPickedList.value[tagId]) {
    store.dispatch('resources/incrementPickedTags');
    setPicked(tagId);
  }
  setPickedTags(pickedTags.value);

  logResult();
}
//#endregion

//#region 取消选中标签

function removeClosedTag(pickedTags, tagIdx) {
  pickedTags[tagIdx] = '';
}

function handleCloseTag(tagId) {
  store.dispatch('resources/decrementPickedTags');
  setClosed(tagId);
  removeClosedTag(pickedTags.value, tagId);
  setPickedTags(pickedTags.value);

  logResult();
}

function handleCloseAll() {
  store.dispatch('resources/resetPickedTags');
  initPickedTags();
  setPickedTags(pickedTags.value);

  logResult();
}
//#endregion

//#endregion

//#region 生命周期
onMounted(() => {
  isDisplayPicked.value = !!pickedTagsCount.value;
  initPickedTags();
});

//#endregion
</script>
