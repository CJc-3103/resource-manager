<template>
  <div class="aside-container topic-picker">
    <!-- 搜索 -->
    <el-input
      clearable
      :placeholder="$t('topicPicker.placeholder')"
      v-model="search"
    >
      <template #append>
        <el-button :icon="Search" @click="handleSearchTopic(search)" />
      </template>
    </el-input>
    <!-- 功能区 -->
    <div class="action-group">
      <span class="aside-title">{{ $t('topicPicker.title') }}</span>
      <el-dropdown
        class="action-dropdown"
        hide-on-click
        popper-class="action-menu-popper"
      >
        <span class="el-dropdown-link">
          <el-icon>
            <Menu />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu class="action-menu">
            <el-dropdown-item @click="handleShowCheckbox">
              <el-icon> <Select /> </el-icon
              >{{ $t(`topicPicker.actions.multiCheck`) }}</el-dropdown-item
            >
            <el-dropdown-item @click="handleAddTopic">
              <el-icon> <Plus /> </el-icon
              >{{ $t(`topicPicker.actions.add`) }}</el-dropdown-item
            >
            <el-dropdown-item>
              <el-icon>
                <Delete />
              </el-icon>
              {{ $t(`topicPicker.actions.delete`) }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <!-- 主题列表 -->
    <el-menu
      class="aside-menu"
      :default-active="currentTopic"
      @select="handleSelectTopic"
    >
      <!-- 默认主题 -->
      <el-menu-item
        class="aside-menu-item"
        :index="index"
        v-for="({ name, index }, i) in defaultTopics"
        :key="i"
      >
        <span class="aside-menu-item_title">{{
          $t(`topicPicker.${name}`)
        }}</span>
      </el-menu-item>
    </el-menu>
    <!-- 全选 -->
    <div class="check-all-topic">
      <el-checkbox
        v-if="isAllowCheck"
        v-show="isShowCheckbox"
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange"
        >{{ $t('topicPicker.checkAll') }}</el-checkbox
      >
    </div>
    <!-- 自定义主题 -->
    <el-scrollbar
      class="aside-scroll topic-scroll"
      :class="{ isShowCheckbox: isShowCheckbox }"
      :style="{
        '--topic-default-items-count': defaultTopics.length,
      }"
    >
      <el-menu
        class="aside-menu"
        :default-active="currentTopic"
        @select="handleSelectTopic"
      >
        <el-checkbox-group
          v-model="checkedTopics"
          @change="handleCheckedTopicsChange"
        >
          <!-- <el-tooltip
            :content="title"
            placement="right"
            v-for="({ title }, i) in filteredTopics"
            :key="i"
          > -->
          <el-menu-item
            class="aside-menu-item"
            :index="i + ''"
            v-for="({ title }, i) in filteredTopics"
            :key="i"
          >
            <el-checkbox
              v-if="isAllowCheck"
              v-show="isShowCheckbox"
              :label="title"
            >
              {{ title }}</el-checkbox
            >
            <span v-show="!isShowCheckbox" class="aside-menu-item_title">{{
              title
            }}</span>
          </el-menu-item>
          <!-- </el-tooltip> -->
        </el-checkbox-group>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
//#region 依赖--
import { ref, computed, watch, onBeforeMount, onMounted } from 'vue';
import { useStore } from 'vuex';
import { Search, Menu, Select, Plus, Delete } from '@element-plus/icons-vue';
import {
  getBackupLocal,
  setBackupLocal,
} from '@/utils/storage/backupState/utils';

const store = useStore();
//#endregion --

//#region 视图构建--
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
// 初始加载时隐藏多选框
const isAllowCheck = ref(false);
const isShowCheckbox = ref(false);
const handleShowCheckbox = () => {
  isAllowCheck.value = true;
  isShowCheckbox.value = !isShowCheckbox.value;
};
//#endregion --

//#region 数据模型--
const topics = [
  {
    title: '网页收藏夹',
  },
  {
    title: '图片收集',
  },
];
// const topics = [
//   {
//     title: '1',
//   },
//   {
//     title: '2',
//   },
//   {
//     title: '3',
//   },
//   {
//     title: '4',
//   },
//   {
//     title: '5',
//   },
//   {
//     title: '6',
//   },
//   {
//     title: '7',
//   },
//   {
//     title: '8',
//   },
// ];

const topicList = [];
async function initTopicList(topics) {
  topics.forEach((topic) => {
    topicList.push(topic.title);
  });
}

const totalTopicCount = computed(() => topics.length);
//#endregion --

//#region 交互--

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

// 多选
const checkedTopics = ref([]);
const checkAll = ref(false);
const isIndeterminate = ref(false);
const handleCheckAllChange = (value) => {
  checkedTopics.value = value ? topicList : [];
  isIndeterminate.value = false;
};
const handleCheckedTopicsChange = (value) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === totalTopicCount.value;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < totalTopicCount.value;
};

// 添加主题

const handleAddTopic = () => {
  console.log('checkedTopics', checkedTopics.value);
};

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
//#endregion --

//#region 生命周期--
const backupKey = 'backupTopicPicker';

function init() {
  const backup = getBackupLocal(backupKey);
  search.value = backup?.search || '';
  initTopic(currentTopic.value);
  // 若之前有筛选，切回来时保持
  searchTopics(search.value);
  initTopicList(topics);
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
//#endregion --
</script>
