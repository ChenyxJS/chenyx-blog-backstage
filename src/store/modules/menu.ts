/*
 * @Author: chenyx
 * @Date: 2022-04-28 20:46:36
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-21 22:43:17
 * @FilePath: /backstage/src/store/modules/menu.ts
 */
import { defineStore } from "pinia";
import { store } from "@/store/index";

export interface Menu {
  icon: string;
  pagePath: string;
  title: string;
  ignore: boolean;
  type: string;
  active: boolean;
  activeDropdown: boolean;
  children: Menu[];
}

export const useMenuStore = defineStore("Menu", {
  state: () => ({
    menu: [
      {
        icon: "HomeIcon",
        pagePath: "/dashboard",
        title: "Dashboard",
      },
      {
        icon: "BookOpenIcon",
        pagePath: "/article",
        title: "Article",
      },
    ] as Menu[],
    routeList: [],
  }),
  actions: {},
});
// 非setup
export function useMenuStoreHook() {
  return useMenuStore(store);
}
