<template>
    <!-- 注意：vue短横命名会自动转换为驼峰方式变量 -->
    <van-cell center title="心动模式">
        <template #right-icon>
            <van-switch v-model="isMatchMode" size="24" />
        </template>
    </van-cell>
    <!-- <van-button type="primary" @click="doMatch">匹配用户</van-button> -->
    <user-card-list :user-list="userList" :loading="loading" />
    <van-empty v-if="!userList || userList.length < 1" description="数据为空" />

</template>

<script setup lang="ts">
// 引入 卡片子组件
import UserCardList from "../components/UserCardList.vue";

import {ref, watchEffect} from 'vue';
import {onMounted} from "vue";
import {showToast} from 'vant';
import myAxios from "../plugins/myAxios";
import { UserType } from "../models/user";

const isMatchMode = ref<boolean>(false);
const userList = ref([]);
const loading = ref<boolean>(true);

const loadData = async () => {
    let userListData;
    loading.value = true;
    // 心动模式：根据标签匹配用户
    if (isMatchMode.value) {
        const num = 10;
        userListData = await myAxios.get('/api/user/match', {
            params: {
                num,
            },
        })
        .then(function (response) {
            console.log('/api/user/match succeed', response);
            showToast('请求成功');
            return response?.data;
        })
        .catch(function (error) {
            console.log('/api/user/match error', error);
            showToast('请求失败');
        });
    } else {  // 普通模式：直接分页查询
        userListData = await myAxios.get('/api/user/recommend', {
            params: {
                pageSize: 10,
                pageNum: 1,
            },
        })
        .then(function (response) {
            console.log('/api/user/recommend succeed', response);
            showToast('请求成功');
            return response?.data?.records;
        })
        .catch(function (error) {
            console.log('/api/user/recommend error', error);
            showToast('请求失败');
        });
    }
    
    if (userListData) {
        userListData.forEach((user: UserType) => {
            if (user.tags) {
                user.tags = JSON.parse(user.tags);
            }
        });
        userList.value = userListData;
        loading.value = false;
    }
};

// mounted时机更稳，因为此时DOM所有元素都挂载出来了，不会存在问题：有的元素没有挂载上的情况！
onMounted(loadData);

// 监听变量的变化
watchEffect(() => {
    console.log('鱼皮' + isMatchMode.value);
    loadData();
});

</script>

<style scoped>

</style>