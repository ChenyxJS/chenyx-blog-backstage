/*
 * @Author: chenyx
 * @Date: 2023-03-01 13:44:35
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-30 03:18:12
 * @FilePath: /backstage-manage/src/router/index.ts
 */
import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router';
import { usePermissionStoreHook } from '@/store/modules/permission';

export const Layout = () => import('@/layout/index.vue');

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: { hidden: true }
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'homepage', affix: true }
      },
      {
        path: '401',
        component: () => import('@/views/error-page/401.vue'),
        meta: { hidden: true }
      }
    ]
  },
  {
    path: '/content',
    component: Layout,
    redirect:'/content/article',
    name: 'Content',
    meta: { title: '内容管理', icon: 'homepage', affix: true },
    children: [
      {
        path: 'tag',
        component: () => import('@/views/content/tag/index.vue'),
        name: 'tag',
        meta: { title: '标签管理', icon: 'homepage', affix: true }
      },
      {
        path: 'article',
        component: () => import('@/views/content/article/index.vue'),
        name: 'Article',
        meta: { title: '文章管理', icon: 'homepage', affix: true }
      },
    ]
  },

];

// 开发环境使用hash 生产环境使用web
const history =
  import.meta.env.PROD
    ? createWebHistory()
    : createWebHashHistory();
// 创建路由
const router = createRouter({
  history: history,
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
});

// 重置路由
export function resetRouter() {
  const permissionStore = usePermissionStoreHook();
  permissionStore.routes.forEach(route => {
    const name = route.name;
    if (name && router.hasRoute(name)) {
      router.removeRoute(name);
    }
  });
}

export default router;
