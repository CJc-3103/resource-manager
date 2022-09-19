<template>
  <div class="dyn-card-list">
    <el-card
      v-bind="$attrs"
      :style="cardGap ? { '--cardGap': cardGap + 'px' } : ''"
      v-for="(card, index) in cardList"
      :key="index"
    >
      <slot name="title" :title="card.cardTitle">{{ card.cardTitle }}</slot>

      <slot :children="card?.children ?? []"></slot>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.dyn-card-list {
  .el-card:nth-child(n + 2) {
    margin-top: var(--cardGap); // 设置除第一个卡片外其他卡片的上间距
  }
}
</style>

<script>
import { castArray } from 'lodash';
export default {
  name: 'dyn-card-list',
  computed: {
    cardList() {
      return castArray(this.cards);
    },
  },
  props: {
    // 卡片数组，只有一个卡片时可以传对象
    cards: {
      type: [Array, Object],
      require: true,
    },
    cardGap: {
      type: Number,
      default: 0,
    },
  },
};
</script>
