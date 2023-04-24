<template>
  <!-- BEGIN: Validation Form -->
  <el-form
    :model="hook.model"
    ref="formRef"
    label-width="auto"
    :rules="hook.rules"
    style="display: flex; flex-wrap: wrap"
  >
    <el-form-item
      v-for="(item, index) in hook.fieldOptions"
      v-show="item.type !== FieldType.hidden"
      :key="index"
      :required="item.required"
      :label="item.label"
      :prop="item.prop"
      :rules="item.rule"
      style="width: 100%"
    >
      <input
        v-if="item.type === FieldType.input"
        v-model="hook.model[item.prop]"
        type="text"
        class="form-control"
        :placeholder="item.placeholder"
      />

      <select
        v-else-if="item.type === FieldType.select"
        v-model="hook.model[item.prop]"
        class="form-control w-full"
      >
        <option v-for="o in item.typeOptions" :value="o.value">
          {{ o.label }}
        </option>
      </select>

      <single-upload
        v-else-if="item.type === FieldType.upload"
        v-model="hook.model[item.prop]"
      ></single-upload>

      <date-picker
        class="form-control block mx-auto"
        v-else-if="item.type === FieldType.time"
        v-model="hook.model[item.prop]"
        type="datetime"
        value-format="YYYY-MM-DD HH:mm:ss"
        placeholder="请选择时间"
      />
    </el-form-item>
  </el-form>
  <!-- END: Validation Form -->
</template>

<script setup lang="ts">
import SingleUpload from "@/components/upload/single-upload.vue";
import DatePicker from "@/components/date-picker/index.vue";
import { PropType, onMounted, reactive, ref } from "vue";
import { JsonFormResult, FieldType } from "./types";
import { FormInstance } from "element-plus";

const props = defineProps({
  hook: {
    type: Object as PropType<JsonFormResult<any>>,
    default: () => {},
  },
});

const state = reactive({
  hook: {} as JsonFormResult<any>,
});

onMounted(() => {
  initHooks();
});

const formRef = ref<FormInstance>();

function initHooks() {
  
}

function changeUrl(url: string) {
  console.log(url);
}

function resetForm() {
  if (!formRef.value) return;
  formRef.value.resetFields();
}
</script>

<style></style>
