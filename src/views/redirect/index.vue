<!--
 * @Author: chenyx
 * @Date: 2023-03-01 13:44:35
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-13 16:47:38
 * @FilePath: /backstage-manage/src/views/redirect/index.vue
-->
<template>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const { params, query } = route;
const { path } = params;

router.replace({ path: '/' + path, query });
</script>
