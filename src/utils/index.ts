/*
 * @Author: chenyx
 * @Date: 2022-01-24 15:41:42
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-21 13:26:28
 * @FilePath: /backstage/src/utils/index.ts
 */
import helper from "./helper";
import lodash from "./lodash";
import colors from "./colors";
import { App } from "vue";

export default (app: App<Element>) => {
  app.use(helper);
  app.use(lodash);
  app.use(colors);
};
