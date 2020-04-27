import Vue from 'vue';
import Axios from 'axios';
import { MessageBox } from 'element-ui';
// 负责管理axios的各种配置，前缀，token管理 路由管理


// 设置axios的基础前缀
const service = Axios.create({
    baseURL: '/api/',
    timeout: 5000
})

// 拦截器 
export default ({ store, redirect }) => {
    // 添加请求拦截器
    service.interceptors.request.use(function(config) {
        // 在发送请求之前做些什么
        const token = window.localStorage.getItem('token');
        if (token) {
            config.headers.common['Authorization'] = 'Bearr ' + token //设置token到请求头里面，方便中间件获取token信息
        }
        return config;
    }, function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

    // 添加响应拦截器
    service.interceptors.response.use(function(response) {
        // 对响应数据做点什么
        let { data } = response //从response里解构出data,其他应用层用不到的过滤掉
        if (data.code === 0) {

        } else if (data.code === -666) {
            MessageBox.confirm("登录已过期", "过期", {
                confirmButtonText: '登录',
                showCancelButton: false,
                type: 'warning'
            }).then(() => {
                localStorage.removeItem('token');
                redirect({ path: '/login' })
            })
        }
        return data;
    }, function(error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    });
}

// 挂载一个全局的axios实例
Vue.prototype.$http = service

export const http = service