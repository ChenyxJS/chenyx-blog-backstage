<!--
 * @Author: chenyx
 * @Date: 2023-03-22 13:24:37
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-01 16:58:59
 * @FilePath: /backstage-manage/src/views/content/article/index.vue
-->
<template>
  <div class="list-view-layout">
    <json-filter>
      <el-form :inline="true">
        <el-form-item label="文章关键词">
          <el-input
            v-model="state.pageQuery.keywords"
            placeholder="请输入"
            clearable
          />
        </el-form-item>

        <el-form-item>
          <el-button @click="getData">查 询</el-button>
          <el-button type="primary" @click.native="doAdd()">新 增</el-button>
        </el-form-item>
      </el-form>
    </json-filter>

    <json-tabele
      :table-data="state.articleList"
      :table-heads="state.tableHeads"
      :page="state.page"
      @current-change="currentChange"
    >
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
      @refresh="getData"
      @dialogClose="state.isVisible = false"
    ></edit-panel>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import JsonTabele from '@/components/JsonTable/index.vue';
import JsonFilter from '@/components/JsonFilter/index.vue';
import EditPanel from './EditDialog.vue';
import { Article, ArticleQuery, ArticleType } from '@/api/article/types';
import { TableHeader } from '@/components/JsonTable/types';
import { FieldType } from '@/components/JsonTable/types';
import { getArticleList, deleteArticle } from '@/api/article/index';
import { Action, ElMessage, ElMessageBox } from 'element-plus';

// state
const state = reactive({
  articleList: [] as Array<Article>,
  pageQuery: {
    page: 1,
    limit: 10,
    keywords: '',
    articleTagId: 0
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
  ] as Array<TableHeader>,
  entity: {} as Article,
  isVisible: false
});
// hook
onMounted(() => {
  getData();
});

function currentChange(page: any) {
  state.pageQuery.page = page.page;
  state.pageQuery.limit = page.limit;
  getData()
}

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
function showEditPanel(data?: Article) {
  state.entity = data || ({} as Article);
  state.isVisible = true;
}

/**
 * @description: 新增
 * @return {*}
 */
function doAdd() {
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
        // let id = data.articleId;
        deleteArticle({ id: data.articleId })
          .then(({ data }) => {
            if (data.success) {
              ElMessage.success('删除成功');
              // 刷新列表
              getData();
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
