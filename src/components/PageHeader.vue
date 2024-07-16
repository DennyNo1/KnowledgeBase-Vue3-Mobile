<script setup>
import { defineProps } from 'vue'

// {
//   title: '需要一名装维人员',
//   author: '张三',
//   department: '政企部',
//   kind: '营业',
//   time: '2024-06-24'
// }
const props = defineProps({
  info: {
    type: Object,
    required: true
  },
})

import dayjs from 'dayjs'
import { computed } from "vue";
const date = computed(() => {
  return dayjs(props.info.time).format('YYYY-MM-DD')
})

</script>

<template>
  <h1 class="font-medium text-2xl my-2">{{ info.title }}</h1>
  <div class="bg-gray-100/50 backdrop-blur-xl flex flex-row justify-around rounded mt-3 mx-1 p-1">
    <div class="flex flex-col self-center place-items-center w-1/3 truncate">
      <div class="m-1 text-gray-500 text-center w-full">发布人</div>
      <div class="m-1 font-medium truncate text-center w-full px-3">{{ info.author }}</div>
    </div>
    <div class="flex flex-col self-center place-items-center w-1/3 truncate">
      <div class="m-1 text-gray-500 text-center w-full">部门</div>
      <div class="m-1 font-medium truncate text-center w-full px-3">{{ info.department }}</div>
    </div>
    <div class="flex flex-col self-center place-items-center w-1/3 truncate">
      <div class="m-1 text-gray-500 text-center w-full">类型</div>
      <div class="m-1 font-medium truncate text-center w-full px-3">{{ info.type }}</div>
    </div>
  </div>
  <div class="flex flex-row justify-between place-items-center mx-2 mt-1">
    <div class="text-gray-400 my-2.5">发布时间：{{ date }}</div>
    <div class="text-gray-400 my-auto "><van-icon name="eye-o" class="mr-2" />{{ info.watch }}</div>
  </div>
</template>

<style scoped>

</style>