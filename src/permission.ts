import router from '@/router';
import { RouteRecordRaw } from 'vue-router';
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
    // 登录成功，跳转到首页
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      // const { roles } = await userStore.getInfo();
      const accessRoutes: RouteRecordRaw[] = permissionStore.generateRoutes();
      accessRoutes.forEach((route: any) => {
        router.addRoute(route);
      });
      // next({ ...to, replace: true });

      // 判断跳转的页面路径是否有后缀
      if (to.matched.length === 0) {
        // 若存在该路由则跳转至该页面，否则跳转至401页面
        from.name ? next({ name: from.name as any }) : next('/401');
      } else {
        next();
      }

      // // 判断该用户是否已经角色权限信息(用不到权限，暂时弃用)
      // const hasGetUserInfo = userStore.roles.length > 0;

      // if (hasGetUserInfo) {
      //   // 判断跳转的页面路径是否有后缀
      //   if (to.matched.length === 0) {
      //     // 若存在该路由则跳转至该页面，否则跳转至401页面
      //     from.name ? next({ name: from.name as any }) : next('/401');
      //   } else {
      //     next();
      //   }
      // } else {
      //   try {
      //     // 获取角色信息并生成对应的权限路由
      //     const { roles } = await userStore.getInfo();
      //     const accessRoutes: RouteRecordRaw[] =
      //       await permissionStore.generateRoutes(roles);
      //     accessRoutes.forEach((route: any) => {
      //       router.addRoute(route);
      //     });
      //     next({ ...to, replace: true });
      //   } catch (error) {
      //     // 移除 token 并跳转登录页
      //     await userStore.resetToken();
      //     next(`/login?redirect=${to.path}`);
      //     NProgress.done();
      //   }
      // }
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
