import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";

export const constantRoutes = [
  {
    path: "/redirect",
    name: "redirect",
    component: () => import("@/views/redirect/index.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error-page/404.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
] as RouteRecordRaw[];

// 开发环境使用hash 生产环境使用web
const history = import.meta.env.PROD
  ? createWebHistory()
  : createWebHashHistory();
  
const router = createRouter ({
  history,
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

export default router;
