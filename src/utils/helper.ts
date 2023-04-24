import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { App } from "vue";

dayjs.extend(duration);

const helpers = {
  /**
   * @description: 裁切文本
   * @param {string} text
   * @param {number} length
   * @return {*}
   */
  cutText(text: string, length: number) {
    if (text.split(" ").length > 1) {
      const string = text.substring(0, length);
      const splitText = string.split(" ");
      splitText.pop();
      return splitText.join(" ") + "...";
    } else {
      return text;
    }
  },
  formatDate(date: string | number | Date, format?: string) {
    const formatStr = format ? format : "YYYY-MM-DD HH:mm:ss";
    return dayjs(date).format(formatStr);
  },
  /**
   * @description: 首字母大写
   * @param {string} string
   * @example string => String
   * @return {*}
   */
  capitalizeFirstLetter(str: string) {
    if (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
      return "";
    }
  },
  onlyNumber(string: string) {
    if (string) {
      return string.replace(/\D/g, "");
    } else {
      return "";
    }
  },
  /**
   * @description: 格式货币
   * @param {number} number
   * @return {*}
   */
  formatCurrency(number: number) {
    if (number) {
      const formattedNumber = number.toString().replace(/\D/g, "");
      const rest = formattedNumber.length % 3;
      let currency = formattedNumber.substr(0, rest);
      const thousand = formattedNumber.substr(rest).match(/\d{3}/g);
      let separator;

      if (thousand) {
        separator = rest ? "." : "";
        currency += separator + thousand.join(".");
      }

      return currency;
    } else {
      return "";
    }
  },
  /**
   * @description:
   * @param {string} time
   * @return {*}
   */
  timeAgo(time: string) {
    const date = new Date(
      (time || "").replace(/-/g, "/").replace(/[TZ]/g, " ")
    );
    const diff = (new Date().getTime() - date.getTime()) / 1000;
    const dayDiff = Math.floor(diff / 86400);

    if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) {
      return dayjs(time).format("MMMM DD, YYYY");
    }

    return (
      (dayDiff === 0 &&
        ((diff < 60 && "just now") ||
          (diff < 120 && "1 minute ago") ||
          (diff < 3600 && Math.floor(diff / 60) + " minutes ago") ||
          (diff < 7200 && "1 hour ago") ||
          (diff < 86400 && Math.floor(diff / 3600) + " hours ago"))) ||
      (dayDiff === 1 && "Yesterday") ||
      (dayDiff < 7 && dayDiff + " days ago") ||
      (dayDiff < 31 && Math.ceil(dayDiff / 7) + " weeks ago")
    );
  },
  /**
   * @description: 计算至今的时间差
   * @param {string} time
   * @return {*}
   */
  diffTimeByNow(time: string | number) {
    const startDate = dayjs(dayjs().format("YYYY-MM-DD HH:mm:ss").toString());
    const endDate = dayjs(dayjs(time).format("YYYY-MM-DD HH:mm:ss").toString());

    const duration = dayjs.duration(endDate.diff(startDate));
    const milliseconds = Math.floor(duration.asMilliseconds());

    const days = Math.round(milliseconds / 86400000);
    const hours = Math.round((milliseconds % 86400000) / 3600000);
    let minutes = Math.round(((milliseconds % 86400000) % 3600000) / 60000);
    const seconds = Math.round(
      (((milliseconds % 86400000) % 3600000) % 60000) / 1000
    );

    if (seconds < 30 && seconds >= 0) {
      minutes += 1;
    }

    return {
      days: days.toString().length < 2 ? "0" + days : days,
      hours: hours.toString().length < 2 ? "0" + hours : hours,
      minutes: minutes.toString().length < 2 ? "0" + minutes : minutes,
      seconds: seconds.toString().length < 2 ? "0" + seconds : seconds,
    };
  },
  /**
   * @description: 判断对象
   * @param {any} obj
   * @return {*}
   */
  isset(obj: any) {
    if (obj !== null && obj !== undefined) {
      if (typeof obj === "object" || Array.isArray(obj)) {
        return Object.keys(obj).length;
      } else {
        return obj.toString().length;
      }
    }
    return false;
  },
  /**
   * @description: 简单深拷贝（无方法属性）
   * @param {*} obj
   * @return {*}
   */
  toRaw(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  },

  /**
   * @description: 随机数
   * @param {number} from
   * @param {number} to
   * @param {number} length
   * @return {*}
   */
  randomNumbers(from: number, to: number, length: number) {
    const numbers = [0];
    for (let i = 1; i < length; i++) {
      numbers.push(Math.ceil(Math.random() * (from - to) + to));
    }
    return numbers;
  },
  toRGB(colors: any) {
    const tempColors = Object.assign({}, colors);
    const rgbColors = Object.entries(tempColors);
    for (const [key, value] of rgbColors) {
      if (typeof value === "string") {
        if (value.replace("#", "").length == 6) {
          const aRgbHex = value.replace("#", "").match(/.{1,2}/g);
          if (aRgbHex) {
            tempColors[key] = (opacity = 1) =>
              `rgb(${parseInt(aRgbHex[0], 16)} ${parseInt(
                aRgbHex[1],
                16
              )} ${parseInt(aRgbHex[2], 16)} / ${opacity})`;
          }
        }
      } else {
        tempColors[key] = helpers.toRGB(value);
      }
    }
    return tempColors;
  },

  /**
   * @description: 文件大小单位转换
   * @param {number} size
   * @return {*}
   */
  sizeTostr(size?: number) {
    if (!size) return "0KB";
    var data = "";
    if (size < 0.1 * 1024) {
      //如果小于0.1KB转化成B
      data = size.toFixed(2) + "B";
    } else if (size < 0.1 * 1024 * 1024) {
      //如果小于0.1MB转化成KB
      data = (size / 1024).toFixed(2) + "KB";
    } else if (size < 0.1 * 1024 * 1024 * 1024) {
      //如果小于0.1GB转化成MB
      data = (size / (1024 * 1024)).toFixed(2) + "MB";
    } else {
      //其他转化成GB
      data = (size / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    }
    var sizestr = data + "";
    var len = sizestr.indexOf(".");
    var dec = sizestr.substr(len + 1, 2);
    if (dec == "00") {
      //当小数点后为00时 去掉小数部分
      return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
    }
    return sizestr;
  },
};

const install = (app: App<Element>) => {
  app.config.globalProperties.$h = helpers;
};

export { install as default, helpers as helper };
