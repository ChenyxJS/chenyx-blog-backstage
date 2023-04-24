/*
 * @Author: chenyx
 * @Date: 2023-03-01 13:44:35
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-21 21:11:01
 * @FilePath: /backstage/src/utils/request.ts
 */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Qs from "qs";
import { getToken } from "./cookie-token";
import { useUserStore } from "@/store/modules/user";
import router from "@/router";

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
  transformRequest: [
    function (data) {
      return Qs.stringify(data);
    },
  ],
});

// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    if (!config.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`
      );
    }
    const userStore = useUserStore();
    if (userStore.token) {
      config.headers["X-Token"] = getToken();
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.tip === "10001") {
      const userStore = useUserStore();
      userStore.resetToken();
      router.push("login")
    } else {
      return response;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 导出 axios 实例
export default service;
