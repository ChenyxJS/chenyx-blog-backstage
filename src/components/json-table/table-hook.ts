/*
 * @Author: chenyx
 * @Date: 2023-04-02 01:03:54
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-19 20:21:25
 * @FilePath: /backstage/src/components/json-table/tableHook.ts
 */

import { reactive } from "vue";
import { AxiosPromise } from "axios";
import { TableHeader, TablePage } from "./types";

export interface JsonTableOptions<T, P extends PageQuery> {
  apiFun: (param: P) => AxiosPromise<PageResult<T>>;
  param: P;
  tableHeader: TableHeader[];
  select: boolean;
}
export interface JsonTableResult<T> {
  tableData: T[];
  tableHeader: TableHeader[];
  execute: Function;
  onCurrentPageChange: (page: number) => void;
  onSizeChange: (page: number, size: number) => void;
  page: TablePage;
  select: boolean;
}
/**
 * @description:
 * @param {JsonTableOptions} options
 * @return {*}
 */
export function useTableHook<T, P extends PageQuery>(
  options: JsonTableOptions<T, P>
): JsonTableResult<T> {
  const { apiFun, param, tableHeader, select } = options;
  const result = reactive({
    tableData: [],
    execute: getData,
    onCurrentPageChange,
    onSizeChange,
    tableHeader,
    page: {
      current: param.page,
      limit: param.limit,
      total: 0,
    },
    select: select,
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
      .catch((err) => {})
      .finally(() => {});
  }
  function onCurrentPageChange(page: number) {
    result.page.current = page;
    param.page = page;
    getData();
  }
  function onSizeChange(page: number, size: number) {
    result.page.current = page;
    result.page.limit = size;
    param.limit = size;
    param.page = page;
    getData();
  }
  return result;
}
