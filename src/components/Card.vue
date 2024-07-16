<script setup>
import { defineProps } from 'vue'

// {
//   id: 1,
//   title: "营养专家的文章",
//   author: "张三",
//   department: "政企部",
//   kind: "营业",
//   time: "2024-06-04",
//   status: "待回复",
// }
const props = defineProps({
  info: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})

import { useRouter } from "vue-router";
const router = useRouter();

function handleClick() {
  if (props.type === '课件') {
    router.push('/article-page');
  } else if (props.type === '需求') {
    router.push('/question-page');
  }
}

</script>

<template>
  <div class="bg-white p-2 rounded-lg flex flex-col group hover:shadow-lg" @click="handleClick">
    <div class="mx-1 flex flex-row my-2">
      <div class="rounded-lg rounded-br-sm bg-blue-400 text-sm text-white py-1 px-1.5 mr-4 min-w-max">{{ type }}</div>
      <div class="text-xl font-bold truncate  group-hover:text-gray-500">{{ info.title }}</div>
    </div>
    <div class="bg-gray-100 flex flex-row justify-around rounded mt-3 mx-1 p-1">
      <div class="flex flex-col self-center place-items-center w-1/3 truncate">
        <div class="m-1 text-gray-500 text-center w-full">发布人</div>
        <div class="m-1 font-semibold truncate text-center w-full px-3">{{ info.author }}</div>
      </div>
      <div class="flex flex-col self-center place-items-center w-1/3 truncate">
        <div class="m-1 text-gray-500 text-center w-full">部门</div>
        <div class="m-1 font-semibold truncate text-center w-full px-3">{{ info.department }}</div>
      </div>
      <div class="flex flex-col self-center place-items-center w-1/3 truncate">
        <div class="m-1 text-gray-500 text-center w-full">类型</div>
        <div class="m-1 font-semibold truncate text-center w-full px-3">{{ info.type }}</div>
      </div>
    </div>
    <div class="flex flex-row justify-between place-items-center mx-2 mt-1">
      <div class="text-gray-400 my-2.5">发布时间：{{ info.time }}</div>
      <div class="text-blue-500 py-1 px-3 rounded-full border-2 border-blue-500 bg-blue-100" v-if="info.status" >{{ info.status }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>