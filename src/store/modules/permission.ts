/*
 * @Author: chenyx
 * @Date: 2023-03-01 13:44:35
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-26 18:32:22
 * @FilePath: /backstage-manage/src/store/modules/permission.ts
 */
import { RouteRecordRaw } from 'vue-router';
import { defineStore } from 'pinia';
import router, { constantRoutes } from '@/router';
import { store } from '@/store';
import { ref } from 'vue';

const modules = import.meta.glob('../../views/**/**.vue');
export const Layout = () => import('@/layout/index.vue');

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    if (roles.includes('ROOT')) {
      return true;
    }
    return roles.some(role => {
      if (route.meta?.roles !== undefined) {
        return (route.meta.roles as string[]).includes(role);
      }
    });
  }
  return false;
};

const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const res: RouteRecordRaw[] = [];
  routes.forEach(route => {
    const tmp = { ...route } as any;
    if (hasPermission(roles, tmp)) {
      if (tmp.component == 'Layout') {
        tmp.component = Layout;
      } else {
        const component = modules[`../../views/${tmp.component}.vue`] as any;
        if (component) {
          tmp.component = component;
        } else {
          tmp.component = modules[`../../views/error-page/404.vue`];
        }
      }
      res.push(tmp);

      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
    }
  });
  return res;
};

// setup
export const usePermissionStore = defineStore('permission', () => {
  // state
  const routes = ref<RouteRecordRaw[]>([]);
  const addRoutes = ref<RouteRecordRaw[]>([]);

  // actions
  function setRoutes(newRoutes: RouteRecordRaw[]) {
    addRoutes.value = newRoutes;
    routes.value = constantRoutes.concat(newRoutes);
  }

  function generateRoutes() {
    return new Promise<RouteRecordRaw[]>((resolve, reject) => {
      setRoutes([]);
      constantRoutes.forEach((route: RouteRecordRaw) => {
        router.addRoute(route);
      });
      resolve(constantRoutes);
    });
  }

  // function generateRoutes(roles: string[]) {
  //   return new Promise<RouteRecordRaw[]>((resolve, reject) => {
  //     listRoutes()
  //       .then(response => {
  //         const asyncRoutes = response.data;
  //         const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
  //         setRoutes(accessedRoutes);
  //         resolve(accessedRoutes);
  //       })
  //       .catch(error => {
  //         reject(error);
  //       });
  //   });
  // }
  return { routes, setRoutes, generateRoutes };
});

// 非setup
export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
