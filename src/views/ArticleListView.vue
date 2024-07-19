<script setup>
import { ref, computed } from "vue";
import Card from "@/components/Card.vue";

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const title = ref(['默认', '热门知识', '营业', '装维', '政企客户经理', '客经专员', '支局长', '片区长', 'VIP客户经理'])

const path = route.path
let query = {...route.query} // 深拷贝
if (!query.type) {
  query.type = '默认'
}
if (!query.page) {
  query.page = '1'
}
// const query = ref(route.query)
const currentPage = ref(Number(route.query.page) || 1)
// console.log(currentPage.value, "setup")
const value = ref(route.query.queryName || '')
const active = ref(title.value.findIndex(item => item === route.query.type) === -1 ? 0 : title.value.findIndex(item => item === route.query.type))
const pageSize = ref(6) // 每页默认展示6条结果
const totalPages = ref(1)

const rawList = ref([])
const articleList = computed(() => {
//   return [
//     {
//       id: 1,
//       title: "营养专家的文章11111111111111111111111111111111111111111",
//       author: "张三1111111111111111111111111111111111",
//       department: "政企部111111111111111111111111111111111",
//       type: "营业",
//       time: "2024-06-04",
//       status: "",
//     },
//   ]
  return rawList.value.map(item => ({
    id: item.article.id,
    title: item.article.title,
    author: item.user.nickName,
    department: item.user.department,
    type: item.article.type,
    time: item.article.date,
    status: item.article.isSolved ? "已回复" : "未解决",
  }))
})


import { onMounted } from "vue";
import { userArticleListService } from "@/api/article.js";
const getArticleList = async (page, pageSize, queryName, type) => {
  try {
    let data = (await userArticleListService(page, pageSize, queryName, type)).data
    // console.log(data);
    // if (data.pages === 0) {
    //   currentPage.value = 1
    //   // console.log("current page is set to 1")
    //   query.page = 1
    //   totalPages.value = 1
    //   await router.push({path, query})
    // } else if (totalPages.value !== data.pages){
    //   totalPages.value = data.pages
    //   if (totalPages.value < currentPage.value) currentPage.value = totalPages.value
    //   query.page = currentPage.value
    //   await router.push({path, query})
    //   data = (await userArticleListService(currentPage.value, pageSize, queryName, type)).data
    // }
    // 去除原来的逻辑
    totalPages.value = data.pages
    rawList.value = data.records
  } catch (error) {
    console.log("请求失败！", error)
  }
}

function onClickTab(item) {
  // console.log(item.title)
  // console.log(query)
  // 切换tab标签时自动回到该标签的第一页
  query.page = '1'
  currentPage.value = 1
  query.type = item.title;
  router.push({path, query})
  getArticleList(currentPage.value, pageSize.value, query.queryName, query.type)
}

function onSwitchPage(item) {
  query.page = item
  router.push({path, query})
  currentPage.value = item
  getArticleList(currentPage.value, pageSize.value, query.queryName, query.type)
}

onMounted(() => {
  // currentPage.value = Number(route.query.page) || 1
  getArticleList(currentPage.value, pageSize.value, query.queryName, query.type)
})

// 使用计算属性防止分页组件乱改当前页面
const computedCurrentPage = computed({
  get() {
    return currentPage.value
  },
  set(newValue) {
    // currentPage.value = Number(route.query.page) || 1
    // console.log('emit')
  }
})

function handleSearch() {
  query.queryName = value.value
  router.push({path, query})
  currentPage.value = 1
  getArticleList(currentPage.value, pageSize.value, query.queryName, query.type)
}

</script>

<template>
  <div class="flex flex-col">
    <div class="my-2">
      <van-search
          v-model="value"
          shape="round"
          background="#00000000"
          placeholder="请输入搜索关键词"
          @search="handleSearch"
      />
    </div>
    <van-tabs v-model:active="active" @click-tab="onClickTab" class="mb-2">
      <van-tab v-for="index in title" :title="index" />
    </van-tabs>
    <Card v-for="article in articleList" :info="article" type="课件" class="m-3 mb-2" />
    <div class="grow" />
    <div class="mt-auto pt-4">
      <van-pagination
          v-model="computedCurrentPage"
          :page-count="totalPages"
          @change="onSwitchPage"
          :show-page-size="5"
          force-ellipses
      />
    </div>
  </div>
</template>

<style scoped>

</style>