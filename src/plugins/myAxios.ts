import axios from "axios";

// 需要安装 @types/node 否则不认识process
//  npm i --save-dev @types/node
const isDev = process.env.NODE_ENV === 'development';
// 这种方式，需要后端Java项目开启跨域支持！（目前后端已经支持了 WebMvcConfig.java
const myAxios = axios.create({
    // baseURL: 'http://localhost:8080/api'
    // baseURL: isDev ? 'http://localhost:8080/api' : 'https://yupao-backend-974538-1256524210.ap-shanghai-run.tcloudbase.com'   //'线上接口'
});
myAxios.defaults.withCredentials = true;  // 表示在向后端发送请求时默认携带上cookie

// 全局请求拦截器
myAxios.interceptors.request.use(function (config) {
    console.log('我要发请求啦', config);
    // do something before request is sent 
    return config;
}, function (error) {
    // do something with request error
    return Promise.reject(error);
});

// 全局响应拦截器 interceptorse
myAxios.interceptors.response.use(function (response) {
    console.log('我收到你的响应啦', response);
    // do something with response data
    // 未登录，跳转到登录页
    if (response?.data?.code === 40100) {
        const redirectUrl = window.location.href;
        window.location.href = `/#/user/login?redirect=${redirectUrl}`;
    }
    return response.data;  //  解💼
}, function (error) {
    // do something with response error
    return Promise.reject(error);
});

export default myAxios;
