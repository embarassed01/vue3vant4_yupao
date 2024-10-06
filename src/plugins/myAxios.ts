import axios from "axios";

const myAxios = axios.create({
    // baseURL: 'http://localhost:8080/api'
});
myAxios.defaults.withCredentials = true;  // 表示在向后端发送请求时默认携带上cookie

// 全局请求拦截器
myAxios.interceptors.request.use(function (config) {
    console.log(`我要发请求啦`,config);
    // do something before request is sent 
    return config;
}, function (error) {
    // do something with request error
    return Promise.reject(error);
});

// 全局响应拦截器 interceptorse
myAxios.interceptors.response.use(function (response) {
    console.log(`我收到你的响应啦`, response);
    // do something with response data
    return response.data;  //  解💼
}, function (error) {
    // do something with response error
    return Promise.reject(error);
});

export default myAxios;
