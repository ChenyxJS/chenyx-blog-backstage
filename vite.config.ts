/*
 * @Author: chenyx
 * @Date: 2022-01-21 18:20:34
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-20 00:50:21
 * @FilePath: /backstage/vite.config.ts
 */
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { ConfigEnv, loadEnv, UserConfig } from "vite";
import path from "path";

export default ({ mode }: ConfigEnv): UserConfig => {
  // 获取 .env 环境配置文件
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    // 本地反向代理解决浏览器跨域限制
    server: {
      // host: '0.0.0.0',
      port: Number(env.VITE_APP_PORT),
      open: true, // 运行自动打开浏览器
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 线上API地址
          // target: "http://www.chenyx.site:8080",
          // 本地API地址
          target: "http://localhost:8080",
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
        },
      },
    },
    resolve: {
      // Vite路径别名配置
      alias: {
        "@": path.resolve("./src"),
      },
    },
  };
};
