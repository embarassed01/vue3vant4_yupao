<template>
    <form action="/">
        <van-search 
            v-model="searchText" 
            show-action 
            placeholder="请输入搜索关键词" 
            @search="onSearch" 
            @cancel="onCancel"
        />
    </form>
    <van-divider content-position="left">已选标签</van-divider>
    <div v-if="activeIds.length === 0">请选择标签</div>

    <van-row gutter="16" style="padding: 0 16x;">
        <van-col v-for="tag in activeIds">
            <van-tag closeable size="small" type="primary" @close="doClose(tag)" >
                {{ tag }}
            </van-tag>
        </van-col>
    </van-row>
    
    <van-divider content-position="left">选择标签</van-divider>
    <van-tree-select 
        v-model:active-id="activeIds" 
        v-model:main-active-index="activeIndex" 
        :items="tagList"
    />

    <div style="padding: 10px;">
        <van-button block type="primary" @click="doSearchResult">搜索</van-button>
    </div>

</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
// import {showToast} from 'vant';

const router = useRouter();

const searchText = ref('');

const originTagList = [
    {
        text: '性别',
        children: [
            {text: '男', id: '男'},
            {text: '女', id: '女'},
        ],
    },
    {
        text: '年纪',
        children: [
            {text: '大一', id:'大一'},
            {text: '大二', id:'大二'},
        ],
    },
];

// 标签列表
const tagList = ref(originTagList);

/**
 * 搜索过滤
 * @param {*} val 
 */
const onSearch = (val) => {
    // 将嵌套对象数组打平（扁平化）:  flatMap
    // 把每一个父对象中取出children元素，然后拼接在一起成一个数组

    // map会把每个返回值塞到一个新的数组中

    tagList.value = originTagList
        .map(parentTag => {
            const tempChildren = [...parentTag.children];
            const tempParentTag = {...parentTag};
            tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
            return tempParentTag;
    });
    // .flatMap(parentTag => parentTag.children)


};
const onCancel = () => {
    searchText.value = '';
    tagList.value = originTagList;
};

// 已选中的标签ID
const activeIds = ref([]);
const activeIndex = ref(0); 

// 移除标签
const doClose = (tag) => {
    let old = activeIds.value;
    let a = [];
    for (var i = 0, len = old.length; i < len; i++) {
        if (old[i] !== tag) {
            a.push(old[i]);
        }
    }
    activeIds.value = a;

    // 莫名其妙，出错，🚫
    // activeIds.value = activeIds.value.filter(item => {
    //     item !== tag;
    // });
};

/**
 * 执行搜索
 */
 const doSearchResult = () => {
    router.push({  // http://localhost:5173/#/user/list?tags=%E7%94%B7&tags=%E5%A5%B3&tags=%E5%A4%A7%E4%BA%8C  ['男', '女', '大二']
        path: '/user/list',
        query: {
            tags: activeIds.value,
        }
    });
};

</script>

<style scoped>

</style>