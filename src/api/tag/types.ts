/*
 * @Author: chenyx
 * @Date: 2023-03-22 15:43:34
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-28 18:13:25
 * @FilePath: /backstage-manage/src/api/tag/types.ts
 */
export interface Tag {
  tagId: number;
  tagName: string;
}


export interface TagQuery extends PageQuery {

}
