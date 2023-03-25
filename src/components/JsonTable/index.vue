<!--
 * @Author: chenyx
 * @Date: 2023-03-22 15:25:23
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-25 17:50:38
 * @FilePath: /backstage-manage/src/components/JsonTable/index.vue
-->
<template>
  <div class="list-view-table">
    <div class="json-table-view">
      <el-table
        ref="jsonTable"
        stripe
        size="small"
        scrollbar-always-on
        @row-click="rowClick"
        :data="tableData"
        :tableHeader="tableHeads"
        :border="true"
        style="width: 100%"
        height="600"
      >
        <el-table-column
          v-for="(col, index) in tableHeads"
          :key="index"
          :fixed="col.isFixed"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          align="center"
        >
          <template #default="scope">
            <span v-if="col.type === FieldType.time">{{
              formatDate(
                scope.row[col.prop],
                col.dateFormat ? col.dateFormat : 'yyyy-MM-dd hh:mm:ss'
              )
            }}</span>
            <span v-else-if="col.type === FieldType.percentage">{{
              Number(scope.row[col.prop] * 100).toFixed(
                col.decimal ? col.decimal : 0
              ) + '%'
            }}</span>
            <span v-else-if="col.type === FieldType.enum">{{
              col.enumData[scope.row[col.prop]]
            }}</span>
            <el-image
              v-else-if="col.type === FieldType.image"
              style="width: 100px; height: 100px"
              :src="scope.row[col.prop]"
              fit="contain"
            ></el-image>
            <a
              v-else-if="col.type === FieldType.url"
              :href="scope.row[col.prop]"
              target="_blank"
              >{{ scope.row[col.prop] }}</a
            >
            <span v-else-if="!col.slot">{{ scope.row[col.prop] }}</span>
            <slot v-else :name="col.prop" :rowData="{ scope }"></slot>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="page !== null" class="page">
      <el-pagination
        small
        :hide-on-single-page="false"
        prev-text="上一页"
        next-text="下一页"
        :current-page.sync="page.current"
        :page-size="page.limit"
        :total="page.total"
        layout="prev, pager, next, total, slot, jumper"
        @current-change="onCurrentPageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { TableHeader, FieldType } from './types';
import { formatDate } from '@/utils/index';

const props = defineProps({
  tableData: {
    type: Array,
    default: []
  },
  tableHeads: {
    type: Array<TableHeader>,
    default: []
  },
  page: {
    type: Object,
    default: {
      page: 1,
      limit: 15,
      total: 0
    }
  }
});

// state
const state = reactive({});

// function
const onCurrentPageChange = () => {};
const rowClick = (row: any) => {};
</script>

<style lang="scss" scoped>
.list-view-table {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  .json-table-view {
    flex: 1;
    overflow: auto;
  }

  .page {
    display: flex;
    justify-content: flex-end;
    height: 40px;
  }
}
</style>
