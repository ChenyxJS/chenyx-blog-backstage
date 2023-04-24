<!--
 * @Author: chenyx
 * @Date: 2023-04-19 21:17:50
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-24 12:06:40
 * @FilePath: /backstage/src/views/article/edit-modal.vue
-->
<template>
  <Modal
    size="modal-lg"
    backdrop="static"
    :show="isVisible"
    @hidden="dialogClose"
  >
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto">{{ dialogTitle }}</h2>
    </ModalHeader>
    <ModalBody>
      <json-form :hook="state.hook"></json-form>
    </ModalBody>
    <ModalFooter>
      <button
        type="button"
        @click="dialogClose"
        class="btn btn-outline-secondary w-20 mr-1"
      >
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-primary w-20"
        @click="submitClick"
        v-loading="state.submitting"
        :disabled="state.submitting"
      >
        Submit
      </button>
    </ModalFooter>
  </Modal>
</template>

<script setup lang="ts">
import { computed, reactive, watch, onMounted } from "vue";
import JsonForm from "@/components/json-form/index.vue";
import { Article, ArticleType } from "@/api/article/types";
import { updateArticle, addArticle } from "@/api/article";
import { getTagList } from "@/api/tag/index";
import { Tag, TagQuery } from "@/api/tag/types";
import { useFormHook } from "@/components/json-form/form-hook";
import {
  FieldOption,
  JsonFormOptions,
  FieldType,
  JsonFormResult,
} from "@/components/json-form/types";
import { helper } from "@/utils/helper";
import { FormRules } from "element-plus";

// state
const emit = defineEmits(["dialogClose", "refresh"]);

const props = defineProps({
  form: {
    type: Object,
    default: {},
  },
  isVisible: {
    type: Boolean,
    default: false,
  },
});

const state = reactive({
  isVisible: props.isVisible,
  form: props.form as Article,
  hook: {} as JsonFormResult<Article>,
  tagOptions: [] as OptionType[],
  submitting: false,
});

watch(
  () => props.form as Article,
  (newValue, oldValue) => {
    state.form = newValue;
    useHook();
  }
);

watch(
  () => props.isVisible,
  (newValue, oldValue) => {
    state.isVisible = newValue;
  }
);

// 判断是否有数据，有数据则为编辑状态
const isEdit = computed(() => {
  return state.form.articleId ? true : false;
});

// 窗口标题
const dialogTitle = computed(() => {
  return state.form.articleId ? "编 辑" : "新 增";
});

onMounted(() => {
  // 获取tag列表
  getTagList({
    page: 1,
    limit: 0,
  } as TagQuery).then(({ data }) => {
    if (data.success) {
      state.tagOptions = generateTag(data.root);
    }
  });
});

// function

/**
 * @description: json-form配置函数
 * @return {*}
 */
function useHook() {
  const formHookOptions = {
    fieldOptions: [
      {
        label: "id",
        prop: "articleId",
        type: FieldType.hidden,
        value: state.form.articleId,
      },
      {
        label: "文章标题",
        prop: "articleTitle",
        type: FieldType.input,
        value: state.form.articleTitle,
        rule: [
          {
            required: true,
            message: "请填写文章标题",
            trigger: ["blur", "change"],
          },
        ],
      },
      {
        label: "文章详情",
        prop: "articleDesc",
        type: FieldType.input,
        required: true,
        value: state.form.articleDesc,
        rule: [],
      },
      {
        label: "文章类型",
        prop: "articleType",
        type: FieldType.select,
        required: true,
        value: state.form.articleType,
        typeOptions: [
          {
            value: "origin",
            label: ArticleType.origin,
          },
          {
            value: "reprint",
            label: ArticleType.reprint,
          },
        ] as OptionType[],
        rule: [],
      },
      {
        label: "文章标签",
        prop: "articleTagId",
        type: FieldType.select,
        required: true,
        value: state.form.articleTagId,
        typeOptions: state.tagOptions,
        rule: [],
      },
      {
        label: "创建时间",
        prop: "articleCreateTime",
        type: FieldType.time,
        required: true,
        value: helper.formatDate(state.form.articleCreateTime),
        rule: [],
      },
      {
        label: "文档",
        prop: "articleUrl",
        type: FieldType.upload,
        required: true,
        value: state.form.articleUrl,
        rule: [],
      },
    ] as FieldOption[],
    rules: {
      articleTitle: [{ required: true, message: "Title is required" }],
    } as FormRules,
  } as JsonFormOptions;
  state.hook = useFormHook();
}

/**
 * @description: 生成标签选项列表
 * @param {*} tags
 * @return {*}
 */
function generateTag(tags: Tag[]): OptionType[] {
  let list = [] as OptionType[];
  tags.forEach((tag) => {
    list.push({
      value: tag.tagId,
      label: tag.tagName,
    } as OptionType);
  });
  return list;
}

/**
 * @description: 关闭编辑窗
 * @return {*}
 */
function dialogClose() {
  state.isVisible = false;
  emit("dialogClose");
}

/**
 * @description: 提交
 * @return {*}
 */
function submitClick() {
  // TODO 校验数据是否合格
  let resultData = state.hook.resultData();
  if (isEdit.value) {
    updateArticle(resultData).then(({ data }) => {
      if (data.success) {
        emit("refresh");
        dialogClose();
      } else {
      }
    });
  } else {
    addArticle(resultData).then(({ data }) => {
      if (data.success) {
        emit("refresh");
        dialogClose();
      } else {
      }
    });
  }
}
</script>
