<script setup>
import { ref, computed } from "vue";
import Card from "@/components/Card.vue";
const currentPage = ref(1);

const value = ref('')

const title = ref(['默认','热门知识','营业','装维','政企客户经理','客经专员','支局长','片区长','VIP客户经理'])
const articles = computed(() => {
  return [
    {
      id: 1,
      title: "营养专家的文章11111111111111111111111111111111111111111",
      author: "张三1111111111111111111111111111111111",
      department: "政企部111111111111111111111111111111111",
      kind: "营业",
      time: "2024-06-04",
      status: "",
    },
  ]
})
 const active = ref(0)

</script>

<template>
  <div class="flex flex-col">
    <div class="my-2">
      <van-search
          v-model="value"
          shape="round"
          background="#00000000"
          placeholder="请输入搜索关键词"
      />
    </div>
    <van-tabs v-model:active="active">
      <van-tab v-for="index in title" :title="index">
        <Card v-for="article in articles" :info="article" type="课件" class="m-3" />
      </van-tab>
    </van-tabs>
    <div class="grow" />
    <div class="mt-auto pt-4">
      <van-pagination
          v-model="currentPage"
          :total-items="125"
          :show-page-size="3"
          force-ellipses
      />
    </div>
  </div>
</template>

<style scoped>

</style>