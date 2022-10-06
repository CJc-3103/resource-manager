<template>
  <el-dialog
    v-model="visible"
    :title="$t('topicPicker.form.formTitle.add')"
    width="30%"
    :before-close="handleCloseDialog"
  >
    <el-form
      class="form"
      :model="formData"
      :rules="rules"
      label-width="120px"
      label-position="top"
      status-icon
    >
      <el-form-item prop="topicName">
        <span class="label"
          >{{ $t('topicPicker.form.fields.topicName.title') }}
          <el-popover
            placement="top-start"
            :width="200"
            trigger="hover"
            :content="$t('topicPicker.form.fields.topicName.detail')"
          >
            <template #reference>
              <el-icon class="label-icon"><InfoFilled /></el-icon>
            </template>
          </el-popover>
        </span>
        <el-input v-model="formData.topicName" />
      </el-form-item>

      <el-form-item prop="pathType">
        <span class="label"
          >{{ $t('topicPicker.form.fields.pathType.title') }}
          <el-popover
            placement="top-start"
            :width="200"
            trigger="hover"
            :content="$t('topicPicker.form.fields.pathType.detail')"
          >
            <template #reference>
              <el-icon class="label-icon"><InfoFilled /></el-icon>
            </template>
          </el-popover>
        </span>

        <el-radio-group v-model="formData.pathType" @change="handleTypeChange">
          <el-radio-button label="network" size="small">
            {{ $t('topicPicker.form.fields.pathType.type.network') }}
          </el-radio-button>
          <el-radio-button label="local" size="small">
            {{ $t('topicPicker.form.fields.pathType.type.local') }}
          </el-radio-button>
          <el-radio-button label="all" size="small">
            {{ $t('topicPicker.form.fields.pathType.type.all') }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">{{
          $t('topicPicker.form.footer.cancel')
        }}</el-button>
        <el-button type="primary" @click="closeDialog">{{
          $t('topicPicker.form.footer.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
//#region 依赖--
import { InfoFilled } from '@element-plus/icons-vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();

const props = defineProps({
  dialogVisible: Boolean,
});
const emit = defineEmits(['update:dialogVisible']);
//#endregion --

//#region 视图构建--
const formData = {
  topicName: '',
  pathType: 'all',
};
const rules = {
  topicName: [
    {
      required: true,
      message: $t('topicPicker.form.fields.topicName.message.require'),
      trigger: 'blur',
    },
    {
      min: 1,
      max: 20,
      message: $t('topicPicker.form.fields.topicName.message.length'),
      trigger: 'blur',
    },
  ],
  pathType: [{ required: true, message: '', trigger: 'blur' }],
};
//#endregion --

//#region 交互--

// 选择地址类型
const handleTypeChange = (value) => {
  console.log('value', value);
  console.log('Path Type Changed');
};

// 控制对话框
const visible = computed({
  get() {
    return props.dialogVisible;
  },
  set(value) {
    console.log('value', value);
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
</script>
