<template>
  <!-- <el-input v-model="innerVal" @input="handleInput(prop, innerVal)"></el-input> -->

  <!-- 文本输入组件 -->
  <el-input
    v-if="type === 'text'"
    v-model="val"
    :disabled="disabled"
  ></el-input>

  <!-- 时间选择器 -->
  <el-time-picker
    v-else-if="type === 'time'"
    v-model="val"
    :type="type"
    :disabled="disabled"
  ></el-time-picker>
  <!-- 日期/日期时间选择器 -->
  <el-date-picker
    v-else-if="type === 'date' || type === 'datetime'"
    v-model="val"
    :type="type"
    :disabled="disabled"
  ></el-date-picker>

  <!-- 下拉框 -->
  <el-select
    v-else-if="type === 'select'"
    v-model="val"
    :clearable="clearable"
    :filterable="filterable"
    :multiple="multiple"
    :allow-create="allowCreate"
    :disabled="disabled"
  >
    <div class="el-option-groups" v-if="options.options !== undefined">
      <!-- 存在选项分组 -->
      <el-option-group
        v-for="group in options"
        :key="group.label"
        :label="group.label"
      >
        <el-option
          v-for="option in group.options"
          :key="option.val"
          :value="option.val"
          :label="option.label"
        ></el-option>
      </el-option-group>
    </div>
    <!-- 没有选项分组 -->
    <div class="el-options" v-else>
      <el-option
        v-for="option in options"
        :key="option.val"
        :value="option.val"
        :label="option.label"
      ></el-option>
    </div>
  </el-select>

  <!-- 单选框 -->
  <el-radio-group
    v-else-if="type === 'radio'"
    v-model="val"
    :disabled="disabled"
    :size="size"
    :text-color="textColor"
    :fill="fill"
  >
    <template v-if="isBtnStyle">
      <el-radio-button
        v-for="(option, key) in options"
        :key="key"
        :label="option.val"
        :border="option.hasBorder"
        :disabled="option.disabled"
        >{{ option.label }}</el-radio-button
      ></template
    >
    <template v-else>
      <el-radio
        v-for="(option, key) in options"
        :key="key"
        :label="option.val"
        :border="option.hasBorder"
        :disabled="option.disabled"
        >{{ option.label }}</el-radio
      ></template
    >
  </el-radio-group>

  <!-- 复选框 -->
  <el-checkbox-group
    v-else-if="type === 'checkbox'"
    v-model="val"
    :min="minCheck"
    :max="maxCheck"
  >
    <template v-if="isBtnStyle">
      <el-checkbox-button
        v-for="(option, key) in options"
        :key="key"
        :label="option.val"
        :border="option.hasBorder"
        :disabled="option.disabled"
        >{{ option.label }}</el-checkbox-button
      ></template
    >
    <template v-else>
      <el-checkbox
        v-for="(option, key) in options"
        :key="key"
        :label="option.val"
        :border="option.hasBorder"
        :disabled="option.disabled"
        >{{ option.label }}</el-checkbox
      ></template
    >
  </el-checkbox-group>

  <!-- 计数器 -->
  <el-input-number
    v-else-if="type === 'number'"
    v-model="val"
    :min="minNum"
    :max="maxNum"
    :step="step"
    :step-strictly="stepStrictly"
    :disabled="disabled"
    :precision="precision"
    :size="size"
    :controls="controls"
    :controls-position="controlsPosition"
    label="描述文字"
  ></el-input-number>

  <!-- 级联选择器 -->
  <el-cascader
    v-else-if="type === 'cascader'"
    v-model="val"
    :disabled="disabled"
    :options="options"
    :clearable="clearable"
    :show-all-levels="showAllLevels"
    :props="{ multiple: multiple, checkStrictly: checkStrictly }"
    :collapse-tags="collapseTags"
  ></el-cascader>

  <!-- 开关 -->
  <el-switch
    v-else-if="type === 'switch'"
    v-model="val"
    :disabled="disabled"
    :active-text="activeTxt"
    :inactive-text="inactiveTxt"
    :active-value="activeVal"
    :inactive-value="inactiveVal"
    :active-icon-class="activeIconClass"
    :inactive-icon-class="inactiveIconClass"
    :active-color="activeColor"
    :inactive-color="inactiveColor"
    :width="width"
  >
  </el-switch>

  <!-- 滑块 -->
  <el-slider
    v-else-if="type === 'slider'"
    v-model="val"
    :disabled="disabled"
    :show-tooltip="showTooltip"
    :format-tooltip="formatTooltip"
    :min="minNum"
    :max="maxNum"
    :step="step"
    :show-stops="showStops"
    :show-input="showInput"
    :show-input-controls="showInputControls"
    :debounce="inputDebounce"
    :input-size="inputSize"
    :range="allowRange"
    :vertical="vertical"
    :height="height"
    :marks="marks"
  ></el-slider>

  <!-- 使用了非法组件类型声明时，显示默认文本 -->
  <label v-else>一段文字</label>
