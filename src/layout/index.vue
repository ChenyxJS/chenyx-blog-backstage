<!--
 * @Author: chenyx
 * @Date: 2022-05-20 04:03:30
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-21 13:33:20
 * @FilePath: /backstage/src/layout/index.vue
-->
<!--
 * @Author: chenyx
 * @Date: 2022-05-20 04:03:30
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-18 11:51:47
 * @FilePath: /backstage/src/layout/index.vue
-->
<template>
  <div class="py-2">
    <!-- <MainColorSwitcher /> -->
    <MobileMenu />
    <div class="flex mt-[4.7rem] md:mt-0">
      <!-- BEGIN: Side Menu -->
      <nav class="side-nav">
        <LogoLink />
        <div class="side-nav__devider my-6"></div>
        <Menu></Menu>
      </nav>
      <!-- END: Side Menu -->
      <!-- BEGIN: Content -->
      <div class="content">
        <TopBar />
        <router-view />
      </div>
      <!-- END: Content -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import Menu from "./components/menu/index.vue";
import LogoLink from "@/components/logo-link/index.vue";
import TopBar from "@/components/top-bar/index.vue";
import MobileMenu from "@/components/mobile-menu/index.vue";
</script>
