<script setup>
import { onMounted, ref } from "vue";
import { fetchScoreList } from "@/api/score.js";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
onMounted(async () => {
  const bil_month = route.query.bil_month;
  const sales_phone_number = route.query.sales_phone_number;
  try {
    const response = await fetchScoreList(bil_month, sales_phone_number, 3, 8);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});
</script>
<template><div></div></template>
<style></style>
