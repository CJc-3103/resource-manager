<template>
  <!-- 参数数组长度大于1 -->
  <div class="dyn-field-group" v-if="fieldList.length > 1">
    <dyn-field
      v-for="(field, key) in fieldList"
      :key="key"
      :fKey="field.fKey"
      :label="field.label"
      :fieldOpts="field.fieldOpts"
      :children="field.children"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <!-- 将父组件的插槽内容传入子组件的插槽 -->
      <template v-slot="field">
        <!-- 定义父组件的插槽，接收外部传入的内容 -->
        <slot
          :fKey="field.fKey"
          :fieldOpts="field.fieldOpts"
          :children="field.children"
          v-bind="$attrs"
          v-on="$listeners"
        >
        </slot> </template
    ></dyn-field>
  </div>

  <!-- 只有一个字段时不渲染外层的组元素 -->
  <!-- 参数数组长度为1 -->
  <dyn-field
    v-else
    :fKey="fieldList[0].fKey"
    :label="fieldList[0].label"
    :fieldOpts="fieldList[0].fieldOpts"
    :children="fieldList[0].children"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <!-- 将父组件的插槽内容传入子组件的插槽 -->
    <template v-slot="field">
      <!-- 定义父组件的插槽，接收外部传入的内容 -->
      <slot
        :fKey="field.fKey"
        :fieldOpts="field.fieldOpts"
        :children="field.children"
        v-bind="$attrs"
        v-on="$listeners"
      >
      </slot> </template
  ></dyn-field>
</template>

<script>
import dynField from './dyn-field.vue';
export default {
  name: 'dyn-field-group',
  inheritAttrs: false,
  computed: {
    fieldList() {
      let fields = this.fields;
      // 将对象转为数组
      return !fields.length ? [].concat([fields]) : fields;
    },
  },
  props: {
    // 字段数组，只有一个字段时可以不用嵌套数组
    fields: [Array, Object],
    // initialDatas: {
    //   type: Object,
    // },
    // rules: {
    //   type: Object,
    // },
  },
  components: {
    dynField,
  },
};
</script>
