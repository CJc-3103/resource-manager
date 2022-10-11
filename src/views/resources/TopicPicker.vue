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
            <!-- <el-dropdown-item>
              <el-icon>
                <Delete />
              </el-icon>
              {{ $t(`topicPicker.dropdownMenu.delete`) }}</el-dropdown-item
            > -->
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <!-- 默认主题 -->
    <el-menu
      class="aside-menu"
      :default-active="currentTopic"
      @select="handleSelectTopic"
    >
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
            :content="topicName"
            placement="right"
            v-for="({ topicName }, i) in filteredTopics"
            :key="i"
          > -->
          <el-menu-item
            class="aside-menu-item"
            v-for="topic in filteredTopics"
            :key="topic.id"
            :index="topic.id + ''"
            @mouseover.prevent="
              (e) => handleMouseoverTopic(e.currentTarget, topic)
            "
            @contextmenu.prevent="handleCtxMenuTopic"
          >
            <el-checkbox
              v-if="isAllowCheck"
              v-show="isShowCheckbox"
              :label="topicName"
            >
              {{ topic.topicName }}</el-checkbox
            >
            <span v-show="!isShowCheckbox" class="aside-menu-item_title">{{
              topic.topicName
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
    >
      <el-menu class="context-menu">
        <el-menu-item
          class="context-menu-item"
          @click="handleViewTopic(currentCtxTopic)"
        >
          <el-tag round
            ><el-icon><View /></el-icon
          ></el-tag>
          {{ $t('topicPicker.ctxMenu.view') }}</el-menu-item
        >
        <el-menu-item
          class="context-menu-item"
          @click="handleEditTopic(currentCtxTopic)"
        >
          <el-tag type="success" round effect="dark"
            ><el-icon><Edit /></el-icon></el-tag
          >{{ $t('topicPicker.ctxMenu.edit') }}</el-menu-item
        >
        <el-menu-item
          class="context-menu-item"
          @click="handleDeleteTopic(currentCtxTopic)"
        >
          <el-tag type="danger" round effect="dark">
            <el-icon><Delete /></el-icon></el-tag
          >{{ $t('topicPicker.ctxMenu.delete') }}</el-menu-item
        >
      </el-menu>
    </el-popover>
  </div>

  <!-- 这里的 :dialogVisible 非常重要，如果没有写上，子组件修改了内部值之后，及时成功调用了 emit() 方法，父组件也无法获取到更新值 -->
  <TopicFormDialog
    v-if="dialogVisible"
    v-model:dialogVisible="dialogVisible"
    v-model:formStatus="formStatus"
    :formType="formType"
    :topicData="currentCtxTopic"
  />
</template>

<script setup>
//#region 依赖--

//#region 组件----
import {
  Search,
  Menu,
  Select,
  Plus,
  Delete,
  View,
  Edit,
} from '@element-plus/icons-vue';
import TopicFormDialog from './components/TopicFormDialog.vue';
import CtxMenu from '@/components/globals/CtxMenu.vue';
import { useActions } from '@/utils/vueHooks/useStore';
//#endregion ----

//#region 逻辑----
import { ref, computed, watch, onBeforeMount, onMounted, toRaw } from 'vue';
import { useStore } from 'vuex';
import {
  getBackupLocal,
  setBackupLocal,
} from '@/utils/storage/backupState/utils';
import { getAllTopics } from '@/api';
import { db } from '@/indexedDB';
//#endregion ----

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
const filteredTopics = ref([]);
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
const allowCtxMenuTopic = () => (isAllowCtxMenu.value = true);
const toggleCtxMenuTopic = () => (isShowCtxMenu.value = !isShowCtxMenu.value);

const currentCtxTopicRef = ref(null);
const currentCtxTopic = ref(null);
const setCtxMenuTopic = (topicItemRef, topic) => {
  currentCtxTopicRef.value = topicItemRef;
  currentCtxTopic.value = topic;
};

const topicCtxMenuRef = ref(null);
const hideTopicCtxMenu = () => {
  topicCtxMenuRef.value.hide();
};

const handleMouseoverTopic = (topicItemRef, topic) => {
  allowCtxMenuTopic();
  setCtxMenuTopic(topicItemRef, topic);
};
const handleCtxMenuTopic = () => {
  toggleCtxMenuTopic();
};
// 主题表单
const formType = ref('view');
const formStatus = ref('pending');
//#endregion --

//#region 数据模型--
let topicList = [];
const initTopicList = (search) => {
  getAllTopics().then((topics) => {
    topicList = topics;
    searchTopics(search);
  });
};
watch(formStatus, (status) => {
  if (status === 'success') initTopicList(search.value);
});

const totalTopicCount = computed(() => topicList.length);
//#endregion --

//#region 交互--

//#region 搜索主题----
const search = ref('');
watch(search, (search) => {
  if (!search) searchTopics(search);
});
const searchTopics = (search) => {
  let filter = [];
  if (search) {
    filter = topicList.filter(
      ({ topicName }) => topicName.indexOf(search) > -1
    );
  } else {
    filter = topicList;
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
const showDialog = (status, topic) => {
  formStatus.value = 'pending';
  formType.value = status;
  currentCtxTopic.value = topic || '';
  dialogVisible.value = true;
};

// 添加主题
const handleAddTopic = () => {
  showDialog('add');
};
// 查看主题
const handleViewTopic = (topicName) => {
  hideTopicCtxMenu();
  showDialog('view', topicName);
  console.log('checkedTopics', checkedTopics.value);
};
// 编辑主题
const handleEditTopic = (topicName) => {
  hideTopicCtxMenu();
  showDialog('edit', topicName);
  console.log('checkedTopics', checkedTopics.value);
};
// 删除主题
const handleDeleteTopic = (topicName) => {
  hideTopicCtxMenu();
  showDialog('delete', topicName);
  console.log('checkedTopics', checkedTopics.value);
};
//#endregion ----

//#region 选择主题----
const currentTopic = computed(() => store.state.resources.currentTopic);
const setCurrentTopic = (topic) =>
  store.commit('resources/setCurrentTopic', topic);

function initTopicMenu(currentTopic) {
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
  initTopicMenu(currentTopic.value);
  initTopicList(search.value); // 若之前有筛选，切回来时保持
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
