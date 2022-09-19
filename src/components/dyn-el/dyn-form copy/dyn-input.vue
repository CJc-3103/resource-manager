<template>
  <dyn-input-wrapper
    :initialVal="initialVal"
    :fKey="fKey"
    :type="fieldOpts.type"
    :options="fieldOpts.options"
    :clearable="fieldOpts.clearable"
    :filterable="fieldOpts.filterable"
    :multiple="fieldOpts.multiple"
    :allowCreate="fieldOpts.allowCreate"
    :disabled="fieldOpts.disabled"
    :fill="fieldOpts.fill"
    :hasBorder="fieldOpts.hasBorder"
    :isBtnStyle="fieldOpts.isBtnStyle"
    :size="fieldOpts.size"
    :textColor="fieldOpts.textColor"
    :minCheck="fieldOpts.minCheck"
    :maxCheck="fieldOpts.maxCheck"
    :minNum="fieldOpts.minNum"
    :maxNum="fieldOpts.maxNum"
    :step="fieldOpts.step"
    :precision="fieldOpts.precision"
    :stepStrictly="fieldOpts.stepStrictly"
    :controls="fieldOpts.controls"
    :controlsPosition="fieldOpts.controlsPosition"
    :checkStrictly="fieldOpts.checkStrictly"
    :collapseTags="fieldOpts.collapseTags"
    :showAllLevels="fieldOpts.showAllLevels"
    :activeIconClass="fieldOpts.activeIconClass"
    :inactiveIconClass="fieldOpts.inactiveIconClass"
    :activeTxt="fieldOpts.activeTxt"
    :inactiveTxt="fieldOpts.inactiveTxt"
    :activeVal="fieldOpts.activeVal"
    :inactiveVal="fieldOpts.inactiveVal"
    :activeColor="fieldOpts.activeColor"
    :inactiveColor="fieldOpts.inactiveColor"
    :width="fieldOpts.width"
    :allowRange="fieldOpts.allowRange"
    :height="fieldOpts.height"
    :inputDebounce="fieldOpts.inputDebounce"
    :inputSize="fieldOpts.inputSize"
    :marks="fieldOpts.marks"
    :showInput="fieldOpts.showInput"
    :showInputControls="fieldOpts.showInputControls"
    :showStops="fieldOpts.showStops"
    :vertical="fieldOpts.vertical"
    v-bind="$attrs"
    v-on="$listeners"
  ></dyn-input-wrapper>
</template>

<script>
import dynInputWrapper from './dyn-input_wrapper.vue';

export default {
  name: 'dyn-input',
  inheritAttrs: false,
  components: {
    dynInputWrapper,
  },
  //#region
  //   computed: {
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
  //   },
  //#endregion
  props: {
    // 字段初始值
    initialVal: {
      default: '',
    },
    fKey: String,
    // 以下是输入组件的配置参数
    fieldOpts: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>
