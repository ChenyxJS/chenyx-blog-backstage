/*
 * @Author: chenyx
 * @Date: 2023-04-20 12:08:55
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-26 20:52:20
 * @FilePath: /backstage-manage/src/components/JsonForm/form-hook.ts
 */
import { reactive, ref, watch } from 'vue';
import {
  FieldOption,
  FieldType,
  JsonFormOptions,
  JsonFormResult
} from './types';

export function useFormHook(options: JsonFormOptions): JsonFormResult {
  const state = reactive({
    options: options
  });

  const model = ref<Record<string, any>>({});

  generateModel();
  watch(
    () => options,
    () => {
      generateModel();
    }
  );

  function generateModel() {
    state.options.fieldOptions.map((item: FieldOption) => {
      // 如果类型为checkbox，默认值需要设置一个空数组
      const value = item.type === FieldType.checkbox ? [] : '';
      model.value[item.prop] = item.value || value;
    });
  }

  return {
    model,
    fieldOptions: state.options.fieldOptions,
    rules: state.options.rules
  } as JsonFormResult;
}
