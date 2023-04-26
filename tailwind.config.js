/*
 * @Author: chenyx
 * @Date: 2023-03-01 13:44:35
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-18 00:28:14
 * @FilePath: /backstage-manage/tailwind.config.js
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      "sidebar-logo":'#2b2f3a'
    })
  },
  plugins: [],


}
