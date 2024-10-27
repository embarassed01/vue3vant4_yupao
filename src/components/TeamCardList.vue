<template>
    <div id="teamCardList">
        <van-card 
            v-for="team in props.teamList" 
            :desc="team.description" 
            :title="`${team.name}`" 
            :thumb="team.createUser.avatarUrl"
        >
    <!-- thumb：可以使用在线图片{"team.createUser.avatarUrl"} 或 离线本地图片 ikun {import ikun from "../assets/ikun.png";}-->
            <template #tags>
                <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px;" >
                    {{ teamStatusEnum[team.status] }}
                </van-tag>
            </template>
            <template #bottom>
                <div>
                    {{`队伍人数: ${team.hasJoinNum}/${team.maxNum}`}}
                </div>
                <div v-if="team.expireTime">
                    {{ `过期时间: ${team.expireTime}` }}
                </div>
                <div> 
                    {{ `发布时间：${team.createTime}` }}
                </div>
            </template>
            <template #footer>
                <van-button size="small" type="primary" v-if="team.createUser?.id !== currentUser?.id && !team.hasJoin" plain @click="preJoinTeam(team)">加入队伍</van-button>
                <van-button v-if="team.createUser?.id === currentUser?.id" size="small" type="primary" plain @click="doUpdateTeam(team.id)">更新队伍</van-button>
                <van-button size="small" type="primary" v-if="team.createUser?.id !== currentUser?.id && team.hasJoin" plain @click="doQuitTeam(team.id)">退出队伍</van-button>
                <van-button v-if="team.createUser?.id === currentUser?.id" size="small" type="danger" plain @click="doDeleteTeam(team.id)">解散队伍</van-button>
            </template>
        </van-card>
        <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinCancel" >
            <van-field v-model="password" placeholder="请输入密码" />
        </van-dialog>
    </div>
</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import { teamStatusEnum } from "../constants/team";
import myAxios from "../plugins/myAxios";
import { showToast } from "vant";
import { onMounted, ref } from "vue";
import { getCurrentUser } from "../services/user";
import { useRouter } from "vue-router";
// import ikun from "../assets/ikun.png";

const router = useRouter();

interface TeamCardListProps {
    teamList: TeamType[];
};

// props, 这样就能得到从父组件传递来的属性！
const props = withDefaults(defineProps<TeamCardListProps>(), {
    teamList: [],
});

const showPasswordDialog = ref<boolean>(false);
const password = ref('');
const joinTeamId = ref();  // default: undefined
const currentUser = ref();  // default: undefined

onMounted(async () => {
    currentUser.value = await getCurrentUser();
});

const preJoinTeam = (team: TeamType) => {
    joinTeamId.value = team.id;
    if (team.status === 0) {
        doJoinTeam();
    } else {
        showPasswordDialog.value = true;
    }
};

/**
 * 加入队伍
 */
const doJoinTeam = async () => {
    // TODO 加密房间，需要有个输入密码的提示框
    if (!joinTeamId.value) {
        return;
    }
    const res = await myAxios.post("/api/team/join", {
        teamId: joinTeamId.value,
        password: password.value,
    });
    if (res?.code === 0) {
        showToast('加入队伍成功');
        doJoinCancel();
    } else {
        showToast('加入队伍失败' + (res.description ? `, ${res.description}` : ''));
        doJoinCancel();
    }
};

const doJoinCancel = () => {
    joinTeamId.value = 0;
    password.value = '';
}

/**
 * 跳转到更新队伍
 * @param id 
 */
const doUpdateTeam = (id: number) => {
    router.push({
        path: '/team/update',
        query: {
            id,
        },
    });
}

/**
 * 
 * @param id 退出队伍
 */
const doQuitTeam = async (id: number) => {
    const res = await myAxios.post('/api/team/quit', {
        teamId: id,
    });
    if (res?.code === 0) {
        showToast('退出成功');
    } else {
        showToast('退出失败' + (res.description ? `, ${res.description}` : ''));
    }
}

/**
 * 
 * @param id 解散队伍
 */
const doDeleteTeam = async (id: number) => {
    const res = await myAxios.post('/api/team/delete', {
        id: id,
    });
    if (res?.code === 0) {
        showToast('解散队伍成功');
    } else {
        showToast('解散队伍失败' + (res.description ? `, ${res.description}` : ''));
    }
}

</script>

<style scoped>
/* 注意：如果子组件样式设置传递不进来，可以利用关键词deep()来传递
例如： .van-image__img就是在网页上查看到的图片的css样式class名 */
#teamCardList :deep(.van-image__img) {
    height: 128px;
    object-fit: unset;
}
</style>