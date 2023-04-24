/*
 * @Author: chenyx
 * @Date: 2022-02-28 12:32:02
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-18 17:01:51
 * @FilePath: /backstage/src/layout/components/menu/index.ts
 */
import dom from "@left4code/tw-starter/dist/js/dom";
import { Menu } from "@/store/modules/menu";
import { Router } from "vue-router";

const linkTo = (menu: Menu, router: Router, event: Event) => {
  if (menu.children) {
    menu.activeDropdown = !menu.activeDropdown;
  } else {
    event.preventDefault();
    router.push({
      path: menu.pagePath,
    });
  }
};

const enter = (el: Element, done: any) => {
  dom(el).slideDown(300);
};

const leave = (el: Element, done: any) => {
  dom(el).slideUp(300);
};

export { linkTo, enter, leave };
