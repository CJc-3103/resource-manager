<template>
  <div class="scroll-container" :class="classObject">
    <slot></slot>
  </div>
</template>

<style scoped>
.scroll-container.scroll-x {
  overflow-x: auto;
}
.scroll-container.scroll-y {
  overflow-y: auto;
}
</style>

<script>
export default {
  props: {
    scrollX: Boolean,
    scrollY: Boolean,
  },
  computed: {
    classObject() {
      return {
        'scroll-x': this.scrollX,
        'scroll-y': this.scrollY,
      };
    },
  },
};
</script>
