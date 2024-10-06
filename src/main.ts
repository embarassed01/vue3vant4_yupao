import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// import {Button, NavBar, Icon} from 'vant';
// import { Tabbar, TabbarItem } from 'vant';
// import {Search} from 'vant';
import Vant from 'vant';  // 引入vant所有组件
import 'vant/lib/index.css';  // 引入vant所有样式

import * as VueRouter from 'vue-router';
import routes from "./config/route";

const app = createApp(App);
// 按需引入需要的vant组件：
// app.use(Button)
// app.use(NavBar);
// app.use(Icon);
// app.use(Tabbar);
// app.use(TabbarItem);
// app.use(Search);

// 引入vant所有组件：
app.use(Vant);

const router = VueRouter.createRouter({
    // 哈希路由：简单；可通过在url后面+ # 方式来添加不同路由【自己的实现】  
    // e.g.   xxx/#/team
    // 另一种history模式：利用h5的api
    history: VueRouter.createWebHashHistory(),
    routes,
});

app.use(router);
app.mount('#app');
