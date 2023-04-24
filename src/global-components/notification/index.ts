/*
 * @Author: chenyx
 * @Date: 2022-03-18 16:39:30
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-17 22:14:26
 * @FilePath: /backstage/src/global-components/notification/index.ts
 */
import Toastify from "toastify-js";
import dom from "@left4code/tw-starter/dist/js/dom";

const toastifyClass = "_" + Math.random().toString(36).substr(2, 9);

const init = (el:Element, props) => {
  el.showToast = () => {
    const clonedEl = dom(el).clone().removeClass("hidden")[0];
    dom(clonedEl).addClass(toastifyClass);
    clonedEl.toastify = Toastify({
      duration: -1,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      ...props.options,
      node: clonedEl,
    }).showToast();

    dom(clonedEl).on("click", "[data-dismiss='notification']", function () {
      clonedEl.toastify.hideToast();
    });
  };

  el.hideToast = () => {
    dom(`.${toastifyClass}`).each(function () {
      dom(this)[0].toastify.hideToast();
    });
  };
};

const reInit = (el:Element) => {
  dom(`.${toastifyClass}`).html(dom(el).html());
};

export { init, reInit };
