/*
 * @Author: chenyx
 * @Date: 2022-03-02 20:11:12
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-19 12:49:09
 * @FilePath: /backstage/src/global-components/lucide/index.ts
 */
import { h, defineComponent } from "vue";
import * as lucideIcons from "lucide-vue-next";

const icons = [];
for (const [key, icon] of Object.entries(lucideIcons)) {
  icons[`${key}Icon`] = defineComponent({
    name: `${key}Icon`,
    setup(props, { slots, attrs, emit }) {
      return () =>
        h(icon, {
          class: "lucide",
        });
    },
  });
}

export default icons;
