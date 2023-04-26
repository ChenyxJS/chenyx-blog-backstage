<!--
 * @Author: chenyx
 * @Date: 2023-03-01 13:44:35
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-26 17:14:45
 * @FilePath: /backstage-manage/src/layout/components/Sidebar/Link.vue
-->
<script lang="ts" setup>
import { computed } from 'vue';
import { isExternal } from '@/utils/validate';
import { useRouter } from 'vue-router';

import { useAppStore } from '@/store/modules/app';
const appStore = useAppStore();

const sidebar = computed(() => appStore.sidebar);
const device = computed(() => appStore.device);

const props = defineProps({
  to: {
    type: String,
    required: true
  }
});

const router = useRouter();
function push() {
  if (device.value === 'mobile' && sidebar.value.opened == true) {
    appStore.closeSideBar(false);
  }
  router.push(props.to).catch(err => {
    console.error(err);
  });
}
</script>

<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot></slot>
  </a>
  <div v-else @click="push">
    <slot></slot>
  </div>
</template>
