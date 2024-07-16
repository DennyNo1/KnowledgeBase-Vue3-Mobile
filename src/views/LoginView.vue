<script setup>
import { ref } from 'vue';
import IconLogo from "@/components/icons/IconLogo.vue";

const username = ref('');
const password = ref('');
const rememberPassword = ref(false);

const onSubmit = (values) => {
  console.log('submit', values);
};
</script>

<template>
  <div class="flex justify-center items-center w-full h-full">
    <div class="max-w-[22rem] w-full mx-2 bg-white rounded-2xl shadow-md p-6">
      <div class="flex justify-center mb-6">
        <IconLogo class="w-14" />
      </div>
      <h1 class="text-center text-lg font-semibold mb-6">欢迎使用中国电信触点平台</h1>
      <van-form @submit="onSubmit">
        <van-field
            v-model="username"
            name="username"
            placeholder="请输入手机号/用户名"
            :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <template #left-icon>
            <van-icon name="user-o" />
          </template>
        </van-field>
        <van-field
            v-model="password"
            type="password"
            name="password"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请输入密码' }]"
        >
          <template #left-icon>
            <van-icon name="lock" />
          </template>
        </van-field>
        <div class="flex justify-around items-center my-4">
          <van-checkbox v-model="rememberPassword">记住密码</van-checkbox>
          <a href="/forget" class="text-blue-500 text-sm">忘记密码？</a>
<!--          <router-link :to="{ name: 'ResetPassword' }" class="text-blue-500 text-sm">-->
<!--            忘记密码？-->
<!--          </router-link>-->
        </div>
        <div class="mt-6">
          <van-button round block type="primary" native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style scoped>

</style>