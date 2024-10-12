<script setup>
import { onMounted, ref } from "vue";
import { fetchScoreList } from "@/api/score.js";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const data = ref([]);
//首次渲染
onMounted(async () => {
  const bil_month = route.query.bil_month;
  const sales_phone_number = route.query.sales_phone_number;
  try {
    const response = await fetchScoreList(bil_month, sales_phone_number, 1, 10);
    console.log(response);
    data.value = response.data.data.data;
    console.log(data.value);
  } catch (error) {
    console.log(error);
  }
});
</script>
<template>
  <div class="m-3 mb-2" v-for="record in data">
    <div class="bg-gray-100 flex flex-row justify-around rounded mt-3 mx-1 p-1">
      <div class="flex flex-col self-center place-items-center w-1/3 truncate">
        <div class="m-1 text-gray-500 text-center w-full">账期</div>
        <div class="m-1 font-semibold truncate text-center w-full px-3">
          {{ record.bil_month }}
        </div>
      </div>
      <div class="flex flex-col self-center place-items-center w-1/3 truncate">
        <div class="m-1 text-gray-500 text-center w-full">积分</div>
        <div class="m-1 font-semibold truncate text-center w-full px-3">
          {{ record.SCORE }}
        </div>
      </div>
      <div class="flex flex-col self-center place-items-center w-1/3 truncate">
        <div class="m-1 text-gray-500 text-center w-full">积分类型</div>
        <div class="m-1 font-semibold truncate text-center w-full px-3">
          {{ record.jf_type }}
        </div>
      </div>
      <!-- <div class="flex flex-col self-center place-items-center w-1/3 truncate">
        <div class="m-1 text-gray-500 text-center w-full">号码</div>
        <div class="m-1 font-semibold truncate text-center w-full px-3">
          {{ record.sales_phone_number }}
        </div>
      </div> -->
    </div>
    <!-- <div class="flex flex-row justify-between place-items-center mx-2 mt-2">
        <div class="text-gray-400 my-2.5">账期：{{record.bil_month}}</div>
       
      </div> -->
  </div>
</template>
<style>
.truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
