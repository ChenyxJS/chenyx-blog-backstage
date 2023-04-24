<!--
 * @Author: chenyx
 * @Date: 2023-04-20 17:50:15
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-24 11:32:54
 * @FilePath: /backstage/src/components/date-picker/index.vue
-->
<template>
  <div class="json-time-picker">
    <div @click="handleClick" class="input-group">
      <div class="input-group-text">
        <el-date-picker
          ref="picker"
          style="
            z-index: -1;
            width: 0;
            height: 0;
            left: 50%;
            top: 100%;
            position: absolute;
            opacity: 0;
          "
          v-model="_Value"
          type="datetime"
          @change="handleChange"
          :value-format="valueFormat"
        >
        </el-date-picker>
        <CalendarIcon class="w-4 h-4 mr-2" />
      </div>
      <input
        readonly
        v-model="state.showTimeStr"
        type="text"
        class="form-control input"
        placeholder="请选择日期"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { helper } from "@/utils/helper";
import {
  ComponentInternalInstance,
  computed,
  getCurrentInstance,
  reactive,
  ref,
  watch,
} from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  valueFormat: {
    type: String,
    default: "yyyy-MM-dd",
  },
  modelValue: {
    type: String,
    default: "",
  },
});
const state = reactive({
  showTimeStr: props.modelValue ? helper.formatDate(props.modelValue) : "",
  value: "",
});

watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    if (oldValue != newValue) {
      state.showTimeStr = newValue ? helper.formatDate(newValue) : "";
    }
  }
);

const _Value = computed({
  get(): string {
    return props.modelValue;
  },
  set(v: string) {
    emit("update:modelValue", v);
  },
});

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const picker = ref();

function handleClick() {
  const dom: any = proxy?.$refs.picker;
  dom.handleOpen();
}
function handleChange(value: any) {
  state.showTimeStr = value;
}
</script>

<style scoped>
.input {
  @apply bg-white cursor-pointer;
}
</style>
