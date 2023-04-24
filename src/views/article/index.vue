<template>
  <h2 class="intro-y text-lg font-medium mt-10">文章管理</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div
      class="intro-y col-span-12 flex flex-wrap xl:flex-nowrap items-center mt-2"
    >
      <div class="flex w-full sm:w-auto">
        <div class="w-48 relative text-slate-500">
          <input
            type="text"
            class="form-control w-48 box pr-10"
            placeholder="Search by invoice..."
          />
          <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
        </div>
      </div>
      <div class="w-full ml-auto xl:w-auto flex items-center mt-3 xl:mt-0">
        <button class="btn btn-primary shadow-md mr-2">
          <FileTextIcon class="w-4 h-4 mr-2" /> Export to Excel
        </button>
        <button class="btn btn-primary shadow-md mr-2">
          <FileTextIcon class="w-4 h-4 mr-2" /> Export to PDF
        </button>
        <Dropdown>
          <DropdownToggle class="dropdown-toggle btn px-2 box">
            <span class="w-5 h-5 flex items-center justify-center">
              <PlusIcon class="w-4 h-4" />
            </span>
          </DropdownToggle>
          <DropdownMenu class="w-40">
            <DropdownContent>
              <DropdownItem @click="add_click">
                <Edit3Icon class="w-4 h-4 mr-2" />
                Add
              </DropdownItem>
              <DropdownItem>
                <BookmarkIcon class="w-4 h-4 mr-2" /> Import to Execl
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <!-- BEGIN: Data List -->
    <json-table :hook="tableHook">
      <template #operations="iData">
        <div class="flex justify-center items-center">
          <a class="flex cursor-pointer items-center mr-3" @click="showEditPanel(iData.rowData.scope.row)">
            <CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
          </a>
          <a
            class="flex cursor-pointer items-center text-danger"
            @click="delete_click(iData.rowData.scope.row)"
          >
            <Trash2Icon class="w-4 h-4 mr-1" /> Delete
          </a>
        </div>
      </template>
    </json-table>
    <!-- END: Data List -->
  </div>
  <!-- BEGIN: Delete Confirmation Modal -->
  <Modal
    :show="deleteConfirmationModal"
    @hidden="deleteConfirmationModal = false"
  >
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div class="text-3xl mt-5">Are you sure?</div>
        <div class="text-slate-500 mt-2">
          Do you really want to delete these records? <br />This process cannot
          be undone.
        </div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button
          type="button"
          @click="deleteConfirmationModal = false"
          class="btn btn-outline-secondary w-24 mr-1"
        >
          Cancel
        </button>
        <button type="button" class="btn btn-danger w-24">Delete</button>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: Delete Confirmation Modal -->
  <edit-modal
    :form="state.entity"
    :is-visible="state.isEditModalVisible"
    @refresh="tableHook.execute()"
    @dialogClose="state.isEditModalVisible = false"
  ></edit-modal>
</template>

<script lang="ts" setup>
import JsonTable from "@/components/json-table/index.vue";
import EditModal from "./edit-modal.vue";

import { reactive, ref } from "vue";
import { Article, ArticleQuery, ArticleType } from "@/api/article/types";
import { TableHeader } from "@/components/json-table/types";
import {
  useTableHook,
  JsonTableOptions,
} from "@/components/json-table/table-hook";
import { FieldType } from "@/components/json-table/types";
import { getArticleList, deleteArticle } from "@/api/article/index";

const deleteConfirmationModal = ref(false);
// state
const state = reactive({
  articleList: [] as Array<Article>,
  page: {
    page: 1,
    limit: 10,
    total: 0,
  },
  entity: {} as Article,
  isEditModalVisible: false,
});
// hook
const options = reactive({
  apiFun: getArticleList,
  select: true,
  param: {
    page: 1,
    limit: 10,
    keywords: "",
    articleTagId: 0,
  } as ArticleQuery,
  tableHeader: [
    {
      prop: "articleTitle",
      label: "文章标题",
      width: 180,
      isFixed: true,
    },
    {
      prop: "articleType",
      label: "文章类型",
      width: 100,
      type: FieldType.enum,
      enumData: ArticleType,
    },
    {
      prop: "articleDesc",
      label: "文章概述",
      width: 200,
      type: FieldType.tooltip,
    },
    {
      prop: "articleUrl",
      label: "文章地址",
      type: FieldType.url,
    },
    {
      prop: "articleCreateTime",
      label: "创建时间",
      width: 180,
      type: FieldType.time,
    },
    {
      prop: "operations",
      label: "操作",
      width: 180,
      slot: true,
    },
  ] as TableHeader[],
}) as JsonTableOptions<Article, ArticleQuery>;
const tableHook = useTableHook<Article, ArticleQuery>(options);

/**
 * @description: 显示编辑窗口
 * @param {Article} data
 * @return {*}
 */
function showEditPanel(data?: Article) {
  state.entity = data || ({} as Article);
  state.isEditModalVisible = true;
}

/**
 * @description: 新增
 * @return {*}
 */
function add_click() {
  showEditPanel();
}

/**
 * @description: 删除
 * @param {Article} data
 * @return {*}
 */
function delete_click(data: Article) {
  deleteConfirmationModal.value = true;
  // ElMessageBox.alert("是否确认要删除", "提示", {
  //   confirmButtonText: "OK",
  //   cancelButtonText: "Cancel",
  //   showCancelButton: true,
  //   callback: (action: Action) => {
  //     if (action === "confirm") {
  //       // 弹窗提示是否确认要删除
  //       deleteArticle({ id: data.articleId })
  //         .then(({ data }) => {
  //           if (data.success) {
  //             ElMessage.success("删除成功");
  //             // 刷新列表
  //             tableHook.execute();
  //           }
  //         })
  //         .catch((err) => {
  //           ElMessage.error(err.message);
  //         });
  //     }
  //   },
  // });
}
</script>
