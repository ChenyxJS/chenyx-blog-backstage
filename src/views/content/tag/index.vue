<!--
 * @Author: chenyx
 * @Date: 2023-03-22 13:24:37
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-26 22:24:59
 * @FilePath: /backstage-manage/src/views/content/tag/index.vue
-->
<template>
  <div class="list-view-layout">
    <json-filter>
      <el-form :inline="true">
        <el-form-item>
          <el-button @click="tableHook.execute()">查 询</el-button>
          <el-button type="primary" @click="doAdd()">新 增</el-button>
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
      @refresh="tableHook.execute"
      @dialogClose="state.isVisible = false"
    ></edit-panel>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import JsonTabele from '@/components/JsonTable/index.vue';
import JsonFilter from '@/components/JsonFilter/index.vue';
import EditPanel from './EditDialog.vue';
import { deleteTag, getTagList } from '@/api/tag/index';
import { Tag, TagQuery } from '@/api/tag/types';
import { TableHeader } from '@/components/JsonTable/types';
import { Action, ElMessage, ElMessageBox } from 'element-plus';
import {
  JsonTableOptions,
  useTableHook
} from '@/components/JsonTable/tableHook';

// state
const state = reactive({
  entity: {} as Tag,
  isVisible: false
});

// hook
const options = reactive({
  apiFun: getTagList,
  param: {
    page: 1,
    limit: 10
  } as TagQuery,
  tableHeader: [
    {
      prop: 'tagName',
      label: '标签名称',
      isFixed: true
    },
    {
      prop: 'operations',
      label: '操作',
      slot: true
    }
  ] as TableHeader[]
}) as JsonTableOptions<Tag, TagQuery>;
const tableHook = useTableHook<Tag, TagQuery>(options);

// function
/**
 * @description: 显示编辑窗口
 * @param {Tag} data
 * @return {*}
 */
function showEditPanel(data?: Tag) {
  state.entity = data || ({} as Tag);
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
 * @param {Tag} data
 * @return {*}
 */
function delete_click(data: Tag) {
  ElMessageBox.alert('是否确认要删除', '提示', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    showCancelButton: true,
    callback: (action: Action) => {
      if (action === 'confirm') {
        // 弹窗提示是否确认要删除
        deleteTag({ id: data.tagId })
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
