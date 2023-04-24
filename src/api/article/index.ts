/*
 * @Author: chenyx
 * @Date: 2023-03-22 15:43:28
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-29 00:11:21
 * @FilePath: /backstage-manage/src/api/article/index.ts
 */
import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { Article, ArticleQuery } from './types';

export function getArticleList(
  data?: ArticleQuery
): AxiosPromise<PageResult<Article>> {
  return request({
    url: '/admin/article/selectByExample',
    method: 'POST',
    params: data
  });
}

export function addArticle(data: Article):AxiosPromise<BaseApiResult>  {
  return request({
    url: '/admin/article/add',
    method: 'POST',
    data
  });
}

export function updateArticle(data: Article):AxiosPromise<BaseApiResult>  {
  return request({
    url: '/admin/article/update',
    method: 'POST',
    data
  });
}

export function deleteArticle(data:object):AxiosPromise<BaseApiResult>  {
  return request({
    url: '/admin/article/delete',
    method: 'POST',
    data
  });
}
