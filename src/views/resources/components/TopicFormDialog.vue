<template>
  <el-dialog
    class="topic-form-dialog"
    v-model="visible"
    :title="$t(`topicFormDialog.formTitle.${formType}`)"
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
      formType-icon
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

        <el-radio-group :disabled="readonly" v-model="formData.pathType">
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
          v-if="formType === 'add'"
          class="topic-form-dialog_footer btn-group"
        >
          <el-button @click="closeDialog">{{
            $t('form.action.cancel')
          }}</el-button>
          <el-button type="primary" @click="handleAddTopic(TopicFormRef)">{{
            $t('form.action.submit')
          }}</el-button>
        </span>
        <span
          v-else-if="formType === 'view'"
          class="topic-form-dialog_footer btn-group"
        >
          <el-button @click="closeDialog">{{
            $t('form.action.confirm')
          }}</el-button>
        </span>
        <span
          v-else-if="formType === 'edit'"
          class="topic-form-dialog_footer btn-group"
        >
          <el-button @click="closeDialog">{{
            $t('form.action.cancel')
          }}</el-button>
          <el-button type="success" @click="handleUpdateTopic(formData)">{{
            $t('form.action.submit')
          }}</el-button>
        </span>
        <span
          v-else-if="formType === 'delete'"
          class="topic-form-dialog_footer btn-group"
        >
          <el-button @click="closeDialog">{{
            $t('form.action.cancel')
          }}</el-button>
          <el-button type="danger" @click="handleDeleteTopic(topicData.id)">{{
            $t('form.action.confirm')
          }}</el-button>
        </span>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
//#region 依赖--

// component
import { InfoFilled } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

// logic
import { ref, computed, onMounted, toRaw } from 'vue';
import { useI18n } from 'vue-i18n';
import { formUtils } from '@/utils/element-plus-utils';
import { addTopic, updateTopic, deleteTopic } from '@/api';

const { t: $t } = useI18n();

const props = defineProps({
  dialogVisible: Boolean,
  formType: {
    type: String,
    default: 'view',
    validator: (value) => {
      return ['view', 'edit', 'add', 'delete'].includes(value);
    },
  },
  topicData: Object,
  formStatus: {
    type: String,
    default: 'pending',
    validator: (value) => {
      return ['pending', 'success', 'fail'].includes(value);
    },
  },
});
const emit = defineEmits(['update:dialogVisible', 'update:formStatus']);
const setFormStatusSuccess = () => {
  emit('update:formStatus', 'success');
};
const setFormStatusFail = () => {
  emit('update:formStatus', 'fail');
};
//#endregion --

//#region 视图构建--
const defaultFormData = {
  topicName: '',
  pathType: 'all',
};
const formData = ref(defaultFormData);
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
const readonly = ['view', 'delete'].includes(props.formType); // 查看与删除时，不允许编辑内容

const TopicFormRef = ref(null);

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

//#region 数据模型--
const topic = null;
const initFormData = () => {
  if (['view', 'edit', 'delete'].includes(props.formType)) {
    formData.value = props.topicData;
  }
};
//#endregion --

//#region 交互--
const ERROR_TYPE = {
  ConstraintError: 'constraint',
};

//#region 提交新增----
const handleAddTopic = (formEl) => {
  formUtils.validForm(formEl).then(() => {
    addTopic(toRaw(formData.value))
      .then(() => {
        ElMessage({
          message: $t(`topicFormDialog.message.action.add.success`),
          type: 'success',
        });
        setFormStatusSuccess();
        closeDialog();
      })
      .catch((err) => {
        ElMessage({
          message:
            $t(`topicFormDialog.message.action.add.fail`) +
            $t(`topicFormDialog.message.exception.${ERROR_TYPE[err.name]}`),
          type: 'error',
        });
        setFormStatusFail();
      });
  });
};
//#endregion ----

//#region 提交修改----
const handleUpdateTopic = (formData) => {
  updateTopic(toRaw(formData))
    .then(() => {
      ElMessage({
        message: $t(`topicFormDialog.message.action.edit.success`),
        type: 'success',
      });
      setFormStatusSuccess();
      closeDialog();
    })
    .catch((err) => {
      ElMessage({
        message:
          $t(`topicFormDialog.message.action.edit.fail`) +
          $t(`topicFormDialog.message.exception.${ERROR_TYPE[err.name]}`),
        type: 'error',
      });
      setFormStatusFail();
    });
};
//#endregion ----

//#region 提交删除----
const handleDeleteTopic = (id) => {
  try {
    deleteTopic(id);
    ElMessage({
      message: $t(`topicFormDialog.message.action.delete.success`),
      type: 'success',
    });
    setFormStatusSuccess();
    closeDialog();
  } catch (error) {
    ElMessage({
      message: $t(`topicFormDialog.message.action.delete.fail`),
      // $t(`topicFormDialog.message.action.delete.fail`) +
      // $t(`topicFormDialog.message.exception.${ERROR_TYPE[err.name]}`),
      type: 'error',
    });
    setFormStatusFail();
  }
};
//#endregion ----

//#endregion --

//#region 生命周期--
onMounted(() => {
  initFormData();
});
//#endregion --
</script>
