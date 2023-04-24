/*
 * @Author: chenyx
 * @Date: 2022-04-28 21:16:18
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-21 13:12:40
 * @FilePath: /backstage/src/global-components/index.ts
 */
import "zoom-vanilla.js/dist/zoom-vanilla.min.js";
import Chart from "./chart/index.vue";
import GoogleMapLoader from "./google-map-loader/index.vue";
import Tippy from "./tippy/index.vue";
import TippyContent from "./tippy-content/index.vue";
import LoadingIcon from "./loading-icon/index.vue";
import TinySlider from "./tiny-slider/index.vue";
import Notification from "./notification/index.vue";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "./modal";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  DropdownHeader,
  DropdownFooter,
  DropdownDivider,
} from "./dropdown";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "./tab";
import {
  AccordionGroup,
  AccordionItem,
  Accordion,
  AccordionPanel,
} from "./accordion";
import { Alert } from "./alert";
import {
  PreviewComponent,
  Preview,
  Source,
  Highlight,
} from "./preview-component";
import LucideIcons from "./lucide";
import { App } from "vue";

export default (app: App<Element>) => {
  app.component("Chart", Chart);
  app.component("GoogleMapLoader", GoogleMapLoader);
  app.component("Tippy", Tippy);
  app.component("TippyContent", TippyContent);
  app.component("LoadingIcon", LoadingIcon);
  app.component("TinySlider", TinySlider);
  app.component("Notification", Notification);
  app.component("Modal", Modal);
  app.component("ModalHeader", ModalHeader);
  app.component("ModalBody", ModalBody);
  app.component("ModalFooter", ModalFooter);
  app.component("Dropdown", Dropdown);
  app.component("DropdownToggle", DropdownToggle);
  app.component("DropdownMenu", DropdownMenu);
  app.component("DropdownContent", DropdownContent);
  app.component("DropdownItem", DropdownItem);
  app.component("DropdownHeader", DropdownHeader);
  app.component("DropdownFooter", DropdownFooter);
  app.component("DropdownDivider", DropdownDivider);
  app.component("TabGroup", TabGroup);
  app.component("TabList", TabList);
  app.component("Tab", Tab);
  app.component("TabPanels", TabPanels);
  app.component("TabPanel", TabPanel);
  app.component("AccordionGroup", AccordionGroup);
  app.component("AccordionItem", AccordionItem);
  app.component("Accordion", Accordion);
  app.component("AccordionPanel", AccordionPanel);
  app.component("Alert", Alert);
  app.component("PreviewComponent", PreviewComponent);
  app.component("Preview", Preview);
  app.component("Source", Source);
  app.component("Highlight", Highlight);

  for (const [key, icon] of Object.entries(LucideIcons)) {
    app.component(key, icon);
  }
};
