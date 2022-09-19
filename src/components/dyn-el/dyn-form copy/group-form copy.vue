<template>
  <el-form :model="datas" :rules="rules" ref="ruleForm" label-width="100px">
    <slot name="card"></slot>
    <slot name="field"></slot>
    <!-- <cardGroup :fieldGroupList="fieldGroupList">
      <template v-slot:field-group="fieldGroup">
        <formItemGroup
          :fieldList="fieldGroup.fieldList"
          @field-input="updateFormData"
        ></formItemGroup>
      </template>
    </cardGroup> -->

    <slot name="btn-group"></slot>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss">
.el-form {
  .el-card-group {
    // .el-card:nth-child(n + 2) {
    //   // 设置除第一个卡片外其他卡片的上间距
    //   margin-top: 30px;
    // }
    .el-card {
      .el-form-item {
        width: 50%;
        float: left;
        .el-select,
        .el-date-editor {
          width: 100%; // 使下拉框充满父元素剩余宽度，在视觉上保持与普通输入框相同
        }
      }
    }
  }
}
</style>

<script>
export default {
  name: 'dyn-form',
  data() {
    return {
      datas: {},
      rules: {},
      //#region
      //   fieldGroupList: [
      //     {
      //       fieldTitle: "卡片1",
      //       fieldList: [
      //         {
      //           key: "info1",
      //           label: "信息1",
      //           val: "val1",
      //           rule: [{ required: true, message: `请输入`, trigger: "blur" }],
      //         },
      //         {
      //           key: "info2",
      //           label: "信息2",
      //           val: "val2",
      //           rule: [{ required: true, message: `请输入`, trigger: "blur" }],
      //         },
      //       ],
      //     },
      //     {
      //       fieldTitle: "卡片2",
      //       fieldList: [
      //         {
      //           key: "info3",
      //           label: "信息3",
      //           val: "val3",
      //           rule: [{ required: true, message: `请输入`, trigger: "blur" }],
      //         },
      //         {
      //           key: "info4",
      //           label: "信息4",
      //           val: "val4",
      //           rule: [{ required: true, message: `请输入`, trigger: "blur" }],
      //         },
      //       ],
      //     },
      //   ],
      //#endregion
    };
  },
  props: {
    fieldGroupList: Array,
  },
  components: {
    // cardGroup,
    // formItemGroup,
  },
  created() {
    this.setRuleForm(this.fieldGroupList);
  },
  methods: {
    // 设置表格字段值和规则
    setRuleForm(fieldGroupList) {
      let datas = {},
        rules = {};
      if (fieldGroupList) {
        fieldGroupList.map((fieldGroup) => {
          fieldGroup.fieldList.map((field) => {
            let dataKey = field.key;
            datas[dataKey] = field.val;
            rules[dataKey] = field.rule;
          });
        });
        this.setFormDatas(datas);
        this.setFormRules(rules);
      } else {
        throw new Error('解析表单字段失败，无法显示表单');
      }
    },
    bindItemInput() {
      let datas = this.getFormDatas();
      for (const key in datas) {
        this.$refs[key].field - input;
      }
    },
    // 更新输入字段改变后的值到表单数据model
    updateFormData(key, val) {
      console.log(key);
      console.log(val);
      this.setFormData(key, val);
    },
    // 设置单个表单数据
    setFormData(key, val) {
      this.datas[key] = val;
    },
    // 设置整个表单数据
    setFormDatas(datas) {
      this.datas = datas;
    },
    // 设置整个表单规则
    setFormRules(rules) {
      this.rules = rules;
    },
    // 访问表单数据
    getFormDatas(datas) {
      return this.datas;
    },
    // 验证表单项
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //   console.log(this.datas);
          //   console.log(this.rules);
          console.log('验证通过');
          // this.$router.push('/loan-management');
        } else {
          console.log(
            '存在不符合要求的信息，请根据提示修改问题信息，然后重新提交!'
          );
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // formName.fieldGroupList.map((fieldGroup) => {
      //   fieldGroup.fieldList.map((field) => (field.val = ''));
      // });
    },
  },
};
</script>
