<!--
 * @Author: chenyx
 * @Date: 2023-03-22 20:44:05
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-28 20:45:29
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
      <el-form-item label="文章概述" prop="articleDesc" style="width: 100%">
        <el-input
          v-model="state.form.articleDesc"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="文章类型" prop="articleType" style="width: 50%">
        <el-select
          v-model="state.form.articleType"
          placeholder="请选择文章类型"
        >
          <el-option
            v-for="item in state.typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="文章标签" prop="articleTagId" style="width: 50%">
        <el-select
          v-model="state.form.articleTagId"
          placeholder="请选择文章类型"
        >
          <el-option
            v-for="item in state.tagOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="创建时间"
        prop="articleCreateTime"
        style="width: 100%"
      >
        <el-date-picker
          v-model="state.createTime"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="请选择文章创建时间"
        />
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
import { computed, reactive, ref, watch, defineEmits, onMounted } from 'vue';
import { Article, ArticleType } from '@/api/article/types';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import upload from '@/components/Upload/Upload.vue';
import { updateArticle, addArticle } from '@/api/article';
import { getTagList } from '@/api/tag/index';
import { formatDate } from '@/utils';
import { Tag, TagQuery } from '@/api/tag/types';

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
    articleTitle: {
      required: true
    }
  } as FormRules,
  form: props.form as Article,
  createTime: '',
  typeOptions: [
    {
      value: 'origin',
      label: ArticleType.origin
    },
    {
      value: 'reprint',
      label: ArticleType.reprint
    }
  ] as OptionType[],
  tagOptions: [] as OptionType[],
  submitting: false
});
watch(
  () => props.form as Article,
  (newValue, oldValue) => {
    state.form = newValue;
    state.createTime = formatDate(String(props.form.articleCreateTime));
  }
);
watch(
  () => props.isVisible,
  (newValue, oldValue) => {
    state.isVisible = newValue;
  }
);

const isEdit = computed(() => {
  return state.form.articleId ? true : false;
});

const dialogTitle = computed(() => {
  return state.form.articleId ? '编辑' : '创建';
});

onMounted(() => {
  // 获取tag列表
  getTagList({
    page: 1,
    limit: 0
  } as TagQuery).then(({ data }) => {
    if (data.success) {
      state.tagOptions = generateTag(data.root);
    }
  });
});

// function

function generateTag(tags: Tag[]): OptionType[] {
  let list = [] as OptionType[];
  tags.forEach(tag => {
    list.push({
      value: tag.tagId,
      label: tag.tagName
    } as OptionType);
  });
  return list;
}

function resetForm(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.resetFields();
}

function dialogClose() {
  state.isVisible = false;
  emit('dialogClose');
  resetForm(formRef.value);
}
function changeUrl(url: string) {
  state.form.articleUrl = url;
}

function submitClick() {
  let commitData = state.form;
  commitData.articleCreateTime = state.createTime;
  delete commitData.articleUpdateTime;
  if (isEdit.value) {
    updateArticle(commitData).then(({ data }) => {
      if (data.success) {
        ElMessage.success('修改成功');
        emit('refresh');
        dialogClose();
      }
    });
  } else {
    addArticle(commitData).then(({ data }) => {
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
