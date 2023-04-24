<!--
 * @Author: chenyx
 * @Date: 2023-04-19 19:08:15
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-19 20:40:13
 * @FilePath: /backstage/src/components/pagination/index.vue
-->
<template>
  <div
    class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center"
  >
    <nav class="w-full sm:w-auto sm:mr-auto">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link">
            <ChevronsLeftIcon class="w-4 h-4" />
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" @click="pre_page">
            <ChevronLeftIcon class="w-4 h-4" />
          </a>
        </li>
        <li
          class="page-item"
          :class="{ active: index == state.currentPage }"
          v-for="index in pages"
        >
          <a class="page-link" @click="current_change(index)">{{ index }}</a>
        </li>
        <li class="page-item">
          <a class="page-link" @click="next_page">
            <ChevronRightIcon class="w-4 h-4" />
          </a>
        </li>
        <li class="page-item">
          <a class="page-link">
            <ChevronsRightIcon class="w-4 h-4" />
          </a>
        </li>
      </ul>
    </nav>
    <select v-model="state.pageSize" class="w-20 form-select box mt-3 sm:mt-0">
      <option :value="10">10</option>
      <option :value="25">25</option>
      <option :value="35">35</option>
      <option :value="50">50</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { reactive } from "vue";

const emit = defineEmits(["current-change", "size-change"]);

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  total: {
    type: Number,
    default: 0,
  },
});

const state = reactive({
  currentPage: props.currentPage,
  pageSize: props.pageSize,
  total: props.total,
});
const pages = computed(() => {
  return Math.ceil(state.total / state.pageSize);
});
watch(
  () => props.total,
  (newVal, oldVal) => {
    state.total = newVal;
  }
);
watch(
  () => state.pageSize,
  (newVal, oldVal) => {
    // pageSize改变时，将currentPage改成第一页
    state.currentPage = 1;
    emit("size-change", 1, newVal);
  }
);
function current_change(current: number) {
  state.currentPage = current;
  emit("current-change", current);
}
function next_page() {
  if (state.currentPage < pages.value) current_change(state.currentPage + 1);
}
function pre_page() {
  if (state.currentPage > 1) current_change(state.currentPage - 1);
}
</script>

<style></style>
