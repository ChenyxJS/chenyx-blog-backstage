import { defineStore } from 'pinia';

import { getToken, setToken, removeToken } from '@/utils/auth';
import { loginApi, logoutApi } from '@/api/auth';
import { getUserInfo } from '@/api/user';
import { resetRouter } from '@/router';
import { store } from '@/store';
import { LoginData } from '@/api/auth/types';
import { ref } from 'vue';
import { AxiosResponse } from 'axios';
import { usePermissionStoreHook } from './permission';

export const useUserStore = defineStore('user', () => {
  // state
  const token = ref<string>(getToken() || '');
  const nickname = ref<string>('');
  const avatar = ref<string>('');
  const roles = ref<Array<string>>([]); // 用户角色编码集合 → 判断路由权限
  const perms = ref<Array<string>>([]); // 用户权限编码集合 → 判断按钮权限

  // actions

  // 登录
  function login(loginData: LoginData) {
    const permissionStore = usePermissionStoreHook();
    return new Promise<void>((resolve, reject) => {
      loginApi(loginData)
        .then((res: AxiosResponse<BaseApiResult>) => {
          const data = res.data as BaseApiResult;
          const { userId, userNickname, userHeadImg } = data.object;
          setInfo(userNickname, userHeadImg);
          roles.value = ['1'];
          token.value = userId;
          setToken(userId);
          permissionStore.generateRoutes();
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // 获取信息(用户昵称、头像、角色集合、权限集合)
  function getInfo() {
    return new Promise<BaseApiResult>((resolve, reject) => {
      getUserInfo()
        .then(({ data }) => {
          const { userNickname, userHeadImg } = data.object;
          nickname.value = userNickname || '';
          avatar.value = userHeadImg || '';
          roles.value = ['1'];
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // 注销
  function logout() {
    return new Promise<void>((resolve, reject) => {
      logoutApi()
        .then(() => {
          resetRouter();
          resetToken();
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // 设置用户信息
  function setInfo(name: string, img: string) {
    nickname.value = name;
    avatar.value = img;
  }

  // 重置
  function resetToken() {
    removeToken();
    token.value = '';
    nickname.value = '';
    avatar.value = '';
    roles.value = [];
    perms.value = [];
  }
  return {
    token,
    nickname,
    avatar,
    roles,
    perms,
    login,
    getInfo,
    logout,
    resetToken
  };
});

// 非setup
export function useUserStoreHook() {
  return useUserStore(store);
}
