<template>
    <div id="teamPage">
        <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
        <van-tabs v-model:active="active" @change="onTabChange">
            <van-tab title="公开" name="public" />
            <van-tab title="加密" name="private" />
        </van-tabs>
        <!-- 添加一个间距 -->
         <div style="margin-bottom: 16px;" />
        <van-button class="add-button" type="primary" icon="plus" @click="doCreateTeam" />
        <!-- <team-card-list :teamList="teamList" :myJoinTeamList="myJoinTeamList" ></team-card-list> -->
        <team-card-list :teamList="teamList" ></team-card-list>
        <van-empty v-if="teamList?.length < 1" description="数据为空" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import myAxios from '../plugins/myAxios';
import { showToast } from 'vant';
import TeamCardList from '../components/TeamCardList.vue';

const router = useRouter();
const active = ref('public');
const searchText = ref('');

// 跳转到 创建队伍页
const doCreateTeam = () => {
    router.push({
        path: "/team/add",
    });
}

const teamList = ref([]);
const myJoinTeamList = ref([]);

// 页面加载时只触发一次
onMounted(async () => {
    listTeam();
});

/**
 * 搜索队伍
 * @param val 
 * @param status
 */
const listTeam = async (val = '', status = 0) => {
    const res = await myAxios.get("/api/team/list", {
        params: {
            searchText: val,
            status: status,
            pageNum: 1,
        },
    });
    if (res?.code === 0) {
        teamList.value = res.data;
    } else {
        showToast('加载队伍失败，请刷新重试');
    }
}

const onSearch = async (val : any) => {
    listTeam(val);
};

/**
 * 搜索我加入的队伍
 * @param val 
 */
 const listMyJoinTeam = async (val = '') => {
    const res = await myAxios.get("/api/team/list/my/join", {
        params: {
            searchText: val,
            pageNum: 1,
        },
    });
    if (res?.code === 0) {
        myJoinTeamList.value = res.data;
    } else {
        showToast('搜索我加入的队伍失败');
    }
}

/**
 * 切换查询状态
 * @param name 
 */
const onTabChange = (name) => {
    if (name === 'public') {
        listTeam(searchText.value, 0);  // 0--后端 公开
    } else {
        listTeam(searchText.value, 2);  // 2--后端 加密
    }
}

</script>

<style scoped>
.add-button {
    position: fixed;
    bottom: 60px;
    right: 12px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
</style>