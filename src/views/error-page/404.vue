<!--
 * @Author: chenyx
 * @Date: 2023-04-18 15:08:25
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-21 13:27:51
 * @FilePath: /backstage/src/views/error-page/404.vue
-->
<template>
  <div>
    <div class="container">
      <!-- BEGIN: Error Page -->
      <div
        class="error-page flex flex-col lg:flex-row items-center justify-center h-screen text-center lg:text-left"
      >
        <div class="-intro-x lg:mr-20">
          <img
            alt="Midone Tailwind HTML Admin Template"
            class="h-48 lg:h-auto"
            src="@/assets/images/error-illustration.svg"
          />
        </div>
        <div class="text-white mt-10 lg:mt-0">
          <div class="intro-x text-8xl font-medium">404</div>
          <div class="intro-x text-xl lg:text-3xl font-medium mt-5">
            Oops. This page has gone missing.
          </div>
          <div class="intro-x text-lg mt-3">
            You may have mistyped the address or the page may have moved.
          </div>
          <button
            @click="backHome"
            class="intro-x btn py-3 px-4 text-white border-white dark:border-darkmode-400 dark:text-slate-200 mt-10"
          >
            Back to Home
          </button>
        </div>
      </div>
      <!-- END: Error Page -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
import dom from "@left4code/tw-starter/dist/js/dom";
import router from "@/router";

onMounted(() => {
  dom("body").addClass("error-page");
});
onUnmounted(() => {
  dom("body").removeClass("error-page");
});

function backHome() {
  router.push({ path: "/" });
}
</script>
