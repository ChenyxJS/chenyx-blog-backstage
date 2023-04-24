<!--
 * @Author: chenyx
 * @Date: 2023-03-22 23:22:37
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-24 12:03:58
 * @FilePath: /backstage/src/components/upload/single-upload.vue
-->
<template>
  <!-- 上传组件 -->
  <el-upload
    v-model:file-list="state.UploadFileList"
    :show-file-list="true"
    :limit="1"
    :action="state.actionUrl"
    :data="state.postData"
    :on-success="handleAvatarSuccess"
    :on-error="handleError"
    :on-remove="handleRemove"
    :before-upload="beforeAvatarUpload"
  >
    <div
      v-if="state.UploadFileList.length <= 0"
      class="single-uploader w-28 h-28 flex justify-center items-center"
    >
      <UploadCloudIcon></UploadCloudIcon>
    </div>
  </el-upload>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import { ElMessage, ElUpload, UploadProps, UploadUserFile } from "element-plus";
import { getToken, getHttp } from "@/api/file";


const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const state = reactive({
  actionUrl: "",
  UploadFileList: [] as UploadUserFile[],
  fileList: [] as UploadUserFile[],
  resultUrl: props.modelValue,
  domain: "",
  postData: {
    token: "",
    key: "",
  },
});

init();

watch(
  () => props.modelValue,
  () => {
    reInit();
  }
);



function reInit() {
  state.UploadFileList = [];
  state.fileList = [];
  state.resultUrl = props.modelValue;
  if (props.modelValue) {
    state.fileList.push({
      name: props.modelValue,
      url: props.modelValue,
    });
    state.UploadFileList.push({
      name: props.modelValue,
      url: props.modelValue,
    });
  }
}

function init() {
  getActionUrl();
  getQiniuConfig();
  if (props.modelValue) {
    state.fileList.push({
      name: props.modelValue,
      url: props.modelValue,
    });
    state.UploadFileList.push({
      name: props.modelValue,
      url: props.modelValue,
    });
  }
}

function getActionUrl() {
  let a = getHttp();
  state.actionUrl = a.url;
}

function getQiniuConfig() {
  getToken().then(({ data }) => {
    if (data.success) {
      state.postData.token = data.tip;
      data.root.forEach((item) => {
        if (item.scvaCode === "qny_domain") {
          state.domain = item.scvaValue || "";
        }
      });
    } else {
      ElMessage.error("上传参数失败！");
    }
  });
}

// function handleBeforeUpload(file: UploadRawFile) {
//   if (file.size > 2 * 1048 * 1048) {
//     ElMessage.warning('上传图片不能大于2M');
//     return false;
//   }
//   return true;
// }

function handleAvatarSuccess(res: any) {
  //上传成功后在图片框显示图片
  state.resultUrl = state.domain + "/" + res.key;
  state.fileList.push({
    name: res.key,
    url: state.domain + "/" + res.key,
  });
  emit("update:modelValue", state.resultUrl);
  ElMessage.success("文件上传成功！");
}

function handleError(res: any) {
  //显示错误
  ElMessage.error("文件上传失败！");
}

function beforeAvatarUpload(file: any) {
  // 在图片提交前进行验证
  // 设置文件名称（时间戳前缀防止重名上传失败）
  state.postData.key = new Date().getTime() + file.name;
}

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

</script>

<style lang="scss" scoped>
.single-uploader {
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-style: dashed;
  &:hover {
    border-color: var(--el-color-primary);
  }
  @apply border-slate-200 dark:border-darkmode-200;
}
:deep(.single-uploader .el-upload) {
  width: 100% !important;
  height: 100%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:hover {
    border-color: var(--el-color-primary);
  }
}
:deep(.el-upload-dragger) {
  width: 100% !important;
  height: 100%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: none;
}
</style>
