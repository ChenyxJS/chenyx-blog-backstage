/*
 * @Author: chenyx
 * @Date: 2022-01-25 22:39:20
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-18 23:51:21
 * @FilePath: /backstage/src/store/modules/color-scheme.ts
 */
import { defineStore } from "pinia";
import { localStorage } from "@/utils/localStorage";

export const useColorSchemeStore = defineStore("colorScheme", {
  state: () => ({
    colorSchemeValue:
      localStorage.get("colorScheme") === null
        ? "default"
        : localStorage.get("colorScheme"),
  }),
  getters: {
    colorScheme(state) {
      if (localStorage.get("colorScheme") === null) {
        localStorage.set("colorScheme", "default");
      }
      
      return state.colorSchemeValue;
    },
  },
  actions: {
    setColorScheme(colorScheme: string) {
      localStorage.set("colorScheme", colorScheme);
      this.colorSchemeValue = colorScheme;
    },
  },
});
