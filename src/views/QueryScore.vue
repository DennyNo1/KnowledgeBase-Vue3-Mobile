<script setup>
import router from "@/router";
import { ref, computed, handleError } from "vue";
import { Dialog } from "vant";
const sales_phone_number = ref("");
const bil_month = ref("");
const showDatePicker = ref(false);
const selected = ref(["2024", "10"]);
const form = ref(null);
function onConfirm() {
  console.log(selected.value);
  showDatePicker.value = false;
  bil_month.value = selected.value[0] + selected.value[1];
}
async function handleQuery() {
  try {
    await form.value.validate();
    router.push(
      `/query-score-list?bil_month=${bil_month.value}&sales_phone_number=${sales_phone_number.value}`
    );
  } catch (error) {
    console.log(error);
    showDialog({

      message: "请核对您要查询的手机号和账期",
    }).then(() => {
      // on close
    });
  }
}
</script>
<template>
  <div class="form-container">
    <van-form @submit="onSubmit" ref="form">
      <van-cell-group inset>
        <van-field
          v-model="sales_phone_number"
          name="手机号"
          label="手机号"
          placeholder="请输入您要查询的手机号"
          :rules="[
            { required: true, message: '请输入您要查询的手机号' },
            { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' },
          ]"
          maxlength="11"
        />
        <van-field
          v-model="bil_month"
          name="账期"
          label="账期"
          placeholder="请点击选择您要查询的账期"
          @click="showDatePicker = true"
          :rules="[
            { required: true, message: '请点击选择您要查询的账期' },
            {
              pattern: /^\d{4}(0[1-9]|1[0-2])$/,
            },
          ]"
        />
        <van-date-picker
          v-model="selected"
          title="选择日期"
          @confirm="onConfirm"
          @cancel="showDatePicker.value = false"
          v-if="showDatePicker"
          :columns-type="['year', 'month']"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          @click="handleQuery"
        >
          查询
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<style scoped>
.form-container {
  margin-top: 50px; /* Adjust this value to your preference */
}
</style>
