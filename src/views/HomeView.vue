<script setup>
import Search from "@/components/Search.vue";

import { RouterView } from 'vue-router'
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import * as url from "node:url";

const route = useRoute();
const router = useRouter();
// console.log(route);

let nav = computed(() => {
  const path = route.path
  if (path === '/question-page') {
    return '需求详情'
  } else if (path === '/article-page') {
    return '课件详情'
  } else {
    return '中国电信知识库系统'
  }
})

// 计算属性：根据showLeftButton的值动态生成导航栏的props
const navBarProps = computed(() => {
  // 在需求详情页或课件详情页的导航栏添加返回按钮
  if (route.path === '/question-page' || route.path === '/article-page') {
    return {
      leftText: '返回',
      leftArrow: true,
      onClickLeft: onClickReturn
    }
  }
  // 在需求列表页或课件列表页导航栏添加切换按钮
  if (route.path === '/question-list' || route.path === '/article-list') {
    let path = ''
    if (route.path === '/article-list') {
      path = '/question-list'
    } else if (route.path === '/question-list') {
      path = '/article-list'
    }
    return {
      showSwitch: true,
      onClickLeft: onClickReturnHome,
      onClickRight: () => onClickExchange(path)
      // 改为回调函数仅在点击事件发生时才会被调用，而不是在计算属性重新计算时立即调用。避免页面频繁切换和卡死的情况
    }
  }
  return {}
})

function onClickReturn() {
  router.back();
}

function onClickExchange(path) {
  router.push(path);
}

function onClickReturnHome() {
  router.push('/')
}

</script>

<template>
  <div class="max-w-md w-full flex flex-col flex-1 overflow-auto scrollbar-hide backdrop-blur-xl bg-white/50 rounded-lg sm:rounded-3xl sm:my-2">
    <van-nav-bar class="custom-nav grow-0" :title="nav" v-bind="navBarProps">
      <template #left v-if="navBarProps.showSwitch">
        <van-icon name="wap-home-o" size="18" />
        <div class="text-blue-500">首页</div>
      </template>
      <template #right v-if="navBarProps.showSwitch">
        <van-icon name="exchange" size="18" />
        <div class="text-blue-500">切换</div>
      </template>
    </van-nav-bar>
    <router-view class="grow" />
  </div>
</template>

<style scoped>
.custom-nav {
  @apply w-full backdrop-blur-xl bg-white/30 rounded-t-lg sm:rounded-t-3xl;
  --van-nav-bar-title-font-size: 1.25rem;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.scrollbar-hide {
  -ms-overflow-style: none; /* IE 10+ */
  scrollbar-width: none; /* Firefox */
}

</style>