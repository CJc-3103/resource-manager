const mixinInnerVal = {
  data() {
    return {
      innerVal: this.val,
    };
  },
  props: {
    // 字段值，在某些场景下，比如从服务端拉取数据后提交编辑时需要提供val作为初始值，此时的重置方法也会重置为默认值而非空值
    val: {
      type: String,
      default: '',
    },
  },
  methods: {},
};

export default mixinInnerVal;
