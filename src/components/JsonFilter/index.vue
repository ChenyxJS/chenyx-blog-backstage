<!--
 * @Author: chenyx
 * @Date: 2023-03-25 18:10:10
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-26 16:46:12
 * @FilePath: /backstage-manage/src/components/JsonFilter/index.vue
-->
<template>
  <div class="filter">
    <div class="title-div">
      <span v-if="showTitle"></span>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'JsonFilter',
  props: {
    code: {
      type: String,
      default: ''
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.filter {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px 13px 0 13px;
  flex-shrink: 0;

  .title-div {
    flex-shrink: 0;
    line-height: 34px;
    margin-right: 10px;
    font-size: 22px;
    font-weight: 500;
    color: #2d344a;
  }
}
</style>
<style scoped>
::deep .el-form--inline .el-form-item {
  margin-bottom: 12px;
  margin-right: 8px;
}
::deep .el-button + .el-button {
  margin-left: 8px;
}

::deep.permission-filter + .el-button {
  margin-left: 8px;
}

::deep .el-button + .permission-filter {
  margin-left: 8px;
}
</style>
