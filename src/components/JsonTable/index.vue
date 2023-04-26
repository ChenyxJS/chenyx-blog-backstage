<!--
 * @Author: chenyx
 * @Date: 2023-03-22 15:25:23
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-17 01:58:01
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
        :data="hook.tableData"
        :tableHeader="hook.tableHeader"
        :border="true"
        style="width: 100%"
        height="600"
      >
        <el-table-column
          v-for="(col, index) in hook.tableHeader"
          :key="index"
          :fixed="col.isFixed"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :align="col.align ? col.align : AlignType.center"
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
    <div v-if="hook.page !== null" class="page">
      <el-pagination
        small
        :hide-on-single-page="false"
        prev-text="上一页"
        next-text="下一页"
        :current-page="hook.page.current"
        :page-size="hook.page.limit"
        :total="hook.page.total"
        layout="prev, pager, next, total, slot, jumper"
        @current-change="onCurrentPageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { JsonTableResult } from './tableHook';
import { FieldType, AlignType } from './types';
import { formatDate } from '@/utils/index';

// 事件
const emit = defineEmits(['current-change', 'row-click']);
// 参数
const props = defineProps({
  hook: {
    type: Object as PropType<JsonTableResult<any>>,
    default: () => {}
  }
});
// create阶段获取Table数据
props.hook.execute();

// function
const onCurrentPageChange = (current:number) => {
  props.hook.onCurrentPageChange(current);
};
const rowClick = (row: any) => {
  emit('row-click', row);
};
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
    margin-right: 20px;
  }
}
</style>
