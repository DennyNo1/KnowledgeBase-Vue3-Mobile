<script setup>
import { ref, computed } from "vue";
const number = ref("");
const level = ref();
function onSubmit() {
  // 6级
  console.log(number.value);

  if (/\d*(\d)\1{7}\d*/.test(number.value)) level.value = "6级";
  else if (/\d*(\d)\1{6}\d*/.test(number.value)) level.value = "6级";
  else if (/\d*(\d)\1{5}\d*/.test(number.value)) level.value = "6级";
  else if (/\d{4}(\d)\1(\d)\2{4}\d{0,4}/.test(number.value))
    level.value = "6级";
  else if (/^.*([06789])\1{4}.*$/.test(number.value)) level.value = "6级";
  else if (/(?=\d*(0123456|1234567|2345678|3456789))/.test(number.value))
    level.value = "6级";
  else if (/(?=\d*(9876543|8765432|7654321|6543210))/.test(number.value))
    level.value = "6级";
  else if (/(?=(\d)\d{0,2}(\d)(?:\1\2){3})/.test(number.value))
    level.value = "6级";
  else if (/(?=(\d)\1(\d)\2\1\1\2\2)/.test(number.value)) level.value = "6级";
  // 5级
  else if (/(?=(?:\d*([1-5])\1{4}))/.test(number.value)) level.value = "5级";
  else if (/(?=(?:\d*([06789])\1{3}))/.test(number.value)) level.value = "5级";
  else if (/(?=\d*(012345|123456|234567|345678|456789))/.test(number.value))
    level.value = "5级";
  else if (/(?=\d*(987654|876543|765432|654321|543210))/.test(number.value))
    level.value = "5级";
  else if (/(?=(\d)(\d)\2{3}\1\1\2{3})/.test(number.value)) level.value = "5级";
  else if (/(?=(\d)\1(\d)\2(\d)\3(\d)\4)/.test(number.value))
    level.value = "5级";
  else if (
    /(?=(\d)\1{3}(0123|1234|2345|3456|4567|5678|6789|9876|8765|7654|6543|5432|4321|3210))/.test(
      number.value
    )
  )
    level.value = "5级";
  else if (/(?=(\d)\1{3}(\d)\2{2})/.test(number.value)) level.value = "5级";
  // 4级
  else if (/(?=(1|2|3|4|5)\1{3})/.test(number.value)) level.value = "4级";
  else if (/(?=(0|6|7|8|9)\1{2})/.test(number.value)) level.value = "4级";
  else if (
    /(?=(01234|12345|23456|34567|45678|56789|98765|87654|76543|65432|54321))/.test(
      number.value
    )
  )
    level.value = "4级";
  else if (/(?=(\d)(\d)\1\2\1\2)/.test(number.value)) level.value = "4级";
  else if (/(?=(\d)\1(\d)\2(8)\2\1)/.test(number.value)) level.value = "4级";
  else if (/(?=(\d)\1{2}(\d)\2{2})/.test(number.value)) level.value = "4级";
  //4级的最后三个匹配，早就被上面等级的覆盖了
  else if (/(?=(\d)\1{4}(\d)\2{2})/.test(number.value)) level.value = "4级";
  else if (/(?=(\d)\1{5}(\d))/.test(number.value)) level.value = "4级";
  else if (/(?=(?!4)(\d)\1{3}\18)/.test(number.value)) level.value = "4级";
  // 3级
  else if (/(?=(1|2|3|4|5)\1{2}\1)/.test(number.value)) level.value = "3级";
  else if (/(?=(\d)(\d)(\d)(\d)\1\2\3\4)/.test(number.value))
    level.value = "3级";
  else if (/^(0123|5678|6789|3210|8765|9876|3210)$/.test(number.value))
    level.value = "3级";
  else if (/(?=(\d)(?!8)(\d)\1\2\1\2)/.test(number.value)) level.value = "3级";
  else if (/(?=(?!4)(\d)8\1 8)/.test(number.value)) level.value = "3级";
  else if (/(?=(\d)\1(\d)\2(?!8)(\d)\3)/.test(number.value))
    level.value = "3级";
  else if (/(?=(\d)\1(8)\2)/.test(number.value)) level.value = "3级";
  else if (/(?=(\d)\1\1\1(?!8)(\d)\2)/.test(number.value)) level.value = "3级";
  else if (/(?=(\d)\1\1\1\1(?!8)(\d))|444448/.test(number.value))
    level.value = "3级";
  // 我算是明白了，这个匹配规则是傻逼设计的，有些号码是特殊规则的，明明满足高等级，但要被强行定在低等级。
  else if (/(?=(8)8(?!4)(\d)8\1)/.test(number.value)) level.value = "3级";
  else if (/(?=(?!4)(\d)\1\1(8))/.test(number.value)) level.value = "3级";
  // 2级
  else if (/(?=(?!.*4)((\d)(?!4)\d)\2\3\2\3)/.test(number.value))
    level.value = "2级";
  else if (/(?=(\d)\1(\d)(?!8)\2\2)/.test(number.value)) level.value = "2级";
  else if (/(?=(8)(?!4)(\d)\2\1)/.test(number.value)) level.value = "2级";
  else if (/^1\d{9}88$/.test(number.value)) level.value = "2级";
  else if (/(?:(?=(\d)\1{3}(?!8)(\d))|44448)/.test(number.value))
    level.value = "2级";
  else if (/(?=(?!.*4)(?!.*8)(\d)(?!4)(?!8)(\d)\2\1)/.test(number.value))
    level.value = "2级";
  // 1级
  else if (/^(012|123|567|678|789|210|321|765|876|987)$/.test(number.value))
    level.value = "1级";
  else if (/(?=(?!.*4)(?!.*8)(\d)(?!4)(?!8)(\d)\2\1)/.test(number.value))
    level.value = "1级";
  else if (/(?=(?!.*4)(?!.*8)(\d)(?!4)(?!8)(\d)\2\1)/.test(number.value))
    level.value = "1级";
  else if (/(?:(?!8)(\d)\1{1}8)/.test(number.value)) level.value = "1级";
  else if (/(?:(?!8)(\d)\1{2}(?!8)\d)|(4448)/.test(number.value))
    level.value = "1级";
  else if (/(?:(?!8)(\d)\1{2}(?!8)\d)|(4448)/.test(number.value))
    level.value = "1级";
  else if (/(?:(?!8)(\d)(?!8)\1(?!4)\2\1)/.test(number.value))
    level.value = "1级";
  else if (/(?:(?!4)(\d)(?!4)\1(?!8)\d)/.test(number.value))
    level.value = "1级";
  else level.value = "不符合靓号标准";
}
</script>
<template>
  <div class="form-container">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="number"
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
          v-model="level"
          name="号码等级"
          label="号码等级"
          placeholder="您还未进行查询"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
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
