<template>
    <template v-if="user">
        <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="toEdit('username', '昵称', user.username)" />
        <van-cell title="账号" is-link to="/user/edit" :value="user.userAccount" />
        <van-cell title="头像" is-link to="/user/edit">
            <img :src="user.avatarUrl" style="height: 48px;" />
        </van-cell>
        <van-cell title="性别" is-link to="/user/edit" :value="user.gender"         
            @click="toEdit('gender', '性别', user.gender)" />
        <van-cell title="电话" is-link to="/user/edit" :value="user.phone" 
            @click="toEdit('phone', '电话', user.phone)" />
        <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" />
        <van-cell title="星球编号" :value="user.planetCode" />
        <van-cell title="注册时间" :value="user.createTime" />
    </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import {onMounted, ref} from 'vue';
// import UserType from '../models/user';
import myAxios from '../plugins/myAxios';
import { showToast } from 'vant';
import {getCurrentUser} from '../services/user';

const router = useRouter();

// const user = {
//     id: 1,
//     username: '鱼皮',
//     userAccount: 'dogYupi',
//     avatarUrl: 'https://avatar.windsor.io/avatar.windsor.io/abcd',
//     gender: '男',
//     phone: '1111222222',
//     email: '123444@qq.com',
//     planetCode: '1234',
//     createTime: new Date(),
// };

const user = ref();

onMounted(async () => {
    user.value= await getCurrentUser();
});

// onMounted(async () => {
//     const userListData = await myAxios.get()
//         .then()
//         .catch();
//         // .then();
// });

const toEdit = (editKey: string, editName: string, currentVal: string) => {
    // http://localhost:5173/#/user/edit?editKey=gender&editName=%E6%80%A7%E5%88%AB&currentVal=%E7%94%B7  ['性别'  '男' 编码]
    router.push({
        path: '/user/edit',
        query: {
            editKey,
            editName,
            currentVal,
        },
    });
};

</script>

<style scoped>
</style>