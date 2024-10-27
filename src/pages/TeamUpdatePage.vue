<template>
    <div id="teamAddPage">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field
                    v-model="addTeamData.name"
                    name="name"
                    label="队伍名"
                    placeholder="请输入队伍名"
                    :rules="[{ required: true, message: '请输入队伍名' }]"
                />
                <van-field 
                    v-model="addTeamData.description"
                    rows="2"
                    autosize 
                    lavel="队伍描述"
                    type="textarea"
                    placeholder="请输入队伍描述"
                />

                <van-field
                    v-model="date"
                    is-link
                    name="date"
                    label="过期日期"
                    placeholder="请选择过期日期"
                    @click="showDatePopup = true"
                    :rules="[{ required: true, message: '过期日期' }]"
                />
                <van-popup v-model:show="showDatePopup" round position="bottom">
                <van-date-picker v-model="currentDate" type="datetime" title="选择过期日期" @confirm="onDateConfirm" />
                </van-popup>
                <van-field
                    v-model="time"
                    is-link
                    name="time"
                    label="过期时间"
                    placeholder="请选择过期时间"
                    @click="showTimePopup = true"
                    :rules="[{ required: true, message: '过期时间' }]"
                />
                <van-popup v-model:show="showTimePopup" round position="bottom">
                    <van-time-picker v-model="currentTime" title="选择过期时间" @confirm="onTimeConfirm" />
                </van-popup>
                <van-field name="radio" label="队伍状态">
                <template #input>
                    <van-radio-group v-model="addTeamData.status" direction="horizontal">
                        <van-radio name="0">公开</van-radio>
                        <van-radio name="1">私有</van-radio>
                        <van-radio name="2">加密</van-radio>
                    </van-radio-group>
                </template>
                </van-field>
                <van-field 
                    v-if="Number(addTeamData.status) === 2"
                    v-model="addTeamData.password"
                    type="password"
                    name="password"
                    label="密码"
                    placeholder="请输入队伍密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
                
            </van-cell-group>

            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import myAxios from '../plugins/myAxios';
import { useRoute, useRouter } from 'vue-router';
import { showToast } from 'vant';
import { TeamType } from '../models/team';

const router = useRouter();
const route = useRoute();

/**
 * 设置过期时间expireTime
 */
const showDatePopup = ref(false);
const showTimePopup = ref(false);    
const date = ref('');
const time = ref('');
const currentDate = ref([]);
const currentTime = ref([]);
const onDateConfirm = () => {
    showDatePopup.value = false;
    date.value = currentDate.value[0] + '-' + currentDate.value[1] + '-' + currentDate.value[2];
};
const onTimeConfirm = () => {
    showTimePopup.value = false;
    time.value = currentTime.value[0] + ':' + currentTime.value[1];
};

const id = route.query.id;

// 需要用户填写的表单数据  空对象
const addTeamData = ref<TeamType>({});

// 获取之前的队伍信息
onMounted(async () => {
    if (id <= 0) {
        showToast('加载队伍失败');
        return;
    }
    const res = await myAxios.get("/api/team/get", {
        params: {
            id: id,
        },
    });
    if (res?.code === 0) {
        addTeamData.value = res.data;
    } else {
        showToast('获取之前的队伍信息失败');
    }
});

// 提交
const onSubmit = async () => {
    addTeamData.value.expireTime = date.value + 'T' + time.value + ':00.000Z';
    // console.log(addTeamData.value);

    const postData = {
        ...addTeamData.value,
        status: Number(addTeamData.value.status),
    }
    // TODO 前端参数校验
    const res = await myAxios.post(
        "/api/team/update",
        postData,
    );
    if (res?.code === 0 && res.data) {
        showToast('更新成功');
        router.push({
            path: '/team',
            replace: true,   // 替换掉，用户回退就不会回到添加页
        });
    } else {
        showToast('更新失败');
    }
}

</script>

<style scoped>
</style>