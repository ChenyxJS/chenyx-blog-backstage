<!--
 * @Author: chenyx
 * @Date: 2023-03-22 20:44:05
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-28 19:47:35
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
    <el-form
      :model="state.form"
      ref="formRef"
      :rules="state.rules"
      label-width="auto"
      style="display: flex; flex-wrap: wrap"
    >
      <el-form-item label="标签名称" prop="tagTitle" style="width: 100%">
        <el-input
          v-model="state.form.tagName"
          placeholder="请输入"
        ></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogClose">取 消</el-button>
      <el-button
        type="primary"
        @click="submitClick"
        v-loading="state.submitting"
        :disabled="state.submitting"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch, defineEmits } from 'vue';
import { Tag } from '@/api/tag/types';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { updateTag, addTag } from '@/api/tag';

// state
const props = defineProps({
  form: {
    type: Object,
    default: {}
  },
  isVisible: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['dialogClose', 'refresh']);
const formRef = ref<FormInstance>();
const state = reactive({
  isVisible: props.isVisible,
  rules: {
    tagTitle: {
      required: true
    }
  } as FormRules,
  form: props.form as Tag,

  submitting: false
});
watch(
  () => props.form as Tag,
  (newValue, oldValue) => {
    state.form = newValue;
  }
);
watch(
  () => props.isVisible,
  (newValue, oldValue) => {
    state.isVisible = newValue;
  }
);

const isEdit = computed(() => {
  return state.form.tagId ? true : false;
});

const dialogTitle = computed(() => {
  return state.form.tagId ? '编辑' : '创建';
});
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// function
function dialogClose() {
  state.isVisible = false;
  emit('dialogClose');
  resetForm(formRef.value);
}


function submitClick() {
  let commitData = state.form;
  if (isEdit.value) {
    updateTag(commitData).then(({ data }) => {
      if (data.success) {
        ElMessage.success('修改成功');
        emit('refresh');
        dialogClose();
      }
    });
  } else {
    addTag(commitData).then(({ data }) => {
      if (data.success) {
        ElMessage.success('操作成功');
        emit('refresh');
        dialogClose();
      } else {
        ElMessage.error(data.failReasonShow);
      }
    });
  }
}
</script>

<style></style>