</template>

<style lang="scss" scoped>
.el-form {
  .el-form-item {
    // 浮动，宽度50%
    // width: 50%;
    // float: left;

    // 使以下组件充满父组件剩余宽度，在视觉上保持与普通输入框相同
    .el-select,
    .el-date-editor {
      width: 100%;
    }
  }
}
</style>

<script>
export default {
  name: 'dyn-input',
  data() {
    return {
      // 字段值初始值，在某些场景下，比如从服务端拉取数据后选择编辑时，需要提供val作为初始值，此时的重置方法也会重置为默认值而非空值
      initialVal: '',
      // 字段值，用于绑定用户输入，并同步给表单组件
      val: '',
    };
  },
  created() {
    // 第一次加载组件时，需要先获取初始值并初始化字段
    this.getInitialVal();
    this.resetField();

    this.addEvtListeners();
  },
  beforeDestroy() {
    // 销毁前解除事件绑定
    this.removeEvtListeners();
  },
  watch: {
    // 统一检测字段值的变化并处理
    val(val) {
      this.updateField(val, this.fKey);
    },
    initialVal() {
      if (this.val !== this.initialVal) {
        this.val = this.initialVal;
      }
    },
  },
  inheritAttrs: false,
  methods: {
    //#region 事件
    // 添加监听事件
    addEvtListeners() {
      this.$bus.on('reset-fields', () => {
        this.resetField();
      });
    },
    // 移除监听事件
    removeEvtListeners() {
      this.$bus.off('reset-fields');
    },
    //#endregion

    //#region 初始化
    // 获取字段初始值
    getInitialVal() {
      let initialVal = this.$attrs.initialDatas[this.fKey];
      if (initialVal) {
        this.initialVal = initialVal;
      }
    },
    // 初始化字段
    resetField() {
      // 通过$attr继承外部传入的自定义属性，并根据键名取值
      let initialVal = this.initialVal;
      //   console.log(initialVal);
      // 无初始值时需要以下操作
      if ([{}, [], ''].indexOf(initialVal) > -1) {
        switch (this.type) {
          // 单选框或开关无初始值时，默认自动选中第一项
          case 'radio':
            this.val = this.options[0].val;
            break;
          case 'checkbox':
            // 单选框无初始值时，重置val为空数组
            // this.val = [];
            break;
          case 'switch':
            // 默认选中非激活项
            this.val = this.inactiveVal;
            break;
          case 'number':
            this.val = 0;
            break;
          default:
            // 其他情况，重置为空值
            // this.val = '';
            break;
        }
      } else {
        // 有初始值时还原为初始值
        this.val = initialVal;
      }
    },
    //#endregion

    // 用户输入后，触发Bus事件，同步更新表单值
    updateField(val, fKey) {
      let sending;
      sending =
        this.type === 'switch'
          ? val
            ? this.activeVal
            : this.inactiveVal
          : val;
      this.$bus.emit('field-change', sending, fKey);
    },
  },
  props: {
    //#region 通用参数 --
    //#region 必需参数 ----

    //#region
    // 字段初始值，通过prop传入
    // initialVal: {
    //   // 初始值不能是非法值，但可以为空
    //   validator: function (value) {
    //     // return [undefined, null].indexOf(value) > -1;
    //     return true;
    //   },
    // },
    //#endregion

    // 字段组件类型
    type: {
      type: String,
      default: 'text',
    },
    //#endregion ----

    //#region 可选的参数 ----
    // 字段名
    fKey: {
      type: String,
    },
    // 指示字段是否禁用
    disabled: Boolean,
    // Radio 的尺寸，仅在 border 为真时有效
    size: String,
    //#endregion ----

    //#endregion --

    //#region 部分组件同名参数--
    // 计数器和滑块最小值
    minNum: {
      type: Number,
      defaultVal: 0,
    },
    // 计数器和滑块最大值
    maxNum: {
      type: Number,
      defaultVal: 0,
    },
    // 计数器或滑块的步长
    step: {
      type: Number,
      defaultVal: 1,
    },
    //#endregion --

    //#region 各输入控件特有参数 --
    options: Array, // 下拉框、单选框组、复选框组的选项
    //#region 下拉框配置参数 ----
    // 是否可清空
    clearable: {
      type: Boolean,
      default: true, // 默认可清空
    },
    // 是否可搜索
    filterable: {
      type: Boolean,
      default: true, // 默认可搜索
    },
    // 是否可多选
    multiple: {
      type: Boolean,
      default: false, // 默认不可多选
    },
    // 是否允许用户创建选项
    allowCreate: {
      type: Boolean,
      default: false, // 默认不允许用户创建选项
    },
    //#endregion ----

    //#region 单选框组配置参数 ------
    textColor: String,
    fill: String,
    isBtnStyle: {
      type: Boolean,
      default: false,
    },
    // 是否显示边框
    hasBorder: {
      type: Boolean,
      default: false,
    },
    //#endregion ------

    //#region 复选框组配置参数----
    // 最少选中数量
    minCheck: {
      type: Number,
      defaultVal: 0,
    },
    // 最多选中数量
    maxCheck: {
      type: Number,
      defaultVal: 0,
    },
    //#endregion ----

    //#region 计数器配置参数----
    // 指示是否只能输入步长的倍数
    stepStrictly: {
      type: Boolean,
    },
    // 指示精确到小数点后几位
    precision: {
      type: Number,
      defaultVal: 0,
    },
    // 指示是否适用控制按钮
    controls: {
      type: Boolean,
    },
    // 指定控制按钮的位置
    controlsPosition: {
      type: String,
    },
    //#endregion ----

    //#region 级联选择器配置参数----
    // 指示是否显示全部或是只显示最后一级
    showAllLevels: {
      type: Boolean,
    },
    // 允许多选时，指示是否默认折叠
    collapseTags: {
      type: Boolean,
    },
    // 指示是否允许单独选择任意一级的节点
    checkStrictly: {
      type: Boolean,
    },
    //#endregion ----

    //#region 开关配置参数----
    width: Number,
    activeTxt: String,
    inactiveTxt: String,
    activeVal: [Boolean, Number, String],
    inactiveVal: [Boolean, Number, String],
    activeIconClass: String,
    inactiveIconClass: String,
    activeColor: String,
    inactiveColor: String,
    //#endregion ----

    //#region 滑块配置参数----
    showStops: Boolean,
    showInput: Boolean,
    showInputControls: Boolean,
    // 输入时的去抖延迟，毫秒，仅在show-input等于true时有效
    inputDebounce: Number,
    // 输入框尺寸 large / medium / small / mini
    inputSize: String,
    // 允许选择范围，返回上下限两个数表示的数组
    allowRange: Boolean,
    vertical: Boolean,
    // Slider 高度，竖向模式时必填
    height: Number,
    // 滑块下面的标记，一个例子
    // marks: {
    //   0: '0°C',
    //   8: '8°C',
    //   37: '37°C',
    //   50: {
    //     style: {
    //       color: '#1989FA',
    //     },
    //     label: this.$createElement('strong', '50%'),
    //   },
    // },
    marks: Object,
    //#endregion ----

    //#region 配置参数----

    //#endregion ----

    //#endregion --
  },
};
</script>
