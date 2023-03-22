/*
 * @Author: chenyx
 * @Date: 2023-03-01 13:44:35
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-22 23:38:05
 * @FilePath: /backstage-manage/src/api/file/index.ts
 */
import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { FileInfo } from './types';

export function getToken() {
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

/**
 * 上传文件
 *
 * @param file
 */
export function uploadFileApi(file: File): AxiosPromise<FileInfo> {
  const formData = new FormData();
  formData.append('file', file);
  return request({
    url: '/api/v1/files',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

/**
 * 删除文件
 *
 * @param filePath 文件完整路径
 */
export function deleteFileApi(filePath?: string) {
  return request({
    url: '/api/v1/files',
    method: 'delete',
    params: { filePath: filePath }
  });
}
