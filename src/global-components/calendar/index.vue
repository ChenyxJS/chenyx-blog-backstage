<!--
 * @Author: chenyx
 * @Date: 2022-01-25 14:31:10
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-17 17:04:34
 * @FilePath: /backstage/src/global-components/calendar/index.vue
-->
<template>
  <div ref="calendarRef" class="full-calendar"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Calendar } from "@fullcalendar/core";

const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
});

const calendarRef = ref();
const init = () => {
  const calendar = new Calendar(calendarRef.value, props.options);
  calendar.render();
};

onMounted(() => {
  init();
});
</script>
