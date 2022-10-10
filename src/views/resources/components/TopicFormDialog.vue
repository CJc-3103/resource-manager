<template>
  <el-dialog
    class="topic-form-dialog"
    v-model="visible"
    :title="$t(`topicFormDialog.formTitle.${formStatus}`)"
    width="30%"
    :before-close="handleCloseDialog"
  >
    <el-form
      class="topic-form"
      ref="TopicFormRef"
      :model="formData"
      :rules="rules"
      label-width="120px"
      label-position="top"
      formStatus-icon
    >
      <el-form-item prop="topicName">
        <span class="label"
          >{{ $t('topicFormDialog.fields.topicName.title') }}
          <el-popover
            placement="top-start"
            :width="200"
            trigger="hover"
            :content="$t('topicFormDialog.fields.topicName.detail')"
          >
            <template #reference>
              <el-icon class="label-icon"><InfoFilled /></el-icon>
            </template>
          </el-popover>
        </span>
        <el-input :disabled="readonly" v-model="formData.topicName" />
      </el-form-item>

      <el-form-item prop="pathType">
        <span class="label"
          >{{ $t('topicFormDialog.fields.pathType.title') }}
          <el-popover
            placement="top-start"
            :width="200"
            trigger="hover"
            :content="$t('topicFormDialog.fields.pathType.detail')"
          >
            <template #reference>
              <el-icon class="label-icon"><InfoFilled /></el-icon>
            </template>
          </el-popover>
        </span>

        <el-radio-group
          :disabled="readonly"
          v-model="formData.pathType"
          @change="handleTypeChange"
        >
          <el-radio-button label="network" size="small">
            {{ $t('topicFormDialog.fields.pathType.type.network') }}
          </el-radio-button>
          <el-radio-button label="local" size="small">
            {{ $t('topicFormDialog.fields.pathType.type.local') }}
          </el-radio-button>
          <el-radio-button label="all" size="small">
            {{ $t('topicFormDialog.fields.pathType.type.all') }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="topic-form-dialog_footer-wrap">
        <span
          v-if="formStatus === 'add'"
          class="topic-form-dialog_footer btn-group"
        >
          <el-button @click="closeDialog">{{ $t('form.cancel') }}</el-button>
          <el-button type="primary" @click="handleFormSubmit(TopicFormRef)">{{
            $t('form.submit')
          }}</el-button>
        </span>
        <span
          v-else-if="formStatus === 'view'"
          class="topic-form-dialog_footer btn-group"
        >
          <el-button @click="closeDialog">{{ $t('form.confirm') }}</el-button>
        </span>
        <span
          v-else-if="formStatus === 'edit'"
          class="topic-form-dialog_footer btn-group"
        >
          <el-button @click="closeDialog">{{ $t('form.cancel') }}</el-button>
          <el-button type="success" @click="handleFormSubmit(TopicFormRef)">{{
            $t('form.submit')
          }}</el-button>
        </span>
        <span
          v-else-if="formStatus === 'delete'"
          class="topic-form-dialog_footer btn-group"
        >
          <el-button @click="closeDialog">{{ $t('form.cancel') }}</el-button>
          <el-button type="danger" @click="handleFormSubmit(TopicFormRef)">{{
            $t('form.confirm')
          }}</el-button>
        </span>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
//#region 依赖--
import { InfoFilled } from '@element-plus/icons-vue';
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();

const props = defineProps({
  dialogVisible: Boolean,
  readonly: Boolean,
  formStatus: {
    type: String,
    default: 'view',
    validator: (value) => {
      return ['view', 'edit', 'add', 'delete'].includes(value);
    },
  },
  topicName: String,
});
const emit = defineEmits(['update:dialogVisible']);
//#endregion --

//#region 视图构建--
const defaultFormData = {
  topicName: '',
  pathType: 'all',
};
const formData = ref(
  props.topicName
    ? {
        topicName: props.topicName,
        pathType: 'all',
      }
    : defaultFormData
);
const rules = ref({
  topicName: [
    {
      required: true,
      message: $t('topicFormDialog.fields.topicName.message.require'),
      trigger: 'blur',
    },
    {
      min: 1,
      max: 20,
      message: $t('topicFormDialog.fields.topicName.message.length'),
      trigger: 'blur',
    },
  ],
  pathType: [{ required: true, message: '', trigger: 'blur' }],
});
//#endregion --

//#region 交互--

// 选择地址类型
const handleTypeChange = (value) => {
  console.log('value', value);
  console.log('Path Type Changed');
};

// 提交
const TopicFormRef = ref(null);
const handleFormSubmit = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid, fields) => {
    console.log('valid', valid);
    if (valid) {
      console.log('submit!');
      closeDialog();
    } else {
      console.log('error submit!', fields);
    }
  });
};

// 控制对话框
const visible = computed({
  get() {
    return props.dialogVisible;
  },
  set(value) {
    emit('update:dialogVisible', value);
  },
});
const closeDialog = () => {
  visible.value = false;
};

const handleCloseDialog = (done) => {
  done();
};

//#endregion --

//#region 生命周期--
onMounted(() => {
  console.log('props', props);
});
//#endregion --
</script>
