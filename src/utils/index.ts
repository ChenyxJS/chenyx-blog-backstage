/*
 * @Author: chenyx
 * @Date: 2023-03-01 13:44:35
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-25 21:27:32
 * @FilePath: /backstage-manage/src/utils/index.ts
 */
/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele: HTMLElement, cls: string) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele: HTMLElement, cls: string) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls;
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele: HTMLElement, cls: string) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
}

export function mix(color1: string, color2: string, weight: number) {
  weight = Math.max(Math.min(Number(weight), 1), 0);
  const r1 = parseInt(color1.substring(1, 3), 16);
  const g1 = parseInt(color1.substring(3, 5), 16);
  const b1 = parseInt(color1.substring(5, 7), 16);
  const r2 = parseInt(color2.substring(1, 3), 16);
  const g2 = parseInt(color2.substring(3, 5), 16);
  const b2 = parseInt(color2.substring(5, 7), 16);
  const r = Math.round(r1 * (1 - weight) + r2 * weight);
  const g = Math.round(g1 * (1 - weight) + g2 * weight);
  const b = Math.round(b1 * (1 - weight) + b2 * weight);
  const rStr = ('0' + (r || 0).toString(16)).slice(-2);
  const gStr = ('0' + (g || 0).toString(16)).slice(-2);
  const bStr = ('0' + (b || 0).toString(16)).slice(-2);
  return '#' + rStr + gStr + bStr;
}

/**
 * @Descripttion: 格式化时间
 * @msg:
 * @param {Date} num
 * @param {String} format
 * @return {*}
 */
export function formatDate(num: string, format?: string) :string {
  format = format || "yyyy-MM-dd hh:mm:ss"; //格式参数不填时，使用默认格式
  let ret, date, renum;
  // 处理时间戳，js一般获取的时间戳是13位，PHP一般是10位,根据实际情况做判断处理
  if (num.toString().length == 10) {
    date = new Date(parseInt(num) * 1000);
  } else {
    date = new Date(parseInt(num));
  }
  const opt:any = {
    y: date.getFullYear().toString(), // 年
    M: (date.getMonth() + 1).toString(), // 月
    d: date.getDate().toString(), // 日
    h: date.getHours().toString(), // 时
    m: date.getMinutes().toString(), // 分
    s: date.getSeconds().toString(), // 秒
    // 目前用的是这六种符号,有其他格式化字符需求可以继续添加，值必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + "+)").exec(format);
    if (ret) {
      renum = ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"); //根据复数前面是否补零,如“mm”补零，单“m”前面不补零
      format = format.replace(ret[1], renum); //替换
    }
  }
  return format;
}