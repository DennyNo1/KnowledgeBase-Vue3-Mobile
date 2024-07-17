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

const documents = ref([])

import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { userOneArticleService } from "@/api/article.js";
import { useLoginStore } from "@/stores/login.js";
const loginStore = useLoginStore();

const route = useRoute();

onMounted(() => {
  const id = route.query.id;
  const getArticle = async () => {
    try {
      const data = (await userOneArticleService(id, loginStore.userInfo.id)).data;
      // console.log(data.attachmentList)
      info.value.title = data.articleListDTO.article.title;
      info.value.author = data.articleListDTO.user.nickName;
      info.value.department = data.articleListDTO.user.department;
      info.value.type = data.articleListDTO.article.type;
      info.value.time = data.articleListDTO.article.date;
      info.value.watch = data.articleListDTO.article.clickCount;
      article.value =  data.articleListDTO.article.content;
      documents.value = data.attachmentList
    } catch (error) {
      console.log("请求失败！", error);
    }
  };
  getArticle()
})

</script>

<template>
  <div class="m-4">
    <PageHeader :info="info" />
    <article class="prose mt-3" v-html="article" />
    <article class="prose mt-6" v-if="documents.length">
      <h2>附件列表</h2>
      <ul>
        <li v-for="doc in documents">
          <a :href="doc.url"><van-icon name="description-o" class="mr-2" />{{ doc.name }}</a>
        </li>
      </ul>
    </article>
  </div>

</template>

<style scoped>

</style>