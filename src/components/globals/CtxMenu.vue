<template>
  <!-- <Teleport to="body"> -->
  <Teleport to="[id|='el-popper-container']">
    <el-menu
      class="ctx-menu"
      v-if="isAllowCtxMenu"
      v-show="isShowCtxMenu"
      :style="
        isShowCtxMenu
          ? {
              '--position-top': posX + 'px',
              '--position-left': posY + 'px',
              '--cxt-menu-width': width ? width + 'px' : '200px',
            }
          : {
              '--position-top': 0,
              '--position-left': 0,
              '--cxt-menu-width': 0,
            }
      "
    >
      <slot></slot>
    </el-menu>
  </Teleport>
</template>

<style lang="scss">
.cxt-menu {
  position: fixed;
  z-index: 999;
  top: var(--position-top);
  left: var(--position-left);
  width: var(--cxt-menu-width);
}
</style>

<script setup>
import { useStates } from '@/utils/vueHooks/useStore';
import { computed } from '@vue/reactivity';
import { useMouse } from '@vueuse/core';
import { useStore } from 'vuex';

const props = defineProps({
  width: Number,
});

const store = useStore();
const { x: posX, y: posY } = useMouse({ touch: false });

// const { isAllowCtxMenu, isShowCtxMenu } = useStates([
//   'isAllowCtxMenu',
//   'isShowCtxMenu',
// ]);
const isAllowCtxMenu = computed(() => store.state.isAllowCtxMenu);
const isShowCtxMenu = computed(() => store.state.isShowCtxMenu);
</script>
