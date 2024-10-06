<template>
<van-form @submit="onSubmit">
  <van-cell-group inset>
    <van-field
      v-model="userAccount"
      name="userAccount"
      label="账号"
      placeholder="请输入账号"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <!-- v-model实现数据的双向绑定：js改了，页面就改；页面改了，数据也改了 -->
    <van-field
      v-model="userPassword"
      type="password"
      name="userPassword"
      label="密码"
      placeholder="请输入密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit">
      提交
    </van-button>
  </div>
</van-form>

</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import myAxios from '../plugins/myAxios';
import { showToast } from 'vant';

const router = useRouter();

const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async (/*values*/) => {
    const res = await myAxios.post('/api/user/login', {
        userAccount: userAccount.value,
        userPassword: userPassword.value,
    });
    console.log(res, '用户登录');
    if (res.code === 0 && res.data) {
        showToast('登录成功');
        router.replace('/');  // 替换现在页面，不会压入栈，这样back()就不会返回到这个页面了
    } else {
        showToast('登录失败');
    }
};

</script>

<style scoped>
</style>