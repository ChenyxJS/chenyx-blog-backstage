/*
 * @Author: chenyx
 * @Date: 2023-03-22 15:43:34
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-25 16:45:15
 * @FilePath: /backstage-manage/src/api/article/types.ts
 */
export interface Article {
  articleId: number;
  articleTitle: string;
  articleDesc: string;
  articleType: string;
  articleUrl: string;
  articleCreateTime: string;
}

export enum ArticleType {
  origin = '原创',
  reprint = '转载'
}

export interface ArticleQuery extends PageQuery {
  keywords: string;
  articleType: string;
}
