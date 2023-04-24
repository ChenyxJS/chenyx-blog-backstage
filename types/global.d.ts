/*
 * @Author: chenyx
 * @Date: 2023-03-01 13:44:35
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-28 20:13:41
 * @FilePath: /backstage-manage/types/global.d.ts
 */
declare global {
  interface BaseApiResult {
    // 请求是否成功
    success: boolean;
    // 错误码
    tip: string;
    // 维护人员看到的错误原因
    failReason: string;
    // 客户显示的错误原因
    failReasonShow: string;
    // 对象
    object?: any;
  }

  interface PageQuery {
    page: number;
    limit: number;
  }

  interface PageResult<T> extends BaseApiResult {
    root: Array<T>;
    // 返回的记录总数
    totalSize: number;
  }

  type DialogType = {
    title?: string;
    visible: boolean;
  };

  type OptionType = {
    value: string|number;
    label: string;
    checked?: boolean;
    children?: OptionType[];
  };
}
export {};
