<!--
 * @Author: chenyx
 * @Date: 2022-04-09 01:23:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-19 22:02:38
 * @FilePath: /backstage/src/global-components/tippy/index.vue
-->
<template>
  <component :is="tag" ref="tippyRef">
    <slot></slot>
  </component>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from "vue";
import tippy, { roundArrow, animateFill } from "tippy.js";

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "span",
  },
  options: {
    type: Object,
    default: () => ({}),
  },
  refKey: {
    type: String,
    default: null,
  },
});

const tippyRef = ref();
const init = () => {
  tippy(tippyRef.value, {
    plugins: [animateFill],
    content: props.content,
    arrow: roundArrow,
    popperOptions: {
      modifiers: [
        {
          name: "preventOverflow",
          options: {
            rootBoundary: "viewport",
          },
        },
      ],
    },
    animateFill: false,
    animation: "shift-away",
    ...props.options,
  });
};

const bindInstance = () => {
  if (props.refKey) {
    const bind = inject(`bind[${props.refKey}]`);
    if (bind) {
      bind(tippyRef.value);
    }
  }
};

onMounted(() => {
  init();
  bindInstance();
});
onUnmounted(()=>{
  
})
</script>
