/*
 * @Author: chenyx
 * @Date: 2023-04-17 15:58:48
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-21 23:08:12
 * @FilePath: /backstage/src/permission.ts
 */
import router from "@/router";
import { useMenuStoreHook } from "@/store/modules/menu";
import { useUserStoreHook } from "@/store/modules/user";
import { usePermissionStore } from "./store/modules/permission";

// 白名单路由
const whiteList = ["/login"];

const userStore = useUserStoreHook();
const menuStore = useMenuStoreHook();
const permissionStore = usePermissionStore();

router.beforeEach(async (to, from, next) => {
  // 判断是否已经登录
  if (userStore.token) {
    // 判断要跳转的路径
    if (to.path === "/login") {
      next();
    } else {
      const hasPermission =
        permissionStore.routes && permissionStore.routes.length > 0;
      // 判断路由是否已经生成
      if (hasPermission && userStore.nickname != "") {
        next();
      } else {
        // 如果不符合条件，说明页面刷新了
        // 重新获取登录人员信息
        // 重新获取登录人员的角色列表
        // 重新根据登录的roleId获取该角色的菜单权限
        await userStore.getInfo();
        await permissionStore.generateRoutes()
        next({ ...to, replace: true });
      }
    }
  } else {
    // 未登录可以访问白名单页面
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});

router.afterEach(() => {});
