<template>
  <div class="dyn-grid-layout">
    <dynRowList :rows="rows">
      <template v-slot="{ children }">
        <dynColList :children="children">
          <template v-slot="{ children }">
            <slot :children="children"></slot>
          </template>
        </dynColList>
      </template>
    </dynRowList>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import dynRowList from './dyn-row-list.vue';
import dynColList from './dyn-col-list.vue';
export default {
  name: 'dyn-grid-layout',
  components: { dynRowList, dynColList },
  data() {
    return {};
  },
  props: {
    rows: Array,
  },
};
</script>
