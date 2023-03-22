<!--
 * @Author: chenyx
 * @Date: 2023-03-22 20:44:05
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-23 00:45:52
 * @FilePath: /backstage-manage/src/views/content/article/EditDialog.vue
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
      <el-form-item label="文章标题" prop="articleTitle" style="width: 100%">
        <el-input
          v-model="state.form.articleTitle"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="文档">
        <upload @update:model-value="changeUrl"></upload>
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
import { Article } from '@/api/article/types';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import upload from '@/components/Upload/Upload.vue';
import { updateArticle } from '@/api/article';

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
const emit = defineEmits(['dialogClose']);
const formRef = ref<FormInstance>();
const state = reactive({
  isVisible: props.isVisible,
  rules: {
    articleTitle: {
      required: true
    }
  } as FormRules,
  form: props.form as Article,
  submitting: false
});
watch(
  () => props.form as Article,
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
const dialogTitle = computed(() => {
  return state.form.articleId ? '编辑' : '创建';
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
function changeUrl(url:string){
    state.form.articleUrl = url;
}

function submitClick() {
    updateArticle({
        articleId: state.form.articleId,
        articleUrl: state.form.articleUrl
    } as Article).then(({data}) => {
        if(data.success){
            ElMessage.success('修改成功')
        }
    })
}
</script>

<style></style>
