<template>
  <!-- <el-tree
      :ref="innerRef"
      :data="data"
      :empty-text="emptyText"
      :node-key="nodeKey"
      :props="props"
      :render-after-expand="renderAfterExpand"
      :load="load"
      :render-content="renderContent"
      :highlight-current="highlightCurrent"
      :default-expand-all="defaultExpandAll"
      :expand-on-click-node="expandOnClickNode"
      :check-on-click-node="checkOnClickNode"
      :auto-expand-parent="autoExpandParent"
      :default-expanded-keys="defaultExpandedKeys"
      :show-checkbox="showCheckbox"
      :check-strictly="checkStrictly"
      :default-checked-keys="defaultCheckedKeys"
      :current-node-key="currentNodeKey"
      :filter-node-method="filterNodeMethod"
      :accordion="accordion"
      :indent="indent"
      :icon-class="'el-icon-' + icon"
      :lazy="lazy"
      :draggable="draggable"
      :allow-drag="allowDrag"
      :allow-drop="allowDrop"
      @node-click="handleNodeClick"
      @node-contextmenu.prevent.stop="handleNodeContextmenu"
    >
      <!== node 表示节点对象；data 就是传入的节点配置参数 ==>
      <template v-slot="{ node, data }">
        <slot :node="node" :data="data"></slot>
      </template>
    </el-tree> -->
  <el-tree
    :ref="innerRef"
    :data="data"
    :empty-text="emptyText"
    :node-key="nodeKey"
    :props="props"
    :render-after-expand="renderAfterExpand"
    :load="load"
    :render-content="renderContent"
    :highlight-current="highlightCurrent"
    :default-expand-all="defaultExpandAll"
    :expand-on-click-node="expandOnClickNode"
    :check-on-click-node="checkOnClickNode"
    :auto-expand-parent="autoExpandParent"
    :default-expanded-keys="defaultExpandedKeys"
    :show-checkbox="showCheckbox"
    :check-strictly="checkStrictly"
    :default-checked-keys="defaultCheckedKeys"
    :current-node-key="currentNodeKey"
    :filter-node-method="filterNodeMethod"
    :accordion="accordion"
    :indent="indent"
    :icon-class="'el-icon-' + icon"
    @node-click="handleNodeClick"
    @node-contextmenu.prevent.stop="handleNodeContextmenu"
  >
    <!-- node 表示节点对象；data 就是传入的节点配置参数 -->
    <template v-slot="{ node, data }">
      <slot :node="node" :data="data"></slot>
    </template>
  </el-tree>
</template>

