/*
 * @Author: chenyx
 * @Date: 2022-01-22 14:11:42
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-18 23:56:43
 * @FilePath: /backstage/src/store/modules/dark-mode.ts
 */
import { defineStore } from "pinia";
import { localStorage } from "@/utils/localStorage";

export const useDarkModeStore = defineStore("darkMode", {
  state: () => ({
    darkModeValue: localStorage.get("darkMode") === true,
  }),
  getters: {
    darkMode(state) {
      if (localStorage.get("darkMode") === null) {
        localStorage.set("darkMode", false);
      }
      return state.darkModeValue;
    },
  },
  actions: {
    setDarkMode(darkMode: boolean) {
      localStorage.set("darkMode", darkMode);
      this.darkModeValue = darkMode;
    },
  },
});
