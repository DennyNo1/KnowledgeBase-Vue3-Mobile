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

import { useRouter } from "vue-router";
const router = useRouter();

function handleSearch() {
  // console.log('handleSearch');
  // console.log(selectedOption.value);
  // console.log(searchValue.value);
  // 更改不合理的逻辑
  if (searchValue.value === '') {
    router.push({ path: checkedPath.value })
  }
  else if (selectedOption.value === '标题') {
    // router.push(`/article-list?queryName=${searchValue.value}`)
    router.push({ path: checkedPath.value, query: { queryName: searchValue.value }})
  } else if (selectedOption.value === '发布人') {
    // router.push(`/article-list?queryUploader=${searchValue.value}`)
    router.push({ path: checkedPath.value, query: { queryUploader: searchValue.value }})
  }
}

const checkedPath = ref('/article-list')

</script>

<template>
  <div>
    <!--  使用div盒子包裹消除报错  -->
    <img src="../assets/China_Telecom_logo.svg" class="w-full p-8 my-4 max-w-sm mx-auto" alt="">
    <div class="relative w-11/12 mx-auto">
      <van-search
          class="custom-search"
          v-model="searchValue"
          placeholder="请输入想要搜索的关键字"
          shape="round"
          @search="handleSearch"
      >
        <template #left-icon>
          <div class="flex items-center" @click="showDropdown = !showDropdown">
            <span class="mr-2">{{ selectedOption }}</span>
            <i class="van-icon van-icon-arrow-down text-gray-400" />
          </div>
        </template>
        <template #right-icon>
          <van-icon name="search" class="text-gray-400" @click="handleSearch" />
        </template>
        <!--      <template #action>-->
        <!--        <van-icon name="search" @click="handleSearch" />搜索-->
        <!--      </template>-->
      </van-search>
      <div v-if="showDropdown" class="absolute left-0 mt-2 backdrop-blur-xl bg-white/50 border border-gray-300 rounded-lg shadow-lg overflow-hidden text-gray-500 z-10">
        <div v-for="option in options" :key="option" class="px-4 py-2 cursor-pointer hover:bg-gray-300/50" @click="selectOption(option)">
          {{ option }}
        </div>
      </div>
      <div class="m-4 mt-6">
        <van-radio-group v-model="checkedPath" direction="horizontal" class="flex flex-row justify-evenly justify-items-center mx-auto">
          <van-radio class="mr-2" shape="dot" name="/article-list">搜索课件</van-radio>
          <van-radio class="ml-2" shape="dot" name="/question-list">搜索需求</van-radio>
        </van-radio-group>
      </div>
      <div class="flex flex-wrap mx-4 mt-8 justify-evenly justify-items-stretch gap-4">
        <van-button class="custom-btn" to="/article-list">课件列表</van-button>
        <van-button class="custom-btn" to="/question-list">一线需求</van-button>
        <van-button class="custom-btn" to="" v-if="loginStore.isLoggedIn && loginStore.userInfo.role !== 'user'">我的课件</van-button>
        <van-button class="custom-btn" to="" v-if="loginStore.isLoggedIn && loginStore.userInfo.role !== 'user'">我的需求</van-button>
        <van-button class="custom-btn" to="/ai-helper" >AI大模型助手</van-button>
      </div>
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