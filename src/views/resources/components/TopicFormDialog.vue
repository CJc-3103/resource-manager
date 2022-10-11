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
          <el-button @click="closeDialog">{{
            $t('form.action.cancel')
          }}</el-button>
          <el-button type="primary" @click="handleAddTopic(TopicFormRef)">{{
            $t('form.action.submit')
          }}</el-button>
        </span>
        <span
          v-else-if="formStatus === 'view'"
          class="topic-form-dialog_footer btn-group"
        >
          <el-button @click="closeDialog">{{
            $t('form.action.confirm')
          }}</el-button>
        </span>
        <span
          v-else-if="formStatus === 'edit'"
          class="topic-form-dialog_footer btn-group"
        >
          <el-button @click="closeDialog">{{
            $t('form.action.cancel')
          }}</el-button>
          <el-button type="success" @click="handleEditTopic(TopicFormRef)">{{
            $t('form.action.submit')
          }}</el-button>
        </span>
        <span
          v-else-if="formStatus === 'delete'"
          class="topic-form-dialog_footer btn-group"
        >
          <el-button @click="closeDialog">{{
            $t('form.action.cancel')
          }}</el-button>
          <el-button type="danger" @click="handleDeleteTopic(TopicFormRef)">{{
            $t('form.action.confirm')
          }}</el-button>
        </span>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
//#region 依赖--
import { InfoFilled } from '@element-plus/icons-vue';
import { ref, computed, onMounted, toRaw } from 'vue';
import { useI18n } from 'vue-i18n';
import { addTopic, getTopicById } from '@/api';
import { ElMessage } from 'element-plus';
import { formUtils } from '@/utils/element-plus-utils';
// import { db } from '@/indexedDB';

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
  topicId: String,
});
const emit = defineEmits(['update:dialogVisible']);
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
  if (['view', 'edit', 'delete'].includes(props.formStatus)) {
    console.log('formStatus', props.formStatus);
    // topic = getTopicById(props.topicId);
    // formData.value = topic;
  }
};
// initFormData();
//#endregion --

//#region 交互--

//#region 选择地址类型----
const handleTypeChange = (value) => {
  // console.log('value', value);
  // console.log('Path Type Changed');
};
//#endregion ----

//#region 提交新增----
const TopicFormRef = ref(null);

const ERROR_TYPE = {
  ConstraintError: 'constraint',
};

const handleAddTopic = (formEl) => {
  formUtils.validForm(formEl).then(() => {
    addTopic(toRaw(formData.value))
      .then(() => {
        ElMessage({
          message: $t(`topicFormDialog.message.action.add.success`),
          type: 'success',
        });
        closeDialog();
      })
      .catch((err) => {
        ElMessage({
          message:
            $t(`topicFormDialog.message.action.add.fail`) +
            $t(`topicFormDialog.message.exception.${ERROR_TYPE[err.name]}`),
          type: 'error',
        });
      });
  });
};
//#endregion ----

//#region 提交修改----

//#endregion ----

//#region 提交删除----

//#endregion ----

//#endregion --

//#region 生命周期--
onMounted(() => {
  initFormData();
});
//#endregion --
</script>
