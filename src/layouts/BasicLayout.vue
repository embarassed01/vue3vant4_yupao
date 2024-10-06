<template>
    <van-nav-bar 
        title="标题" left-arrow @click-left="onClickLeft"   @click-right="onClickRight"
    >
    <template #right>
        <van-icon name="search" size="18" />
    </template>
    </van-nav-bar>

    <!-- <slot name="content">
        <div>在这里写内容</div>
    </slot> -->

    <div id="content">
        <router-view />
    </div>
    <!-- <router-link to="/">Go to Home</router-link> -->
    <!-- <router-link to="/team">队伍页</router-link> -->

    <!-- 虽然没有用路由，但是功能实现了类似。
    公共的部分不变，利用active值来做页面切换显示！！ -->
    <!-- <div id="content">
        <template v-if="active === 'index'">
            <Index />
        </template>
        <template v-if="active === 'team'" >
            <Team />
        </template>
    </div> -->

    <!-- <van-tabbar v-model="active" @change="onChange"> -->
    <!-- tabbar组件库，自带来和vue-router的整合!! -->
    <van-tabbar route @change="onChange">
        <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
        <van-tabbar-item to="/team" icon="search" name="team">队伍页</van-tabbar-item>
        <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
    </van-tabbar>

</template>

<script setup>
import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import { ref } from 'vue';
import { showToast } from 'vant';
import {useRouter} from 'vue-router';

const router = useRouter();

const onClickLeft = () => {
    router.push('/');
};
const onClickRight = () => {
    router.push('/search');
};

// active关联每个标签项的name，让那个默认2高亮
// const active = ref('index');
const onChange = (index) => showToast(`标签${index}`);

</script>

<style scoped>
.van-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
}

#content {
    padding-top: 20px;
    padding-bottom: 50px;
}
</style>