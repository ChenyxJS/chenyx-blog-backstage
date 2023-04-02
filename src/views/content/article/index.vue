<!--
 * @Author: chenyx
 * @Date: 2023-03-22 13:24:37
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-02 18:14:32
 * @FilePath: /backstage-manage/src/views/content/article/index.vue
-->
<template>
  <div class="list-view-layout">
    <json-filter>
      <el-form :inline="true">
        <el-form-item label="文章关键词">
          <el-input
            v-model="options.param.keywords"
            placeholder="请输入"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="tableHook.execute()">查 询</el-button>
          <el-button type="primary" @click.native="add_click()"
            >新 增</el-button
          >
        </el-form-item>
      </el-form>
    </json-filter>

    <json-tabele :hook="tableHook">
      <template #operations="iData">
        <el-button
          type="warning"
          @click="showEditPanel(iData.rowData.scope.row)"
          >编 辑</el-button
        >
        <el-button type="danger" @click="delete_click(iData.rowData.scope.row)"
          >删 除</el-button
        >
      </template>
    </json-tabele>
    <edit-panel
      :form="state.entity"
      :is-visible="state.isVisible"
      @refresh="tableHook.execute()"
      @dialogClose="state.isVisible = false"
    ></edit-panel>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import JsonTabele from '@/components/JsonTable/index.vue';
import JsonFilter from '@/components/JsonFilter/index.vue';
import EditPanel from './EditDialog.vue';
import { Article, ArticleQuery, ArticleType } from '@/api/article/types';
import { TableHeader } from '@/components/JsonTable/types';
import {
  useTableHook,
  JsonTableOptions
} from '@/components/JsonTable/tableHook';
import { FieldType } from '@/components/JsonTable/types';
import { getArticleList, deleteArticle } from '@/api/article/index';
import { Action, ElMessage, ElMessageBox } from 'element-plus';

// state
const state = reactive({
  articleList: [] as Array<Article>,
  page: {
    page: 1,
    limit: 10,
    total: 0
  },
  entity: {} as Article,
  isVisible: false
});
// hook
const options = reactive({
  apiFun: getArticleList,
  param: {
    page: 1,
    limit: 10,
    keywords: '',
    articleTagId: 0
  } as ArticleQuery,
  tableHeader: [
    {
      prop: 'articleTitle',
      label: '文章标题',
      isFixed: true
    },
    {
      prop: 'articleType',
      label: '文章类型',
      type: FieldType.enum,
      enumData: ArticleType
    },
    {
      prop: 'articleDesc',
      label: '文章概述'
    },
    {
      prop: 'articleUrl',
      label: '文章地址',
      type: FieldType.url
    },
    {
      prop: 'articleCreateTime',
      label: '创建时间',
      type: FieldType.time
    },
    {
      prop: 'operations',
      label: '操作',
      slot: true
    }
  ] as TableHeader[]
}) as JsonTableOptions<Article, ArticleQuery>;
const tableHook = useTableHook<Article, ArticleQuery>(options);

// function
/**
 * @description: 显示编辑窗口
 * @param {Article} data
 * @return {*}
 */
function showEditPanel(data?: Article) {
  state.entity = data || ({} as Article);
  state.isVisible = true;
}

/**
 * @description: 新增
 * @return {*}
 */
function add_click() {
  showEditPanel();
}

/**
 * @description: 删除
 * @param {Article} data
 * @return {*}
 */
function delete_click(data: Article) {
  ElMessageBox.alert('是否确认要删除', '提示', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    showCancelButton: true,
    callback: (action: Action) => {
      if (action === 'confirm') {
        // 弹窗提示是否确认要删除
        deleteArticle({ id: data.articleId })
          .then(({ data }) => {
            if (data.success) {
              ElMessage.success('删除成功');
              // 刷新列表
              tableHook.execute();
            }
          })
          .catch(err => {
            ElMessage.error(err.message);
          });
      }
    }
  });
}
</script>

<style></style>
