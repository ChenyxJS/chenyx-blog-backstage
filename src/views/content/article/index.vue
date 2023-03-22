<!--
 * @Author: chenyx
 * @Date: 2023-03-22 13:24:37
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-22 22:03:37
 * @FilePath: /backstage-manage/src/views/content/article/index.vue
-->
<template>
  <json-tabele
    :table-data="state.articleList"
    :table-heads="state.tableHeads"
    :page="state.page"
  >
    <template #operations="iData">
      <el-button type="warning" @click="showEditPanel(iData.rowData.scope.row)"
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
    @dialogClose="state.isVisible = false"
  ></edit-panel>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import JsonTabele from '@/components/JsonTable/index.vue';
import EditPanel from './EditDialog.vue';
import { Article, ArticleQuery, ArticleType } from '@/api/article/types';
import { TableHeader } from '@/components/JsonTable/types';
import { FieldType } from '@/components/JsonTable/types';
import { getArticleList } from '@/api/article/index';

// state
const state = reactive({
  articleList: [] as Array<Article>,
  pageQuery: {
    page: 1,
    limit: 10,
    keywords: '',
    articleType: 'origin'
  } as ArticleQuery,
  page: {
    page: 1,
    limit: 10,
    total: 0
  },
  tableHeads: [
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
      prop: 'articleCreateTime',
      label: '创建时间',
      type: FieldType.time
    },
    {
      prop: 'operations',
      label: '操作',
      slot: true
    }
  ] as Array<TableHeader>,
  entity: {} as Article,
  isVisible: false
});
// hook
onMounted(() => {
  getData();
});

// function
/**
 * @description: 获取文章列表数据
 * @return {*}
 */
function getData() {
  getArticleList(state.pageQuery).then(({ data }) => {
    state.articleList = data.root;
    state.page.total = data.totalSize;
  });
}

/**
 * @description: 显示编辑窗口
 * @param {Article} data
 * @return {*}
 */
function showEditPanel(data: Article) {
  state.entity = data;
  state.isVisible = true;
}
/**
 * @description: 删除
 * @param {Article} data
 * @return {*}
 */
function delete_click(data: Article) {
  // 弹窗提示是否确认要删除
}
</script>

<style></style>
