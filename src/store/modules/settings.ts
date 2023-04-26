/*
 * @Author: chenyx
 * @Date: 2023-03-01 13:44:35
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-26 17:12:31
 * @FilePath: /backstage-manage/src/store/modules/settings.ts
 */
import { defineStore } from 'pinia';
import defaultSettings from '../../settings';
import { ref } from 'vue';
import { useStorage } from '@vueuse/core';

/**
 * 主题类型
 */
export enum ThemeType {
  light,
  dark
}

/**
 * 布局类型
 */
export enum LayoutType {
  left,
  top,
  mix
}

export const useSettingsStore = defineStore('setting', () => {
  // state
  const title = ref<string>(defaultSettings.title);
  const showSettings = ref<boolean>(defaultSettings.showSettings);
  const tagsView = useStorage<boolean>('tagsView', defaultSettings.tagsView);
  const fixedHeader = ref<boolean>(defaultSettings.fixedHeader);
  const sidebarLogo = ref<boolean>(defaultSettings.sidebarLogo);

  const layout = useStorage<string>('layout', defaultSettings.layout);

  // actions
  function changeSetting(param: { key: string; value: any }) {
    const { key, value } = param;
    switch (key) {
      case 'showSettings':
        showSettings.value = value;
        break;
      case 'fixedHeader':
        fixedHeader.value = value;
        break;
      case 'tagsView':
        tagsView.value = value;
        break;
      case 'sidevarLogo':
        sidebarLogo.value = value;
        break;
      case 'layout':
        layout.value = value;
        break;
      default:
        break;
    }
  }

  return {
    title,
    showSettings,
    tagsView,
    fixedHeader,
    sidebarLogo,
    layout,
    changeSetting
  };
});
