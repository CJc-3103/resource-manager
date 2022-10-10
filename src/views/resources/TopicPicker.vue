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
              >{{ $t(`topicPicker.dropdownMenu.multiCheck`) }}</el-dropdown-item
            >
            <el-dropdown-item @click="handleAddTopic">
              <el-icon> <Plus /> </el-icon
              >{{ $t(`topicPicker.dropdownMenu.add`) }}</el-dropdown-item
            >
            <el-dropdown-item>
              <el-icon>
                <Delete />
              </el-icon>
              {{ $t(`topicPicker.dropdownMenu.delete`) }}</el-dropdown-item
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
          $t(`topicPicker.defaultTopics.${name}`)
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
      :class="{ showCheckbox: isShowCheckbox }"
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
            v-for="({ title }, i) in filteredTopics"
            :key="i"
            :index="i + ''"
            @mouseover.prevent="(e) => handleMouseoverTopic(e.currentTarget, i)"
            @contextmenu.prevent="handleCtxMenuTopic"
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
        </el-checkbox-group>
      </el-menu>
    </el-scrollbar>
  </div>

  <!-- 右键菜单 -->
  <div v-if="isAllowCtxMenu" v-show="isShowCtxMenu">
    <el-popover
      popper-class="context-menu_popover"
      ref="topicCtxMenuRef"
      :virtual-ref="currentCtxTopicRef"
      trigger="contextmenu"
      virtual-triggering
      placement="right"
      :width="200"
    >
      <el-menu class="context-menu">
        <el-menu-item
          class="context-menu-item"
          @click="handleViewTopic(currentCtxTopicId)"
          >{{ $t('topicPicker.ctxMenu.view') }}</el-menu-item
        >
        <el-menu-item
          class="context-menu-item"
          @click="handleEditTopic(currentCtxTopicId)"
          >{{ $t('topicPicker.ctxMenu.edit') }}</el-menu-item
        >
      </el-menu>
    </el-popover>
  </div>

  <!-- <Teleport :to="'.ctx-menu-' + currentCtxTopicId">
    <el-menu class="right menu" v-if="isAllowCtxMenu" v-show="isShowCtxMenu">
      <el-menu-item @click="viewTopic(currentCtxTopicId)">{{
        $t('topicPicker.ctxMenu.view')
      }}</el-menu-item>
      <el-menu-item @click="editTopic(currentCtxTopicId)">{{
        $t('topicPicker.ctxMenu.edit')
      }}</el-menu-item>
    </el-menu>
  </Teleport> -->

  <!-- <CtxMenu>
    <el-menu-item @click="viewTopic(currentCtxTopicId)">{{
      $t('topicPicker.ctxMenu.view')
    }}</el-menu-item>
    <el-menu-item @click="editTopic(currentCtxTopicId)">{{
      $t('topicPicker.ctxMenu.edit')
    }}</el-menu-item>
  </CtxMenu> -->

  <!-- 这里的 :dialogVisible 非常重要，如果没有写上，子组件修改了内部值之后，及时成功调用了 emit() 方法，父组件也无法获取到更新值 -->
  <TopicFormDialog
    v-if="dialogVisible"
    v-model:dialogVisible="dialogVisible"
    :readonly="isDialogReadonly"
  />
</template>

<script setup>
//#region 依赖--
import { ref, computed, watch, onBeforeMount, onMounted, unref } from 'vue';
import { useStore } from 'vuex';
import { Search, Menu, Select, Plus, Delete } from '@element-plus/icons-vue';
import {
  getBackupLocal,
  setBackupLocal,
} from '@/utils/storage/backupState/utils';
import TopicFormDialog from './components/TopicFormDialog.vue';
import CtxMenu from '@/components/globals/CtxMenu.vue';
import { useActions } from '@/utils/vueHooks/useStore';

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
// 选中主题，右键菜单；初始加载时隐藏菜单
const isAllowCtxMenu = ref(false);
const isShowCtxMenu = ref(false);
const setCtxMenuTopic = (topicItemRef, id) => {
  currentCtxTopicId.value = id;
  currentCtxTopicRef.value = topicItemRef;
};

const currentCtxTopicId = ref(-1);
const currentCtxTopicRef = ref(null);
const allowCtxMenuTopic = () => (isAllowCtxMenu.value = true);
const toggleCtxMenuTopic = () => (isShowCtxMenu.value = !isShowCtxMenu.value);

const topicCtxMenuRef = ref(null);
const hideTopicCtxMenu = () => {
  topicCtxMenuRef.value.hide();
};

const handleCtxMenuTopic = () => {
  toggleCtxMenuTopic();
};
const handleMouseoverTopic = (topicItemRef, id) => {
  allowCtxMenuTopic();
  setCtxMenuTopic(topicItemRef, id);
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

const topicList = [];
async function initTopicList(topics) {
  topics.forEach((topic) => {
    topicList.push(topic.title);
  });
}

const totalTopicCount = computed(() => topics.length);
//#endregion --

//#region 交互--

//#region 搜索主题----
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
//#endregion ----

//#region 多选----
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
//#endregion ----

//#region 主题的 CURD----
const dialogVisible = ref(false);
const showDialog = () => (dialogVisible.value = true);
const isDialogReadonly = ref(true); //是否允许编辑信息
const setDialogReadonly = () => (isDialogReadonly.value = true);
const setDialogReadwrite = () => (isDialogReadonly.value = false);

// 添加主题
const handleAddTopic = () => {
  setDialogReadwrite();
  showDialog();
  console.log('checkedTopics', checkedTopics.value);
};
const handleViewTopic = () => {
  hideTopicCtxMenu();
  setDialogReadonly();
  showDialog();
  console.log('checkedTopics', checkedTopics.value);
};
const handleEditTopic = () => {
  hideTopicCtxMenu();
  setDialogReadwrite();
  showDialog();
  console.log('checkedTopics', checkedTopics.value);
};
const handleDeleteTopic = () => {
  hideTopicCtxMenu();
  setDialogReadonly();
  showDialog();
  console.log('checkedTopics', checkedTopics.value);
};
//#endregion ----

//#region 选择主题----
const currentTopic = computed(() => store.state.resources.currentTopic);
const setCurrentTopic = (topic) =>
  store.commit('resources/setCurrentTopic', topic);

function initTopic(currentTopic) {
  if (!currentTopic) setCurrentTopic(defaultTopics[0].index);
}

function handleSelectTopic(topic) {
  setCurrentTopic(topic);
}
//#endregion ----

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
