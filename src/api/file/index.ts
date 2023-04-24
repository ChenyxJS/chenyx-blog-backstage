/*
 * @Author: chenyx
 * @Date: 2023-03-01 13:44:35
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-25 21:41:45
 * @FilePath: /backstage-manage/src/api/file/index.ts
 */
import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { QiniuConfig } from './types';

export function getToken():AxiosPromise<PageResult<QiniuConfig>> {
  return request({
    url: '/system/getQiNiuUploadToken',
    method: 'post'
  });
}
export function getDomain() {
  return request({
    url: '/system/systemConfig/getSystemConfigValue',
    method: 'post',
    data: {
      sycoCode: 'qny_domain'
    }
  });
}

export function getHttp() {
  let actions = ['http://upload.qiniup.com', 'https://upload.qiniup.com'];
  let obj = {
    url: actions[0]
  };
  let protocolStr = document.location.protocol;
  if (protocolStr === 'https:') {
    obj.url = actions[1];
  } else {
    obj.url = actions[0];
  }
  return obj;
}




