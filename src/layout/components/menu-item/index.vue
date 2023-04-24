<template>
  <transition @enter="enter" @leave="leave">
    <ul>
      <li>
        <SideMenuTooltip
          tag="a"
          :content="state.menu.title"
          :href="state.menu.children ? 'javascript:;' : state.menu.pagePath"
          class="side-menu"
          :class="{ 'side-menu--active': state.menu.active }"
          @click="linkTo(state.menu, router, $event)"
        >
          <div class="side-menu__icon">
            <ActivityIcon />
          </div>
          <div class="side-menu__title">
            {{ state.menu.title }}
            <div
              v-if="state.menu.children"
              class="side-menu__sub-icon"
              :class="{
                'transform rotate-180': state.menu.activeDropdown,
              }"
            >
              <ChevronDownIcon />
            </div>
          </div>
        </SideMenuTooltip>
        <menu-item
          v-if="state.menu.children && state.menu.activeDropdown"
          v-for="(subMenu, subMenuKey) in state.menu.children"
          :menu="subMenu"
          :key="subMenuKey"
        ></menu-item>
      </li>
    </ul>
  </transition>
</template>

<script setup lang="ts">
import MenuItem from "./index.vue";
import { Menu } from "@/store/modules/menu";
import { linkTo, enter, leave } from "./index";
import { useRouter } from "vue-router";
import { reactive } from "vue";
import SideMenuTooltip from "@/components/side-menu-tooltip/index.vue";


interface Props {
  menu: Menu;
}
const props = defineProps({
  menu: {
    type: Object,
    default: {} as Menu,
  },
});
const state = reactive({
  menu: props.menu as Menu,
});
const router = useRouter();
</script>
