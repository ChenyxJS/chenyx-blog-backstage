<!--
 * @Author: chenyx
 * @Date: 2023-04-18 12:14:53
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-18 22:55:05
 * @FilePath: /backstage/src/layout/components/menu/index.vue
-->
<template>
  <ul>
    <!-- BEGIN: First Child -->
    <template v-for="(menu, menuKey) in state.formattedMenu" :key="menuKey">
      <li v-if="menu.type === 'devider'" class="side-nav__devider my-6"></li>
      <li v-else>
        <SideMenuTooltip
          tag="a"
          :content="menu.title"
          :href="menu.children ? 'javascript:;' : menu.pagePath"
          class="side-menu"
          :class="{
            'side-menu--active': menu.active,
            'side-menu--open': menu.activeDropdown,
          }"
          @click="linkTo(menu, router, $event)"
        >
          <div class="side-menu__icon">
            <component :is="menu.icon" />
          </div>
          <div class="side-menu__title">
            {{ menu.title }}
            <div
              v-if="menu.children"
              class="side-menu__sub-icon"
              :class="{ 'transform rotate-180': menu.activeDropdown }"
            >
              <ChevronDownIcon />
            </div>
          </div>
        </SideMenuTooltip>
        <menu-item
          v-if="menu.children && menu.activeDropdown"
          v-for="(subMenu, subMenuKey) in menu.children"
          :menu="subMenu"
          :key="subMenuKey"
        ></menu-item>
      </li>
    </template>
    <!-- END: First Child -->
  </ul>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  reactive,
  onUnmounted,
  provide,
  watch,
} from "vue";
import { helper as $h } from "@/utils/helper";
import { Menu, useMenuStore } from "@/store/modules/menu";
import { useRoute, useRouter } from "vue-router";
import SideMenuTooltip from "@/components/side-menu-tooltip/index.vue";
import MenuItem from "../menu-item/index.vue";
import { linkTo, nestedMenu } from "./index";
import dom from "@left4code/tw-starter/dist/js/dom";

const router = useRouter();
const route = useRoute();
const menuStore = useMenuStore();
const sideMenu = computed(() => nestedMenu(menuStore.menu, route));
const state = reactive({
  formattedMenu: [] as Menu[],
});

provide("forceActiveMenu", (pageName: string) => {
  route.forceActiveMenu = pageName;
  state.formattedMenu = $h.toRaw(sideMenu.value);
});

watch(
  computed(() => route.path),
  () => {
    delete route.forceActiveMenu;
    state.formattedMenu = $h.toRaw(sideMenu.value);
  }
);

onMounted(() => {
  dom("body").addClass("main");
  state.formattedMenu = $h.toRaw(sideMenu.value);
});
onUnmounted(() => {
  dom("body").removeClass("main");
});
</script>

<style></style>
