/*
 * @Author: chenyx
 * @Date: 2023-03-01 13:44:35
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-28 17:51:37
 * @FilePath: /backstage-manage/vite.config.ts
 */
import vue from '@vitejs/plugin-vue';
import { ConfigEnv, loadEnv, UserConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
// @ts-ignore
import path from 'path';

export default ({ mode }: ConfigEnv): UserConfig => {
  // 获取 .env 环境配置文件
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      })
    ],
    // 本地反向代理解决浏览器跨域限制
    server: {
      // host: '0.0.0.0',
      port: Number(env.VITE_APP_PORT),
      open: true, // 运行自动打开浏览器
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 线上API地址
          // target: 'http://www.chenyx.site:8080',
          // 本地API地址
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
        }
      }
    },
    resolve: {
      // Vite路径别名配置
      alias: {
        '@': path.resolve('./src')
      }
    }
  };
};
