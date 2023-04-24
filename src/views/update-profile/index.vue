<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Update Profile</h2>
  </div>
  <div class="grid grid-cols-12 gap-6">
    <!-- BEGIN: Profile Menu -->
    <div
      class="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse"
    >
      <div class="intro-y box mt-5">
        <div class="relative flex items-center p-5">
          <div class="w-12 h-12 image-fit">
            <img
              alt="Midone Tailwind HTML Admin Template"
              class="rounded-full"
              :src="userStore.avatar"
            />
          </div>
          <div class="ml-4 mr-auto">
            <div class="font-medium text-base">
              {{ userStore.nickname }}
            </div>
            <div class="text-slate-500">{{ '前端开发工程师' }}</div>
          </div>
        </div>
        <div class="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
          <a class="flex items-center text-primary font-medium" href="">
            <ActivityIcon class="w-4 h-4 mr-2" /> Personal Information
          </a>
          <a class="flex items-center mt-5" href="">
            <LockIcon class="w-4 h-4 mr-2" /> Change Password
          </a>
          <a class="flex items-center mt-5" href="">
            <SettingsIcon class="w-4 h-4 mr-2" /> Settings
          </a>
        </div>
        <div
          class="p-5 border-t border-slate-200/60 dark:border-darkmode-400 flex"
        >
          <button type="button" class="btn btn-primary py-1 px-2">
            Logout
          </button>
        </div>
      </div>
    </div>
    <!-- END: Profile Menu -->
    <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
      <!-- BEGIN: Personal Information -->
      <div class="intro-y box lg:mt-5">
        <div
          class="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400"
        >
          <h2 class="font-medium text-base mr-auto">Personal Information</h2>
        </div>
        <div class="p-5">
          <div class="flex flex-col-reverse xl:flex-row flex-col">
            <div class="flex-1 mt-6 xl:mt-0">
              <div class="grid grid-cols-12 gap-x-5">
                <div class="col-span-12 2xl:col-span-6">
                  <div>
                    <label for="update-profile-form-1" class="form-label"
                      >Display Name</label
                    >
                    <input
                      id="update-profile-form-1"
                      type="text"
                      class="form-control"
                      placeholder="Input text"
                      :value="userStore.nickname"
                      disabled
                    />
                  </div>
                  <div class="mt-3">
                    <label for="update-profile-form-2" class="form-label"
                      >Nearest MRT Station</label
                    >
                    <TomSelect
                      id="update-profile-form-2"
                      v-model="select"
                      class="w-full"
                    >
                      <option value="1">Admiralty</option>
                      <option value="2">Aljunied</option>
                      <option value="3">Ang Mo Kio</option>
                      <option value="4">Bartley</option>
                      <option value="5">Beauty World</option>
                    </TomSelect>
                  </div>
                </div>
                <div class="col-span-12 2xl:col-span-6">
                  <div class="mt-3">
                    <label for="update-profile-form-4" class="form-label"
                      >Phone Number</label
                    >
                    <input
                      id="update-profile-form-4"
                      type="text"
                      class="form-control"
                      placeholder="Input text"
                      value="65570828"
                    />
                  </div>
                </div>
              </div>
              <button type="button" class="btn btn-primary w-20 mt-3">
                Save
              </button>
            </div>
            <div class="w-52 mx-auto xl:mr-0 xl:ml-6">
             
            </div>
          </div>
        </div>
      </div>
      <!-- END: Personal Information -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "@/store/modules/user";

const userStore = useUserStore();
const select = ref("1");
</script>
