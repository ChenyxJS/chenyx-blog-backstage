<!--
 * @Author: chenyx
 * @Date: 2023-03-22 23:22:37
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-23 00:10:55
 * @FilePath: /backstage-manage/src/components/Upload/Upload.vue
-->
<template>
  <!-- 上传组件 -->
  <el-upload
    class="single-uploader"
    :show-file-list="false"
    list-type="picture-card"
    :action="state.actionUrl"
    :data="state.postData"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <el-icon class="single-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import {
  ElMessage,
  ElUpload,
  UploadRawFile,
  UploadRequestOptions
} from 'element-plus';
import { getToken, getHttp } from '@/api/file';

onMounted(() => {
  getActionUrl();
  getQiniuConfig();
});

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const state = reactive({
  actionUrl: '',
  resultUrl: '',
  domain: '',
  postData: {
    token: '',
    key: ''
  }
});

function getActionUrl() {
  let a = getHttp();
  state.actionUrl = a.url;
}
function getQiniuConfig() {
  getToken().then(({ data }) => {
    if (data.success) {
      state.postData.token = data.tip;
      data.root.forEach(item => {
        if (item.scvaCode === 'qny_domain') {
          state.domain = item.scvaValue || '';
        }
      });
    } else {
        ElMessage.error('上传参数失败！');
    }
  });
}

// /**
//  * 限制用户上传文件的格式和大小
//  */
// function handleBeforeUpload(file: UploadRawFile) {
//   if (file.size > 2 * 1048 * 1048) {
//     ElMessage.warning('上传图片不能大于2M');
//     return false;
//   }
//   return true;
// }

function handleAvatarSuccess(res: any) {
  //上传成功后在图片框显示图片
  state.resultUrl = state.domain + '/' + res.key;
  emit('update:modelValue', state.resultUrl);
}
// function handleError(res) {
//   //显示错误
//   this.LOG.info(['err --- ', res]);
// }

function beforeAvatarUpload(file: any) {
  //在图片提交前进行验证
  state.postData.key = new Date().getTime() + file.name;
}
</script>

<style scoped>
.single-uploader .single {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.single-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.single-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.single-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
