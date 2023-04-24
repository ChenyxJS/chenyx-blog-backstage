<script setup lang="ts">
import { PropType } from "vue";
import { JsonTableResult } from "./table-hook";
import { FieldType, AlignType } from "./types";
import { helper } from "@/utils/helper";

// 事件
const emit = defineEmits(["current-change", "row-click"]);
// 参数
const props = defineProps({
  hook: {
    type: Object as PropType<JsonTableResult<any>>,
    default: () => {},
  },
});
// create阶段获取Table数据
props.hook.execute();

// function
const onCurrentPageChange = (current: number) => {
  props.hook.onCurrentPageChange(current);
};
const onSizeChange = (current: number, size: number) => {
  props.hook.onSizeChange(current, size);
};
const rowClick = (row: any) => {
  emit("row-click", row);
};
</script>

<template>
  <div class="intro-y col-span-12 overflow-auto">
    <el-table
    class="dark:bg-darkmode-600 rounded-md"
      ref="jsonTable"
      @row-click="rowClick"
      :data="hook.tableData"
      :tableHeader="hook.tableHeader"
      :border="false"
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
            helper.formatDate(
              scope.row[col.prop],
              col.dateFormat ? col.dateFormat : ""
            )
          }}</span>
          <span v-else-if="col.type === FieldType.percentage">{{
            Number(scope.row[col.prop] * 100).toFixed(
              col.decimal ? col.decimal : 0
            ) + "%"
          }}</span>
          <span
            v-else-if="col.type === FieldType.tooltip"
            class="text-ellipsis overflow-hidden line-clamp-3"
            :name="scope.row[col.prop]"
            >{{ scope.row[col.prop] }}
            <TippyContent
              class="tooltip"
              :to="scope.row[col.prop]"
              :options="{
                theme: 'light',
                trigger: 'click',
              }"
            >
              {{ scope.row[col.prop] }}
            </TippyContent></span
          >

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
  <!-- BEGIN: Pagination -->
  <pagination
    :current-page="hook.page.current"
    :page-size="hook.page.limit"
    :total="hook.page.total"
    @current-change="onCurrentPageChange"
    @size-change="onSizeChange"
  >
  </pagination>
  <!-- END: Pagination -->
</template>

<style lang="scss" scoped>
:deep(.el-table) {
  --el-table-border-color: var(--color-slate-300);
  --el-table-border: 1px solid var(--color-slate-300);
  --el-table-text-color: var(--color-info);
  --el-table-header-text-color: var(--color-info);
  --el-table-row-hover-bg-color: var(--color-slate-300);
  --el-table-current-row-bg-color: var(--color-slate-300);
  --el-table-header-bg-color: var(--color-slate-300);
  --el-table-fixed-box-shadow: var(--color-slate-300);
  --el-table-bg-color: var(--color-slate-300);
  --el-table-tr-bg-color: var(--color-slate-300);
  --el-table-expanded-cell-bg-color: var(--color-slate-300);
  --el-table-fixed-left-column: inset 10px 0 10px -10px var(--color-slate-300);
  --el-table-fixed-right-column: inset -10px 0 10px -10px var(--color-slate-300);
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  height: fit-content;
  width: 100%;
  max-width: 100%;
  font-size: 14px;
  @apply bg-white;

  .el-table__body-wrapper tr td.el-table-fixed-column--left,
  .el-table__body-wrapper tr td.el-table-fixed-column--right {
    @apply bg-white dark:bg-darkmode-600;
  }
 
}
</style>
