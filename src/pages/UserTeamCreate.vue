<template>
    <div id="teamPage">
        <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
        <team-card-list :teamList="teamList"></team-card-list>
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

const searchText = ref('');

// 跳转到加入队伍页
const doJoinTeam = () => {
    router.push({
        path: "/team/add",
    });
}

const teamList = ref([]);

// 页面加载时只触发一次
onMounted(async () => {
    listTeam();
});

/**
 * 
 * @param val 搜索队伍
 */
const listTeam = async (val = '') => {
    const res = await myAxios.get("/api/team/list/my/create", {
        params: {
            searchText: val,
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

</script>

<style scoped>
</style>