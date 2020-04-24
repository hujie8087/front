

import Vue from 'vue';
import Axios from 'axios';

// 负责管理axios的各种配置，前缀，token管理 路由管理


// 设置axios的基础前缀
const service = Axios.create({
    baseURL: '/api/',
    timeout:5000
})

// 拦截器 
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let {data} = response  //从response里解构出data,其他应用层用不到的过滤掉
    return data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

// 挂载一个全局的axios实例
Vue.prototype.$http = service

export const http =  service