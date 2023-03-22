/*
 * @Author: chenyx
 * @Date: 2023-03-22 15:43:28
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-23 00:17:12
 * @FilePath: /backstage-manage/src/api/article/index.ts
 */
import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { Article, ArticleQuery } from './types';

export function getArticleList(
  data?: ArticleQuery
): AxiosPromise<PageResult<Article>> {
  return request({
    url: '/web/article/all',
    method: 'GET',
    params: data
  });
}

export function updateArticle(data: Article):AxiosPromise<BaseApiResult>  {
  return request({
    url: '/admin/article/update',
    method: 'POST',
    data
  });
}
