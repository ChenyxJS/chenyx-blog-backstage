import { defineStore } from "pinia";

import { getToken, setToken, removeToken } from "@/utils/auth";
import { loginApi, logoutApi } from "@/api/auth";
import { getUserInfo } from "@/api/user";
import { LoginData } from "@/api/auth/types";
import { ref } from "vue";
import { store } from "@/store";
import { AxiosResponse } from "axios";

export const useUserStore = defineStore("user", () => {
  // state
  const token = ref<string>(getToken() || "");
  let userObject = ref({}) as any;
  const nickname = ref<string>("");
  const avatar = ref<string>("");
  const roles = ref<Array<string>>([]); // 用户角色编码集合 → 判断路由权限
  const perms = ref<Array<string>>([]); // 用户权限编码集合 → 判断按钮权限

  // actions

  // 登录
  function login(loginData: LoginData) {
    return new Promise<void>((resolve, reject) => {
      loginApi(loginData)
        .then((res: AxiosResponse<BaseApiResult>) => {
          const data = res.data as BaseApiResult;
          const { userId, userNickname, userHeadImg } = data.object;
          userObject = data.object;
          setInfo(userNickname, userHeadImg);
          token.value = userId;
          setToken(userId);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // 获取信息(用户昵称、头像、角色集合、权限集合)
  function getInfo() {
    return new Promise<BaseApiResult>((resolve, reject) => {
      getUserInfo()
        .then(({ data }) => {
          const { userId, userNickname, userHeadImg } = data.object;
          userObject = data.object;
          setInfo(userNickname, userHeadImg);
          token.value = userId;
          setToken(userId);
          // roles.value = data.roles;
          // perms.value = data.perms;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // 注销
  function logout() {
    return new Promise<void>((resolve, reject) => {
      logoutApi()
        .then(() => {
          resetToken();
          resolve();
        })
        .catch((error) => {
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
    userObject = {};
    token.value = "";
    nickname.value = "";
    avatar.value = "";
    roles.value = [];
    perms.value = [];
  }
  return {
    userObject,
    token,
    nickname,
    avatar,
    roles,
    perms,
    login,
    getInfo,
    logout,
    resetToken,
  };
});
// 非setup
export function useUserStoreHook() {
  return useUserStore(store);
}
