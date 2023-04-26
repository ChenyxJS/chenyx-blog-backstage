/*
 * @Author: chenyx
 * @Date: 2023-03-01 13:44:35
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-26 17:50:00
 * @FilePath: /backstage-manage/src/api/auth/index.ts
 */
import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { LoginData, VerifyCode } from './types';

/**
 *
 * @param data {LoginForm}
 * @returns
 */
export function loginApi(data: LoginData): AxiosPromise<BaseApiResult> {
  return request({
    url: '/api/admin/login',
    method: 'post',
    params: data
  });
}

/**
 * 注销
 */
export function logoutApi() {
  return request({
    url: '/api/admin/logOut',
    method: 'post'
  });
}

/**
 * 获取图片验证码
 */
export function getCaptcha(): AxiosPromise<VerifyCode> {
  return request({
    url: '/captcha?t=' + new Date().getTime().toString(),
    method: 'get'
  });
}
