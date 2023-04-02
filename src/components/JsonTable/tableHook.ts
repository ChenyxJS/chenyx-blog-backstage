/*
 * @Author: chenyx
 * @Date: 2023-04-02 01:03:54
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-02 16:40:47
 * @FilePath: /backstage-manage/src/components/JsonTable/tableHook.ts
 */

import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { AxiosPromise } from 'axios';
import { TableHeader, TablePage } from './types';

export interface JsonTableOptions<T, P extends PageQuery> {
  apiFun: (param: P) => AxiosPromise<PageResult<T>>;
  param: P;
  tableHeader: TableHeader[];
}
export interface JsonTableResult<T> {
  tableData: T[];
  tableHeader: TableHeader[];
  execute: Function;
  onCurrentPageChange: (page: number) => void;
  page: TablePage;
}
/**
 * @description:
 * @param {JsonTableOptions} options
 * @return {*}
 */
export function useTableHook<T, P extends PageQuery>(
  options: JsonTableOptions<T, P>
): JsonTableResult<T> {
  const { apiFun, param, tableHeader } = options;
  const result = reactive({
    tableData: [],
    execute: getData,
    onCurrentPageChange,
    tableHeader,
    page: {
      current: param.page,
      limit: param.limit,
      total: 0
    }
  }) as JsonTableResult<T>;
  function getData() {
    apiFun(param)
      .then(({ data }) => {
        if (data.success) {
          result.tableData = data.root || [];
        } else {
          result.tableData = [];
        }
        result.page.total = data.totalSize;
      })
      .catch(err => {
        ElMessage.error(err);
      })
      .finally(() => {});
  }
  function onCurrentPageChange(page: number) {
    result.page.current = page;
    param.page = page;
    getData();
  }
  return result;
}
