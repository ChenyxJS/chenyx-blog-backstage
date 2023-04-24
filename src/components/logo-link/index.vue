<!--
 * @Author: chenyx
 * @Date: 2023-04-18 11:50:39
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-18 22:28:25
 * @FilePath: /backstage/src/components/logo-link/index.vue
-->
<template>
  <router-link
    :to="{ name: 'Dashboard' }"
    tag="a"
    class="intro-x flex items-center pl-5 pt-4"
  >
    <img
      alt="Midone Tailwind HTML Admin Template"
      class="w-6"
      src="@/assets/images/logo.svg"
    />
    <span class="hidden xl:block text-white text-lg ml-3">
      {{ settings.title }}
    </span>
  </router-link>
</template>

<script setup lang="ts">
import { settings } from "@/setting";
</script>
