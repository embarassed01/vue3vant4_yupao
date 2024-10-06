<template>
    <van-card 
        v-for="user in props.userList" 
        :desc="user.profile" 
        :title="`${user.username} 星球编号${user.planetCode}`" 
        :thumb="user.avatarUrl" 
    >
        <template #tags>
            <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px;" >{{ tag }}</van-tag>
        </template>
        <template #footer>
            <van-button size="mini">联系我</van-button>
        </template>
    </van-card>
</template>

<script setup lang="ts">
import {UserType} from "../models/user";

interface UserCardListProps {
    userList: UserType[];
};

// props, 这样就能得到从父组件传递来的属性！
const props = withDefaults(defineProps<UserCardListProps>(), {
    userList: [],
});

</script>

<style scoped>
</style>