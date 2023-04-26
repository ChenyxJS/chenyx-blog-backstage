<!--
 * @Author: chenyx
 * @Date: 2023-03-22 20:44:05
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-26 23:07:04
 * @FilePath: /backstage-manage/src/views/content/tag/EditDialog.vue
-->
<template>
  <el-dialog
    :title="dialogTitle"
    v-model="state.isVisible"
    width="50%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="dialogClose"
  >
    <json-form ref="JsonFormRef" :options="state.options"></json-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button
          type="primary"
          @click="submitClick"
          v-loading="state.submitting"
          :disabled="state.submitting"
          >确 定</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import JsonForm from '@/components/JsonForm/index.vue';
import { computed, reactive, ref, watch, defineEmits, PropType } from 'vue';
import { Tag } from '@/api/tag/types';
import { ElMessage, FormRules } from 'element-plus';
import { updateTag, addTag } from '@/api/tag';
import {
  FieldOption,
  FieldType,
  JsonFormOptions
} from '@/components/JsonForm/types';

// state
const props = defineProps({
  form: {
    type: Object as PropType<Tag>,
    default: {} as Tag
  },
  isVisible: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['dialogClose', 'refresh']);

const JsonFormRef = ref();

const state = reactive({
  isVisible: props.isVisible,
  options: {} as JsonFormOptions,
  submitting: false
});
watch(
  () => props.form as Tag,
  () => {
    useHook();
  }
);
watch(
  () => props.isVisible,
  (newValue, oldValue) => {
    state.isVisible = newValue;
  }
);

const isEdit = computed(() => {
  return props.form.tagId ? true : false;
});

const dialogTitle = computed(() => {
  return props.form.tagId ? '编辑' : '创建';
});

// function

// json-form配置函数
function useHook() {
  state.options = {
    fieldOptions: [
      {
        label: 'id',
        prop: 'tagId',
        type: FieldType.hidden,
        value: props.form.tagId
      },
      {
        label: '标签名称',
        prop: 'tagName',
        type: FieldType.input,
        value: props.form.tagName,
        rule: [
          {
            required: true,
            message: '请填写标签名称'
          }
        ]
      }
    ] as FieldOption[],
    rules: {} as FormRules
  } as JsonFormOptions;
}

function dialogClose() {
  state.isVisible = false;
  JsonFormRef.value.resetForm();
  emit('dialogClose');
}

function submitClick() {
  let resultData = JsonFormRef.value.getHook().model;
  // 校验数据是否合格
  JsonFormRef.value
    .validate()
    .then(() => {
      if (isEdit.value) {
        updateTag(resultData).then(({ data }) => {
          if (data.success) {
            ElMessage.success('修改成功');
            emit('refresh');
            dialogClose();
          }
        });
      } else {
        addTag(resultData).then(({ data }) => {
          if (data.success) {
            ElMessage.success('操作成功');
            emit('refresh');
            dialogClose();
          } else {
            ElMessage.error(data.failReasonShow);
          }
        });
      }
    })
    .catch((err: any) => {});
}
</script>
