<template>
    <template v-if="user">
        <van-cell title="当前用户" :value="user?.username" />
        <van-cell title="修改信息" is-link to="/user/update" />
        <van-cell title="我创建的队伍" is-link to="/user/team/create" />
        <van-cell title="我加入的队伍" is-link to="/user/team/join" />
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
    user.value = await getCurrentUser();
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