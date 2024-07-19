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
    router.push(`/article-page?id=${props.info.id}`);
  } else if (props.type === '需求') {
    router.push(`/question-page?id=${props.info.id}`);
  }
}

import { computed } from "vue";

const dynamicClasses = computed(() => {
  if (props.type === '需求') {
    return { 'bg-amber-400' : true }
  } else return { 'bg-blue-400': true }
});

</script>

<template>
  <div class="bg-white p-3 rounded-lg flex flex-col group hover:shadow-lg" @click="handleClick">
    <div class="mx-1 my-1">
      <div class="text-xl font-bold items-center content-center leading-relaxed truncate-2 group-hover:text-gray-500">
        <span class="rounded-lg rounded-br-sm text-sm text-white px-1.5 py-1 mr-2 align-[0.125rem] min-w-max max-w-max" :class="dynamicClasses">
          {{ type }}
        </span>
        {{ info.title }}
      </div>
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
    <div class="flex flex-row justify-between place-items-center mx-2 mt-2">
      <div class="text-gray-400 my-2.5">发布时间：{{ info.time }}</div>
      <div class="text-blue-500 py-1 px-3 rounded-full border-2 border-blue-500 bg-blue-100" v-if="type === '课件'" >{{ info.status }}</div>
    </div>
  </div>
</template>

<style scoped>
.truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>