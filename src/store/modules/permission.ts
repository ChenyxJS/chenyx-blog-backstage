/*
 * @Author: chenyx
 * @Date: 2023-03-01 13:44:35
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-21 23:14:19
 * @FilePath: /backstage/src/store/modules/permission.ts
 */
import { RouteRecordRaw } from "vue-router";
import { defineStore } from "pinia";
import router, { constantRoutes } from "@/router";
import { ref } from "vue";

const modules = import.meta.glob("../../views/**/**.vue");
export const Layout = () => import("@/layout/index.vue");

const premissionRoute = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index.vue"),
      },
      {
        path: "/article",
        name: "Article",
        component: () => import("@/views/article/index.vue"),
      },
      {
        path: "/profile",
        name: "Profile",
        component: () => import("@/views/update-profile/index.vue"),
      },
    ],
  },
];

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    if (roles.includes("ROOT")) {
      return true;
    }
    return roles.some((role) => {
      if (route.meta?.roles !== undefined) {
        return (route.meta.roles as string[]).includes(role);
      }
    });
  }
  return false;
};

const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const res: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    const tmp = { ...route } as any;
    if (hasPermission(roles, tmp)) {
      if (tmp.component == "Layout") {
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
export const usePermissionStore = defineStore("permission", () => {
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
      setRoutes(premissionRoute);
      premissionRoute.forEach((item) => {
        router.addRoute(item);
      });
      resolve(premissionRoute);
      // listRoutes()
      //   .then((response) => {
      //     const asyncRoutes = response.data;
      //     const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      //     setRoutes(accessedRoutes);
      //     resolve(accessedRoutes);
      //   })
      //   .catch((error) => {
      //     reject(error);
      //   });
    });
  }
  return { routes, setRoutes, generateRoutes };
});
