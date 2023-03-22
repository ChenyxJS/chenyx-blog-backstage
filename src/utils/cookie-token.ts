/*
 * @Author: chenyx
 * @Date: 2023-03-01 22:02:16
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-01 22:02:40
 * @FilePath: /backstage-manage/src/utils/cookie-token.ts
 */
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token:string) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
