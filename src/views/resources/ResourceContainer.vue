<template>
  <el-card>
    <div class="resource-empty-panel" v-if="!resources.length">
      <el-empty :description="$t('resourceContainer.emptyDescription')" />
    </div>
    <div v-else class="resource-container">
      <el-card
        class="resource-item"
        v-for="({ path, type, title, background, tags }, i) in resources"
        :key="i"
      >
        <!-- <el-card
        class="resource-item"
        :class="`resource-item--${type == 'online' ? 'online' : 'local'}`"
        :style="{ [`--resource-icon_background-${i}`]: background ?? '' }"
        v-for="({ path, type, title, background, tags }, i) in resources"
        :key="i"
      > -->
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
              :alt="$t('resourceContainer.resourceItem.noPicture')"
            />
          </div>
        </div>

        <div class="resource-item-description_panel">
          <div class="resource-item-description_title">{{ title }}</div>
          <el-scrollbar>
            <div class="resource-item_tag-list">
              <!--  若能添加固定宽度，或许可以显示滚动条
                 <div
              class="resource-item_tag-list"
              :class="{}"
              :style="{ [`--resource-item_list-tag-count_${j}`]: tags.length }"
            > -->
              <el-tag
                v-for="(tag, j) in tags"
                :key="j"
                class="tag resource-item_tag"
                effect="light"
                size="small"
                closable
                >{{ tag.title }}
              </el-tag>
            </div>
          </el-scrollbar>
        </div>
      </el-card>
    </div>
  </el-card>
</template>

<script setup>
import { ref, nextTick, getCurrentInstance } from 'vue';

const resources = ref([
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

const scrollRefs = ref(Array(resources.length).fill(''));

const { ctx } = getCurrentInstance();

nextTick(() => {
  ctx.$forceUpdate();
});
</script>
