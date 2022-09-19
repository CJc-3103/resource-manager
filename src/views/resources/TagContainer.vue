<template>
  <dynCardList :cards="[]" :cardGap="0">
    <!-- <template v-slot:title="{ title }">
      <div class="card-header">
        <span>{{ title }}</span>
        <el-button class="button" text>Operation button</el-button>
      </div>
    </template> -->

    <template v-slot="{}"> </template>
  </dynCardList>
</template>

<script setup>
import { dynCardList } from '@/components/dyn-el';
import { ref } from 'vue';

// const cardList = ref([
//   {
//     cardTitle: '1',
//     children: [
//       {
//         title: '1-1',
//       },
//       {
//         title: '1-2',
//       },
//       {
//         title: '1-3',
//       },
//     ],
//   },
//   {
//     cardTitle: '2',
//   },
//   {
//     cardTitle: '3',
//   },
// ]);

const resources = [];
</script>
