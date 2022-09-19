<template>
  <el-form
    :ref="formRef"
    :model="localDatas"
    :rules="rules"
    :label-width="labelWidth"
    :inline="inline"
    :label-position="labelPosition"
    :label-suffix="labelSuffix"
    :hide-required-asterisk="hideRequiredAsterisk"
    :show-message="showMessage"
    :inline-message="inlineMessage"
    :status-icon="statusIcon"
    :validate-on-rule-change="validateOnRuleChange"
    :size="size"
    :disabled="disabled"
  >
    <slot :initialDatas="localDatas"></slot>
  </el-form>
</template>

<style lang="scss"></style>

<script>
export default {
  name: 'dyn-form',
  data() {
    return {
      // 由于prop不允许修改，保存一份本地数据副本
      localDatas: {},
    };
  },
  props: {
    // 组件原生属性
    datas: Object,
    rules: Object,
    inline: Boolean,
    labelWidth: String,
    labelPosition: String,
    labelSuffix: String,
    hideRequiredAsterisk: Boolean,
    // 这个属性没传时，默认值不能生效，原因未知，因此这里再次提供默认值
    showMessage: {
      type: Boolean,
      default: true,
    },
    inlineMessage: Boolean,
    statusIcon: Boolean,
    validateOnRuleChange: Boolean,
    size: String,
    disabled: Boolean,

    // 自定义属性
    formRef: String, // 表单引用名
  },
  created() {
    // 保存初始值
    this.initLocalDatas();
    this.addEvtListeners();
  },
  beforeDestroy() {
    this.removeEvtListeners();
  },
  methods: {
    initLocalDatas() {
      // prop形参不允许本地修改，保存本地数据副本
      if (this.datas) {
        this.localDatas = Object.assign({}, this.datas);
      }
    },
    // 添加全部监听事件
    addEvtListeners() {
      // 监听字段输入改变，同步更新
      this.$bus.on('field-change', (val, fKey) => {
        this.localDatas[fKey] = val;
      });
      // 监听外部触发的表单验证事件
      this.$bus.on('submit-form', (resolve, reject) => {
        this.submitForm(resolve, reject);
      });
      // 监听外部触发的表单重置事件
      this.$bus.on('reset-form', (cbAfterReset, cbBeforerReset) => {
        this.resetForm(cbAfterReset, cbBeforerReset);
      });
    },
    // 移除全部监听事件
    removeEvtListeners() {
      this.$bus.off('field-change');
      this.$bus.off('submit-form');
      this.$bus.off('reset-form');
    },
    // 验证表单项
    submitForm(resolve, reject) {
      this.$refs[this.formRef].validate((valid) => {
        if (valid) {
          if (resolve) {
            resolve(this.localDatas);
          } else {
            console.warn('Missing resolve function.');
          }
        } else {
          if (reject) {
            reject(this.localDatas);
          } else {
            console.warn('Missing reject function.');
          }
        }
      });
    },
    // 重置表单
    resetForm(cbAfterReset, cbBeforerReset) {
      // 在表单被重置前执行的回调
      if (cbAfterReset) {
        cbAfterReset();
      } else {
        console.info(
          'Missing callback function which would be triggered before form reset.'
        );
      }

      // 重置表单值
      this.initLocalDatas();
      // element ui 原生重置方法无效，需要重写
      //   this.$refs['ruleForm'].resetFields();
      // 通过Bus，通知所有字段重置其值
      this.$bus.emit('reset-fields');
      this.$refs[this.formRef].clearValidate();

      // 在表单被重置后执行的回调
      if (cbBeforerReset) {
        cbBeforerReset();
      } else {
        console.info(
          'Missing callback function which would be triggered after form reset.'
        );
      }
    },
  },
};
</script>
