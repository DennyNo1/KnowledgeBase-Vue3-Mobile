<script setup>
import {ref} from 'vue';

const searchValue = ref('');
const showDropdown = ref(false);
const selectedOption = ref('标题');
const options = ref(['标题', '发布人'])

const selectOption = (option) => {
  selectedOption.value = option;
  showDropdown.value = false;
};

import { useLoginStore } from "@/stores/login";
const loginStore = useLoginStore();


</script>

<template>
  <img src="../assets/China_Telecom_logo.svg" class="w-full p-8 my-4 max-w-sm mx-auto" alt="">
  <div class="relative w-11/12 mx-auto">
    <van-search
        class="custom-search"
        v-model="searchValue"
        placeholder="请输入想要搜索的关键字"
        shape="round"
    >
      <template #left-icon>
        <div class="flex items-center" @click="showDropdown = !showDropdown">
          <span class="mr-2">{{ selectedOption }}</span>
          <i class="van-icon van-icon-arrow-down text-gray-400" />
        </div>
      </template>
    </van-search>
    <div v-if="showDropdown" class="absolute left-0 mt-2 backdrop-blur-xl bg-white/50 border border-gray-300 rounded-lg shadow-lg overflow-hidden text-gray-500 z-10">
      <div v-for="option in options" :key="option" class="px-4 py-2 cursor-pointer hover:bg-gray-300/50" @click="selectOption(option)">
        {{ option }}
      </div>
    </div>
    <div class="flex flex-wrap mx-4 mt-8 justify-evenly justify-items-stretch gap-4">
      <van-button class="custom-btn" to="">课件列表</van-button>
      <van-button class="custom-btn" to="">一线需求</van-button>
      <van-button class="custom-btn" to="" v-if="loginStore.isLoggedIn && loginStore.userInfo.role !== 'user'">我的课件</van-button>
      <van-button class="custom-btn" to="" v-if="loginStore.isLoggedIn && loginStore.userInfo.role !== 'user'">我的需求</van-button>
    </div>
  </div>

</template>

<style scoped>
.custom-btn {
  @apply text-xl py-8 px-6 rounded-xl min-w-max font-sans max-w-max backdrop-blur-xl bg-white/30 font-bold;
}
.custom-search{
  @apply rounded-lg backdrop-blur-xl bg-white/30 h-16;
  --van-cell-font-size: 1.1rem;
}
</style>