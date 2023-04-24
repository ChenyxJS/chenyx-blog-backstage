/*
 * @Author: chenyx
 * @Date: 2023-04-20 12:08:55
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-24 21:44:46
 * @FilePath: /backstage/src/components/json-form/form-hook.ts
 */
import { reactive, watch } from "vue";
import {
  FieldOption,
  FieldType,
  JsonFormOptions,
  JsonFormResult,
} from "./types";
import { FormRules } from "element-plus";

export function useFormHook<T>(): JsonFormResult<T> {
  const state = reactive({
    options: {
      fieldOptions: {},
      rules: {},
    } as JsonFormOptions,
    model: {} as Record<string, any>,
  });

  watch(state.options, () => {});

  function setFieldOptions(fieldOptions: FieldOption[]) {
    state.options.fieldOptions = fieldOptions;
  }

  function setRules(rules: FormRules) {
    state.options.rules = rules;
  }

  function validate() {}

  function generateModel() {
    state.options.fieldOptions.map((item: FieldOption) => {
      // 如果类型为checkbox，默认值需要设置一个空数组
      const value = item.type === FieldType.checkbox ? [] : "";
      state.model.value[item.prop] = item.value || value;
    });
  }

  const resultData = () => {
    let data = state.model.value;
    return data as T;
  };

  return {} as JsonFormResult<T>;
}
