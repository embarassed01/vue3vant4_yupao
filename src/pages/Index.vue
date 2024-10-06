<template>
    <!-- 注意：vue短横命名会自动转换为驼峰方式变量 -->
    <user-card-list :user-list="userList" />

    <van-empty v-if="!userList || userList.length < 1" description="数据为空" />

</template>

<script setup lang="ts">
// 引入 卡片子组件
import UserCardList from "../components/UserCardList.vue";

import {ref} from 'vue';
import {onMounted} from "vue";
import {showToast} from 'vant';
import myAxios from "../plugins/myAxios";

const userList = ref([]);

// mounted时机更稳，因为此时DOM所有元素都挂载出来了，不会存在问题：有的元素没有挂载上的情况！
onMounted(async () => {
    const userListData = await myAxios.get('/api/user/recommend', {
        params: {
            pageSize: 100,
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
    
    if (userListData) {
        userListData.forEach(user => {
            if (user.tags) {
                user.tags = JSON.parse(user.tags);
            }
        });
        userList.value = userListData;
    }
});
</script>

<style scoped>

</style>