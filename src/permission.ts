/*
 * @Author: chenyx
 * @Date: 2023-03-01 13:44:35
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-26 20:36:23
 * @FilePath: /backstage-manage/src/permission.ts
 */
import router from '@/router';
import { useUserStoreHook } from '@/store/modules/user';
import { usePermissionStoreHook } from '@/store/modules/permission';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false }); // 进度条

const permissionStore = usePermissionStoreHook();

// 白名单路由
const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const userStore = useUserStoreHook();
  if (userStore.token) {
    // 登录成功，登录页自动跳转到首页
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      // 判断是否已有用户和权限路由信息
      const hasUserInfo = userStore.nickname ? true : false;
      const hasRoles = userStore.roles.length > 0;
      if (hasUserInfo && hasRoles) {
        // 判断跳转的页面路径是否有后缀
        if (to.matched.length === 0) {
          // 若存在该路由则跳转至该页面，否则跳转至401页面
          from.name ? next({ name: from.name as any }) : next('/401');
          NProgress.done();
        } else {
          next();
          NProgress.done();
        }
      } else {
        // 获取用户信息
        await userStore.getInfo();
        // 生成路由
        await permissionStore.generateRoutes();
        // 判断跳转的页面路径是否有后缀
        if (to.matched.length === 0) {
          // 若存在该路由则跳转至该页面，否则跳转至401页面
          from.name ? next({ name: from.name as any }) : next('/401');
          NProgress.done();
        } else {
          next();
          NProgress.done();
        }
      }
    }
  } else {
    // 未登录可以访问白名单页面
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
