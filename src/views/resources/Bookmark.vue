<template>
  <h2>收藏夹</h2>
  <!-- <div class="aside-container bookmark-picker">
    <!== 搜索 ==>
    <el-input
      size="small"
      clearable
      :placeholder="$t('bookmark.placeholder')"
      v-model="search"
    >
      <template #append>
        <el-button :icon="Search" @click="handleSearchBookmark(search)" />
      </template>
    </el-input>
    <!== 排序 ==>
    <!== 新增 ==>
    <!== 多选 ==>

    <!== 主题区域 ==>
    <div class="aside-title">{{ $t('bookmark.title') }}</div>
    <span class="action-group"> </span>
    <el-menu
      class="aside-menu"
      :default-active="currentBookmark"
      @select="handleSelectBookmark"
    >
      <el-tooltip
        :content="title"
        placement="left"
        v-for="({ title }, i) in filteredBookmarks"
        :key="i"
      >
        <el-menu-item class="aside-menu-item" :index="i + ''">
          <span class="aside-menu-item_title">{{ title }}</span>
        </el-menu-item>
      </el-tooltip>
    </el-menu>
  </div> -->
</template>

<script setup>
//#region 依赖
import { ref, computed, watch, onBeforeMount, onMounted } from 'vue';
import { useStore } from 'vuex';
import {
  getBackupLocal,
  setBackupLocal,
} from '@/utils/storage/backupState/utils';

const store = useStore();
//#endregion

//#region 数据模型
const bookmarks = [
  {
    title: '网页收藏夹',
  },
  {
    title: '图片收集',
  },
];
//#endregion

// //#region 交互

// // 搜索主题
// const search = ref('');
// const filteredBookmarks = ref(bookmarks);
// watch(search, (search) => {
//   if (!search) searchBookmarks(search);
// });
// const searchBookmarks = (search) => {
//   let filter = [];
//   if (search) {
//     filter = bookmarks.filter(
//       (bookmark) => bookmark.title.indexOf(search) > -1
//     );
//   } else {
//     filter = bookmarks;
//   }
//   filteredBookmarks.value = filter;
// };

// function handleSearchBookmark(search) {
//   searchBookmarks(search);
// }

// // 选择主题
// const currentBookmark = computed(() => store.state.resources.currentBookmark);
// const setCurrentBookmark = (bookmark) =>
//   store.commit('resources/setCurrentBookmark', bookmark);

// function initBookmark(currentBookmark) {
//   if (!currentBookmark) setCurrentBookmark(defaultBookmarks[0].index);
// }

// function handleSelectBookmark(bookmark) {
//   setCurrentBookmark(bookmark);
// }

// // 生命周期
// const backupKey = 'backupBookmarkPicker';

// function init() {
//   const backup = getBackupLocal(backupKey);
//   search.value = backup?.search || '';
//   initBookmark(currentBookmark.value);
//   // 若之前有筛选，切回来时保持
//   searchBookmarks(search.value);
// }
// const backupState = () =>
//   setBackupLocal(backupKey, {
//     search: search.value,
//   });

// onMounted(() => {
//   init();
//   window.addEventListener('beforeunload', () => backupState());
// });

// onBeforeMount(() => {
//   window.removeEventListener('beforeunload', () => backupState());
// });
//#endregion
</script>
