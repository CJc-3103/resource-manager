<template>
  <el-menu
    class="dyn-context-menu"
    :style="{
      width: menuWidth + 'px',
      left: posX + 'px',
      top: posY + 'px',
    }"
  >
    <dyn-menu-container
      v-if="menuList.length > 0"
      :menuList="menuList"
    ></dyn-menu-container>
  </el-menu>
</template>

<style scoped lang="scss">
.dyn-context-menu {
  z-index: 999;
  position: absolute;
  left: 100px;
  border: 1px solid #dcdfe6;

  >>> .el-menu-item,
  .el-submenu__title {
    height: 35px;
    line-height: 35px;
    &:hover {
      color: #409eff;
    }
  }
}
</style>

<script>
import { dynMenuContainer } from '../dyn-menu/index';
export default {
  name: 'dyn-context-menu',
  components: {
    dynMenuContainer,
  },
  data() {
    return {
      posX: 0,
      posY: 0,
      menuItemHeight: 35, // 与 el-tree 的节点高度相同
    };
  },
  props: {
    menuList: Array,
    menuWidth: {
      type: Number,
      default: 200,
    },
  },
  methods: {
    setMenuPosition(posX, posY, menuWidth) {
      let clientWidth =
          document.documentElement.clientWidth || document.body.clientWidth,
        scrollLeft =
          document.documentElement.scrollLeft || document.body.scrollLeft,
        clientHeight =
          document.documentElement.clientHeight || document.body.clientHeight,
        scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;

      this.posX =
        posX + menuWidth > clientWidth + scrollLeft ? posX - menuWidth : posX;
      this.posY =
        posY + menuWidth > clientHeight + scrollTop
          ? posY - this.menuItemHeight * this.menuList.length
          : posY;
    },
  },
};
</script>
