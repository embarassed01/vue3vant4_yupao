<template>
    <!-- 
    {{ 
        JSON.stringify(route.query)
    }} 
    -->

    <user-card-list :user-list="userList" />

    <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />

</template>

<script setup lang="ts">
import UserCardList from "../components/UserCardList.vue";

import {ref} from 'vue';
import {useRoute} from 'vue-router';
import {onMounted} from "vue";
import {showToast} from 'vant';
import qs from 'qs';  // query-string 查询字符串的解析器  `npm i qs`

import {UserType} from "../models/user";
import myAxios from "../plugins/myAxios";

const route = useRoute();

const { tags } = route.query;

const userList = ref([]);

// 用一个钩子hook
// 当页面DOM元素加载好之后，自动执行这个🪝
onMounted(async () => {
    const userListData: UserType[] = await myAxios.get('/api/user/search/tags', {
        params: {
            tagNameList: tags,
        },
        paramsSerializer: params => {
            // 处理成这样的GET请求：
            //   http://localhost:5173/api/user/search/tags?tagNameList=%E7%94%B7&tagNameList=%E5%A5%B3
            //  否则，默认是：http://localhost:5173/api/user/search/tags?tagNameList[]=%E7%94%B7&tagNameList[]=%E5%A5%B3 ， 这样后端是无法解析成List数组的
            return qs.stringify(params, { indices: false});
        },
    })
    .then(function (response) {
        // console.log(`/user/search/tags succeed ${response}`);
        showToast('请求成功');
        // console.log(response);
        // return response.data?.data;
        return response.data;
    })
    .catch(function (error) {
        // console.log(`/user/search/tags error ${error}`);
        showToast('请求失败');
    });
    // .then(function() {  // 类似 finally，这里不需要; 否则返回会从这里拿值，里面又是空，所以返回undefined
    //     // always executed
    // }); 
    
    if (userListData) {
        userListData.forEach(user => {
            if (user.tags) {
                user.tags = JSON.parse(user.tags);
            }
        });
        userList.value = userListData;
    }
});

// const mockUser = {
//     id: 12345,
//     username: '鱼皮',
//     userAccount: '123124',
//     profile: '一名精神小伙，目前还有头发，谢谢大家，阿爸阿爸',
//     avatarUrl: 'https://avatar.windsor.io/avatar.windsor.io/abcd',
//     gender: 0,
//     phone: '324543646456',
//     email: '12324@qq.com',
//     planetCode: '1234',
//     tags: ['java', 'emo', '打工中', 'emo', 'work'],
//     createTime: new Date(),
// };

</script>

<style scoped>

</style>