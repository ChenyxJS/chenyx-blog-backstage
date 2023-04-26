<!--
 * @Author: chenyx
 * @Date: 2023-04-26 20:43:05
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-26 23:07:43
 * @FilePath: /backstage-manage/src/components/JsonForm/index.vue
-->
<template>
  <!-- BEGIN: Validation Form -->
  <el-form
    :model="state.hook.model"
    ref="formRef"
    label-width="auto"
    :rules="state.hook.rules"
    style="display: flex; flex-wrap: wrap"
  >
    <el-form-item
      v-for="(item, index) in state.hook.fieldOptions"
      v-show="item.type !== FieldType.hidden"
      :key="index"
      :required="item.required"
      :label="item.label"
      :prop="item.prop"
      :rules="item.rule"
      style="width: 100%"
    >
      <el-input
        v-if="item.type === FieldType.input"
        v-model="state.hook.model[item.prop]"
        type="text"
        :placeholder="item.placeholder"
      />

      <el-select
        v-else-if="item.type === FieldType.select"
        v-model="state.hook.model[item.prop]"
      >
        <el-option
          v-for="o in item.typeOptions"
          :key="o.value"
          :value="o.value"
          :label="o.label"
        />
      </el-select>

      <!-- <single-upload
        v-else-if="item.type === FieldType.upload"
        v-model="state.hook.model[item.prop]"
      ></single-upload> -->

      <el-date-picker
        v-else-if="item.type === FieldType.time"
        v-model="state.hook.model[item.prop]"
        type="datetime"
        value-format="YYYY-MM-DD HH:mm:ss"
        placeholder="请选择时间"
      />
    </el-form-item>
  </el-form>
  <!-- END: Validation Form -->
</template>

<script setup lang="ts">
import { PropType, onMounted, reactive, ref, watch } from 'vue';
import { useFormHook } from './form-hook';
import { FormInstance } from 'element-plus';
import { JsonFormResult, FieldType, JsonFormOptions } from './types';

const props = defineProps({
  options: {
    type: Object as PropType<JsonFormOptions>,
    default: {} as JsonFormOptions
  }
});

const formRef = ref<FormInstance>();

let state = reactive({
  hook: {} as JsonFormResult
});

onMounted(() => {
  initHooks(props.options);
});

watch(
  () => props.options,
  (newValue, oldValue) => {
    initHooks(newValue);
  }
);

/**
 * @description: 初始化hook
 * @return {*}
 */
function initHooks(options: JsonFormOptions) {
  state.hook = useFormHook(options);
}

function getHook() {
  return state.hook;
}

/**
 * @description: 校验数据
 * @return {*}
 */
function validate() {
  if (formRef.value) return formRef.value.validate();
}

/**
 * @description:  重置表单
 * @return {*}
 */
function resetForm() {
  if (formRef.value) formRef.value.resetFields();
}

defineExpose({ resetForm, validate, getHook });
</script>
