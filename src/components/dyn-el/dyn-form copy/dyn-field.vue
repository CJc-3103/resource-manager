<template>
  <el-form-item :label="label" :prop="fKey">
    <!-- <dyn-input
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
    ></dyn-input> -->
    <!-- :initialVal="initialVal" -->
    <slot
      :fKey="fKey"
      :fieldOpts="fieldOpts"
      :children="children"
      v-bind="$attrs"
      v-on="$listeners"
    ></slot>
  </el-form-item>
</template>

<script>
export default {
  name: 'dyn-field',
  inheritAttrs: false,
  mounted() {
    // console.log(this.fKey);
    // console.log(this.val);
    // console.log(this.rules);
    // console.log(this.fieldOpts);
  },
  props: {
    // ???????????????
    // initialDatas: {
    //   type: Object,
    // },
    // ????????????
    fKey: {
      type: String,
      default: '',
    },
    // ????????????
    label: {
      type: String,
      default: '',
    },
    // ????????????????????????????????????
    fieldOpts: {
      type: Object,
      //   default: () => {
      //     return {};
      //   },
      default: () => ({}),
    },
    // ?????????
    children: {
      type: [Object, Array],
      default: () => ({}),
    },
  },
  computed: {
    // // element ??????????????????form????????????????????????
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
    // // ??????????????????????????????????????????
    // initialVal() {
    //   return this.form.model[this.fKey];
    // },
  },
};
</script>
