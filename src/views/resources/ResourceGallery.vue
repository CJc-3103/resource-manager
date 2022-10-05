<template>
  <el-card class="resource-gallery">
    <template #header> </template>
    <el-scrollbar class="resource-gallery_scroll">
      <div class="empty-panel" v-if="!resources.length">
        <el-empty :description="$t('resourceGallery.emptyDescription')" />
      </div>
      <div v-else class="resource-group">
        <el-card
          class="resource-item"
          v-for="({ path, type, title, background, tags }, i) in resources"
          :key="i"
        >
          <div class="content-panel">
            <a v-if="type == 'online'" :href="path" class="resource-icon">
              <el-button size="large" circle class="link-button">
                <!-- alt=" " 才能显示“破损的图片”图标 -->
                <img :src="background" alt=" " />
              </el-button>
            </a>
            <div v-else class="resource-pic">
              <img
                :src="background"
                :alt="$t('resourceGallery.resourceItem.noPicture')"
              />
            </div>
          </div>

          <div class="description">
            <div class="description_title">{{ title }}</div>
            <el-scrollbar>
              <div class="tag-group">
                <el-tag
                  v-for="(tag, j) in tags"
                  :key="j"
                  class="tag"
                  effect="light"
                  size="small"
                  closable
                  @close="handleTagClose(tag.title, i, resources)"
                  >{{ tag.title }}
                </el-tag>
              </div>
            </el-scrollbar>
          </div>
        </el-card>
      </div>
    </el-scrollbar>
  </el-card>
</template>

<script setup>
import { ref, nextTick, getCurrentInstance, reactive } from 'vue';

const resources = reactive([
  {
    path: 'https://sanjiaohanshu.wncx.cn',
    type: 'online',
    title: '三角函数计时器',
    background:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAQ1JREFUOE9jZFi5s4GBkamegRrg/79GRoZVu/9TwyyYGYPPwP+hLgyMq/fAPUmRC0GGhR2/zLD6yUvKDFTk5mS452WNYRjIVJJdCHLVxQ+fGQx2n2QwFuRjOPv+E0qcYjWwVUeZofrKXRSFkwzVGXJVZOHhtcJClyHixGWMBEKUC0GuSj5zjWHe/WcEUxheAycYqDHkq8qhxCIhEzEMTFKUArsE5Krii7cY+m49ImQG/jAsVJNjCJURBwd27vmbJBmGNZYdxQQZuvRUGUz3nCLZMKwGoqd8Uk1FCcPddkYM7TceMOx79Y5Uc7DnFEpdh+Hlpz62DNJbDpPtOrKyHiHbiMophAxBlmekdhUAAMWSf+FveLSrAAAAAElFTkSuQmCC',
    tags: [
      {
        title: '工具',
      },
      {
        title: '在线',
      },
      {
        title: '数学',
      },
    ],
  },
  {
    path: 'https://cn.vuejs.org/guide/introduction.html',
    type: 'online',
    title: 'Vue官网',
    background: 'https://cn.vuejs.org/logo.svg',
    tags: [
      {
        title: '工具',
      },
      {
        title: '在线',
      },
      {
        title: '软件开发',
      },
      {
        title: '前端',
      },
      {
        title: '视图构建',
      },
    ],
  },
  {
    path: 'fubuki.png',
    type: 'local',
    title: '白上吹雪',
    background: require('../../assets/imgs/fubuki.png'),
    tags: [
      {
        title: '狐狸',
      },
      {
        title: '白猫',
      },
    ],
  },
  {
    path: 'https://sanjiaohanshu.wncx.cn',
    type: 'online',
    title: '三角函数计时器',
    tags: [
      {
        title: '工具',
      },
      {
        title: '在线',
      },
      {
        title: '数学',
      },
    ],
  },
  {
    path: 'https://sanjiaohanshu.wncx.cn',
    type: 'online',
    title: '三角函数计时器',
    tags: [
      {
        title: '工具',
      },
      {
        title: '在线',
      },
      {
        title: '数学',
      },
    ],
  },
  {
    path: 'https://sanjiaohanshu.wncx.cn',
    type: 'online',
    title: '三角函数计时器',
    tags: [
      {
        title: '工具',
      },
      {
        title: '在线',
      },
      {
        title: '数学',
      },
    ],
  },
]);

// const scrollRefs = ref(Array(resources.length).fill(''));

// 关闭标签
function handleTagClose(tagTitle, resourceIdx, resources) {
  let tags = resources[resourceIdx].tags;
  const idx = resources[resourceIdx].tags.findIndex(
    (tag) => tag.title === tagTitle
  );
  tags.splice(idx, 1);
}

// const { ctx } = getCurrentInstance();

// nextTick(() => {
//   ctx.$forceUpdate();
// });
</script>
