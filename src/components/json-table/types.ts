/*
 * @Author: chenyx
 * @Date: 2023-03-22 17:00:16
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-19 15:23:35
 * @FilePath: /backstage/src/components/json-table/types.ts
 */

/**
 * @description: 数据类型
 * @param 'nomal' 正常显示
 * @param 'url'  链接
 * @param 'enum' type类型
 * @param 'percentage' 百分数
 * @param 'time' 时间
 * @param 'image' 图片
 * @param 'tooltip' 提示
 * @return {*}
 */
export enum FieldType {
  nomal,
  url,
  image,
  time,
  percentage,
  enum,
  tooltip
}
export enum AlignType {
  left = 'left',
  center = 'center',
  right = 'right'
}

/**
 * @description:
 *   在tableHeads的列上加上：（type只能选择其中一个，不加则直接显示返回数据）
 * @param prop 字段
 * @param label 标签名
 * @param align 对齐==>对齐类型AlignType
 * @param slot 是否开启插槽
 * @param type 类型==>数据类型FieldType
 * @param dateFormat FieldType==>time,日期格式化字符串 default:"yyyy-MM-dd hh:mm:ss"
 * @param decimal FieldType==>time,小数点保留位数
 * @param enumData FieldType==>enum,枚举类
 * @return {*}
 */
export interface TableHeader {
  prop: string;
  label: string;
  slot?: boolean;
  width?: number;
  type?: FieldType;
  isFixed?: boolean;
  dateFormat?: string;
  decimal?: number;
  enumData?: any;
  align?: AlignType;
}

export interface TablePage {
  current:number;
  limit: number;
  total: number;
}
