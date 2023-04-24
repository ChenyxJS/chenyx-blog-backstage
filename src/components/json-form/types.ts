/*
 * @Author: chenyx
 * @Date: 2023-04-20 12:09:01
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-24 11:08:15
 * @FilePath: /backstage/src/components/json-form/types.ts
 */

import { FormItemRule, FormRules } from "element-plus";

/**
 * @description: 校验表单列类型枚举
 * @param input 输入框
 * @param upload 上传文件
 * @param time 时间选择
 * @param solt 自定义插槽
 * @param
 * @param
 *
 * @return {*}
 */
export enum FieldType {
  input,
  upload,
  time,
  solt,
  checkbox,
  select,
  hidden,
}

/**
 * @description: 校验表单列配置选项
 * @param {string} label 标签名
 * @param {string} prop 属性名
 * @param {string} rule 校验规则
 * @param {string} placeholder 占位字符
 * @param {boolean} clearable 是否显示清空
 *
 * @return {*}
 */
export type FieldOption = {
  label: string;
  prop: string;
  required?: boolean;
  rule?: FormItemRule;
  type: FieldType;
  placeholder?: string;
  clearable?: boolean;
  value?: any;
  typeOptions?: any;
};

export interface JsonFormOptions {
  fieldOptions: FieldOption[];
  rules?: FormRules;
  sumbitFun: Function;
}

export interface JsonFormResult<T> {
  fieldOptions: FieldOption[];
  model: Record<string, any>;
  rules?: FormRules;
  sumbitFun: Function;
  resultData: () => T;
}
