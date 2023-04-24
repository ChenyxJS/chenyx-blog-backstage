<!--
 * @Author: chenyx
 * @Date: 2022-01-25 13:03:54
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-21 23:39:56
 * @FilePath: /backstage/src/components/dark-mode-switcher/index.vue
-->
<template>
  <!-- BEGIN: Dark Mode Switcher-->
  <div
    class="dark-mode-switcher intro-x cursor-pointer border rounded-full mr-5"
  >
    <div class="toggleWrapper w-16 h-8">
      <input type="checkbox" :checked="darkMode"  @click="switchMode" class="dn opacity-0" id="dn" />
      <label for="dn" class="toggle w-16 h-8">
        <span class="toggle__handler w-7 h-7">
          <span class="crater crater--1"></span>
          <span class="crater crater--2"></span>
          <span class="crater crater--3"></span>
        </span>
        <span class="star star--1"></span>
        <span class="star star--2"></span>
        <span class="star star--3"></span>
        <span class="star star--4"></span>
        <span class="star star--5"></span>
        <span class="star star--6"></span>
      </label>
    </div>

  </div>

  <!-- END: Dark Mode Switcher-->
</template>

<script setup>
import { computed } from "vue";
import { useDarkModeStore } from "@/store/modules/dark-mode";
import dom from "@left4code/tw-starter/dist/js/dom";

const darkModeStore = useDarkModeStore();
const darkMode = computed(() => darkModeStore.darkMode);

const setDarkModeClass = () => {
  darkMode.value
    ? dom("html").addClass("dark")
    : dom("html").removeClass("dark");
};

const switchMode = () => {
  darkModeStore.setDarkMode(!darkMode.value);
  setDarkModeClass();
};

setDarkModeClass();
</script>
<style lang="scss" scoped>
.toggleWrapper {
  overflow: hidden;
  color: white;
}

.toggleWrapper input {
  position: absolute;
  left: -99em;
}

.toggle {
  cursor: pointer;
  display: inline-block;
  position: relative;
  background-color: #83d8ff;
  border-radius: 84px;
  transition: background-color 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
}



.toggle__handler {
  display: inline-block;
  position: relative;
  z-index: 1;
  top: 2px;
  left: 2px;
  background-color: #ffcf96;
  border-radius: 50px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: all 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform: rotate(-45deg);
}

.toggle__handler .crater {
  position: absolute;
  background-color: #e8cda5;
  opacity: 0;
  transition: opacity 200ms ease-in-out;
  border-radius: 100%;
}

.toggle__handler .crater--1 {
  top: 8px;
  left: 10px;
  width: 4px;
  height: 4px;
}

.toggle__handler .crater--2 {
  top: 18px;
  left: 4px;
  width: 6px;
  height: 6px;
}

.toggle__handler .crater--3 {
  top: 10px;
  left: 15px;
  width: 8px;
  height: 8px;
}

.star {
  position: absolute;
  background-color: #fff;
  transition: all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  border-radius: 50%;
}

.star--1 {
  top: 10px;
  left: 20px;
  z-index: 0;
  width: 30px;
  height: 3px;
}

.star--2 {
  top: 18px;
  left: 28px;
  z-index: 1;
  width: 30px;
  height: 3px;
}

.star--3 {
  top: 27px;
  left: 28px;
  z-index: 0;
  width: 30px;
  height: 3px;
}

.star--4,
.star--5,
.star--6 {
  opacity: 0;
  transition: all 300ms 0 cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

.star--4 {
  top: 16px;
  left: 11px;
  z-index: 0;
  width: 2px;
  height: 2px;
  transform: translate3d(3px, 0, 0);
}

.star--5 {
  top: 32px;
  left: 17px;
  z-index: 0;
  width: 3px;
  height: 3px;
  transform: translate3d(3px, 0, 0);
}

.star--6 {
  top: 36px;
  left: 28px;
  z-index: 0;
  width: 2px;
  height: 2px;
  transform: translate3d(3px, 0, 0);
}

input:checked + .toggle {
  background-color: #749dd6;
}

input:checked + .toggle:before {
  color: #749ed7;
}

input:checked + .toggle:after {
  color: #fff;
}

input:checked + .toggle .toggle__handler {
  background-color: #ffe5b5;
  transform: translate3d(30px, 0, 0) rotate(0);
}

input:checked + .toggle .toggle__handler .crater {
  opacity: 1;
}

input:checked + .toggle .star--1 {
  width: 2px;
  height: 2px;
}

input:checked + .toggle .star--2 {
  width: 4px;
  height: 4px;
  transform: translate3d(-5px, 0, 0);
}

input:checked + .toggle .star--3 {
  width: 2px;
  height: 2px;
  transform: translate3d(-7px, 0, 0);
}

input:checked + .toggle .star--4,
input:checked + .toggle .star--5,
input:checked + .toggle .star--6 {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

input:checked + .toggle .star--4 {
  transition: all 300ms 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

input:checked + .toggle .star--5 {
  transition: all 300ms 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

input:checked + .toggle .star--6 {
  transition: all 300ms 400ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
}
</style>
