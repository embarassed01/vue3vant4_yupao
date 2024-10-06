<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="editUser.currentVal"
        :name="editUser.editKey"
        :label="editUser.editName"
        placeholder="请输入"
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
import {onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import myAxios from '../plugins/myAxios';
import { showToast } from 'vant';
import { getCurrentUser } from '../services/user';
import { UserType } from '../models/user';

const route = useRoute();
const router = useRouter();
// console.log(route.query);
const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentVal: route.query.currentVal,
});


const onSubmit = async (/*values: any*/) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    showToast('用户未登录');
    return;
  }

  // todo  把editKey, currentValue提交到后台
  const res = await myAxios.post('/api/user/update', {  // js的动态语法，[]括起来，里面可以传一个变量，不用写死了
    "id": currentUser.id,
    [editUser.value.editKey as string]: editUser.value.currentVal,
  });
  console.log(res, '更新请求');
  if (res.code === 0 && res.data > 0) {
    showToast('修改成功');
    router.back();  // 返回之前的页面
  } else {
    showToast('修改失败');
  }
};

</script>

<style scoped>
</style>