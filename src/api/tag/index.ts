/*
 * @Author: chenyx
 * @Date: 2023-03-22 15:43:28
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-28 19:51:20
 * @FilePath: /backstage-manage/src/api/tag/index.ts
 */
import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { Tag, TagQuery } from './types';

export function getTagList(
  data?: TagQuery
): AxiosPromise<PageResult<Tag>> {
  return request({
    url: '/admin/tag/selectByExample',
    method: 'GET',
    params: data
  });
}

export function addTag(data: Tag):AxiosPromise<BaseApiResult>  {
  return request({
    url: '/admin/tag/add',
    method: 'POST',
    data
  });
}

export function updateTag(data: Tag):AxiosPromise<BaseApiResult>  {
  return request({
    url: '/admin/tag/update',
    method: 'POST',
    data
  });
}

export function deleteTag(data:object):AxiosPromise<BaseApiResult>  {
  return request({
    url: '/admin/tag/delete',
    method: 'POST',
    data
  });
}
