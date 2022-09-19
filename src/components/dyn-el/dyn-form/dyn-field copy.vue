<template>
  <el-form-item :label="label" :prop="fKey">
    <dyn-input
      :fKey="fKey"
      :type="opts.type"
      :options="opts.options"
      :clearable="opts.clearable"
      :filterable="opts.filterable"
      :multiple="opts.multiple"
      :allowCreate="opts.allowCreate"
      :disabled="opts.disabled"
      :fill="opts.fill"
      :hasBorder="opts.hasBorder"
      :isBtnStyle="opts.isBtnStyle"
      :size="opts.size"
      :textColor="opts.textColor"
      :minCheck="opts.minCheck"
      :maxCheck="opts.maxCheck"
      :minNum="opts.minNum"
      :maxNum="opts.maxNum"
      :step="opts.step"
      :precision="opts.precision"
      :stepStrictly="opts.stepStrictly"
      :controls="opts.controls"
      :controlsPosition="opts.controlsPosition"
      :checkStrictly="opts.checkStrictly"
      :collapseTags="opts.collapseTags"
      :showAllLevels="opts.showAllLevels"
      :activeIconClass="opts.activeIconClass"
      :inactiveIconClass="opts.inactiveIconClass"
      :activeTxt="opts.activeTxt"
      :inactiveTxt="opts.inactiveTxt"
      :activeVal="opts.activeVal"
      :inactiveVal="opts.inactiveVal"
      :activeColor="opts.activeColor"
      :inactiveColor="opts.inactiveColor"
      :width="opts.width"
      :allowRange="opts.allowRange"
      :height="opts.height"
      :inputDebounce="opts.inputDebounce"
      :inputSize="opts.inputSize"
      :marks="opts.marks"
      :showInput="opts.showInput"
      :showInputControls="opts.showInputControls"
      :showStops="opts.showStops"
      :vertical="opts.vertical"
      v-bind="$attrs"
      v-on="$listeners"
    ></dyn-input>
    <!-- :initialVal="initialVal" -->
    <!-- <slot
      :fKey="fKey"
      :children="children"
      v-bind="$attrs"
      v-on="$listeners"
    ></slot> -->
  </el-form-item>
</template>

<script>
import dynInput from './dyn-input.vue';

export default {
  name: 'dyn-field',
  inheritAttrs: false,
  components: {
    dynInput,
  },
  mounted() {
    // console.log(this.fKey);
    //     console.log(this.val);
    // console.log(this.rules);
  },
  props: {
    // 字段初始值
    // initialDatas: {
    //   type: Object,
    // },
    // 字段名称
    fKey: {
      type: String,
      default: '',
    },
    // 字段标签
    label: {
      type: String,
      default: '',
    },
    // 以下是输入组件的配置参数
    opts: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    // // element 字段组件获取form的方法拷贝到这里
    // form() {
    //   let parent = this.$parent;
    //   let parentName = parent.$options.componentName;
    //   while (parentName !== 'ElForm') {
    //     if (parentName === 'ElFormItem') {
    //       this.isNested = true;
    //     }
    //     parent = parent.$parent;
    //     parentName = parent.$options.componentName;
    //   }
    //   return parent;
    // },
    // // 若提供了初始值，则获取到这里
    // initialVal() {
    //   return this.form.model[this.fKey];
    // },
  },
};
</script>
