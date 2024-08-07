import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Search from "../components/Search.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [
        {
          path: "/",
          name: "Search",
          component: Search,
        },
        {
          path: "article-page",
          name: "ArticlePage",
          component: () => import("../views/ArticlePageView.vue"),
        },
        {
          path: "question-page",
          name: "QuestionPage",
          component: () => import("../views/QuestionPageView.vue"),
        },
        {
          path: "article-list",
          name: "ArticleList",
          component: () => import("../views/ArticleListView.vue"),
        },
        {
          path: "question-list",
          name: "QuestionList",
          component: () => import("../views/QuestionListView.vue"),
        },
        {
          path: "ai-helper",
          name: "AiHelper",
          component: () => import("../views/AiHelperView.vue"),
        },
        {
          path: "numberLevel",
          name: "numberLevel",
          component: () => import("../views/NumberLevel.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LoginView.vue"),
    },
  ],
});

export default router;
