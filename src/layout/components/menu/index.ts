/*
 * @Author: chenyx
 * @Date: 2022-02-28 12:32:02
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-18 18:08:33
 * @FilePath: /backstage/src/layout/components/menu/index.ts
 */
import dom from "@left4code/tw-starter/dist/js/dom";
import { Menu } from "@/store/modules/menu";
import { Router } from "vue-router";

// Setup side menu
const findActiveMenu = (children: Menu[], route: any) => {
  let match = false;
  children.forEach((item) => {
    if (
      ((route.forceActiveMenu !== undefined &&
        item.pagePath === route.forceActiveMenu) ||
        (route.forceActiveMenu === undefined &&
          item.pagePath === route.path)) &&
      !item.ignore
    ) {
      match = true;
    } else if (!match && item.children) {
      match = findActiveMenu(item.children, route);
    }
  });
  return match;
};

const nestedMenu = (menu: Menu[], route: any) => {
  menu.forEach((item, key) => {
    if (typeof item !== "string") {
      let menuItem = menu[key];
      menuItem.active =
        ((route.forceActiveMenu !== undefined &&
          item.pagePath === route.forceActiveMenu) ||
          (route.forceActiveMenu === undefined &&
            item.pagePath === route.path) ||
          (item.children && findActiveMenu(item.children, route))) &&
        !item.ignore;

      if (item.children) {
        menuItem.activeDropdown = findActiveMenu(item.children, route);
        menuItem = {
          ...item,
          ...nestedMenu(item.children, route),
        };
      }
    }
  });
  return menu;
};

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

export { nestedMenu, linkTo, enter, leave };