<script>
import { dynTreeMixins } from './utils';
export default {
  name: 'dyn-tree',
  mixins: [dynTreeMixins],
  computed: {
    innerRef() {
      return 'el-tree' + this.enhanceRef;
    },
  },
  props: {
    //#region 属性
    enhanceRef: String, // 重新保定自定义ref属性
    data: Array,
    filterTxt: String,
    emptyText: {
      type: String,
      default: 'Empty Node',
    },
    icon: String, // 替换下拉箭头；只适用于度不为0的节点，这个限制条件同样适用于根节点
    indent: Number, // 子节点的缩进px
    // 配置节点key时必须提供，用于指定data中表示节点key的属性名
    nodeKey: String,
    props: Object, // 包含label, children, disabled, isLeaf
    renderAfterExpand: {
      type: Boolean,
      default: true,
    },
    // 指定子节点是否懒加载及对应的懒加载方法；若未显示设置子节点的 isLeaf:'leaf' 属性，则默认会渲染下拉箭头
    lazy: Boolean,
    load: Function,
    // 渲染额外内容；不喜欢这种方式，又将视图和脚本混到了一起
    renderContent: Function,
    highlightCurrent: Boolean,

    currentNodeKey: [String, Number],
    //#region 对树和节点的默认设置
    // 是否默认展开所有节点
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
    // 默认展开/选中的节点 key 数组
    defaultExpandedKeys: Array,
    defaultCheckedKeys: Array,
    // 是否在点击节点的时候展开或者收缩节点；默认值失效，重新配置
    // 注意使用自定义节点按钮时，需要设置为 false
    expandOnClickNode: {
      type: Boolean,
      default: false,
    },
    checkOnClickNode: {
      type: Boolean,
      default: false,
    }, // 点击节点同时选中
    autoExpandParent: {
      type: Boolean,
      default: true,
    },
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    checkStrictly: {
      type: Boolean,
      default: false,
    },
    accordion: {
      type: Boolean,
      default: false,
    }, // 手风琴模式；每次只允许展开一条路径
    // 可拖拽
    draggable: {
      type: Boolean,
      default: false,
    },
    allowDrag: Function,
    allowDrop: Function,
    //#endregion
    filterNodeMethod: Function,
    //#endregion

    //#region 事件回调
    handleNodeClick: {
      type: Function,
      default: () => {},
    },
    handleNodeContextmenu: {
      type: Function,
      default: () => {},
    },
    //#endregion
  },
  watch: {
    filterTxt(val) {
      this.$refs[this.innerRef].filter(val);
    },
  },
  methods: {
    //#region 辅助方法
    checkNodeKey(funcName) {
      let result = this?.nodeKey
        ? true
        : console.error(
            `Reference Error: prop "nodeKey" for component "DynTree" is required when using function ${funcName}`
          ) && false;

      return result;
    },
    //#endregion

    //#region 编辑树
    // 新增节点
    appendChild(newNode, parentNode) {
      if (this.checkNodeKey('appendChild')) {
        //#region
        // let nodeKey = this.nodeKey;
        // let data = node.data;
        // 生成新节点
        //#region 基于官网例子修改，过于复杂，直接使用内置的 append 方法添加
        // let newChildIndex; // 新节点的编号；默认格式 1.1，子节点增加则 id 为 1.1.1，同级节点增加则 id 为 1.2
        // if (!data.children) {
        //   // 当前节点为叶节点，需要先初始化子节点列表
        //   this.$set(data, 'children', []);
        //   newChildIndex = this.calNodeIndex(data);
        // } else {
        //   newChildIndex =
        //     this.calNodeIndex(data) + '.' + (data.children.length + 1);
        // }
        //#endregion
        // if (!newChildTemplate) {
        //   let newChildIndex = data.children
        //     ? this.calNodeIndex(data) + '.' + (data.children.length + 1)
        //     : this.calNodeIndex(data);
        //   newChildTemplate = {
        //     [nodeKey]: newChildIndex,
        //     label: '新节点',
        //     children: [],
        //   };
        // }
        // data.children.push(newChildTemplate);
        //#endregion
        this.$refs[this.innerRef].append(newNode, parentNode);
      }
    },
    insertBefore(data, refNode) {
      // refNode 被插入的位置之后的节点
      this.$refs[this.innerRef].insertBefore(data, refNode);
    },
    insertAfter(data, refNode) {
      // refNode 被插入的位置之前的节点
      this.$refs[this.innerRef].insertAfter(data, refNode);
    },
    // 更新节点数据
    updateNode(node, prop, value) {
      node.data[prop] = value;
    },
    // 删除当前节点
    removeNode(node) {
      if (this.checkNodeKey('removeNode')) {
        //#region 基于官网例子修改，过于复杂，直接使用内置的 remove 方法添加
        //   let nodeKey = this.nodeKey;
        // const parent = node.parent;
        // const children = parent.data.children || parent.data;
        // const index = children.findIndex(
        //   (child) => child[nodeKey] === data[nodeKey]
        // );
        // children.splice(index, 1);
        //#endregion
        this.$refs[this.innerRef].remove(node);
      }
    },
    //#endregion

    //#region 选中
    setCurrentNode(identifier) {
      if (identity instanceof Array) {
        this.$refs[this.innerRef].setCurrentNode(identifier);
      } else if (typeof identity === 'string') {
        this.currentNodeKey = identifier;
        this.$refs[this.innerRef].setCurrentKey(identifier);
      } else {
        console.log(
          'Type Error: identifier should be type of "Node object" or "string".'
        );
      }
    },
    //#endregion
  },
};
</script>
