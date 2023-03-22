declare global {
  interface ApiResult {
    // 请求是否成功
    success: boolean;
    // 返回的记录总数
    totalSize: number;
    // 错误码
    tip: string;
    // 维护人员看到的错误原因
    failReason: string;
    // 客户显示的错误原因
    failReasonShow: string;
    // 数据
    root: Array;
    // 对象
    object?: any;
  }

  interface PageQuery {
    pageNum: number;
    pageSize: number;
  }

  interface PageResult<T> {
    list: T;
    total: number;
  }

  type DialogType = {
    title?: string;
    visible: boolean;
  };

  type OptionType = {
    value: string;
    label: string;
    checked?: boolean;
    children?: OptionType[];
  };
}
export {};
