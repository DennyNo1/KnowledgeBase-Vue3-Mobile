<script setup>
import { ref } from "vue";
import PageHeader from "@/components/PageHeader.vue";

const info = ref({
  title: '',
  author: '',
  department: '',
  type: '',
  time: '',
  watch: 0,
})

const article = ref(``)

import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { userOneQuestionService } from "@/api/question.js";
// import { useLoginStore } from "@/stores/login.js";
// const loginStore = useLoginStore();

const route = useRoute();

onMounted(() => {
  const id = route.query.id;
  const getQuestion = async () => {
    try {
      const data = (await userOneQuestionService(id)).data;
      // console.log(data)
      info.value.title = data.question.title;
      info.value.author = data.user.nickName;
      info.value.department = data.user.department;
      info.value.type = data.question.type;
      info.value.time = data.question.date;
      info.value.watch = data.question.clickCount;
      article.value =  data.question.content;
    } catch (error) {
      console.log("请求失败！", error);
    }
  };
  getQuestion()
})

</script>

<template>
  <div class="m-4">
    <PageHeader :info="info" />
    <article class="prose mt-3" v-html="article" />
  </div>

</template>

<style scoped>

</style>