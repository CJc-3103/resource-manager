import axios from 'axios';
// import baseURL from './baseURL';
import store from '@/store';

// axios.defaults.baseURL = 'http://139.196.42.209:5004/api/'; // api无效
// axios.defaults.baseURL = baseURL;
const instance = axios.create({
    //   baseURL: baseURL,
    timeout: 5000,
});

// 添加请求拦截器
instance.interceptors.request.use((config) => {
    config.headers.Authorization = store.state.token;
    return config;
});

// 添加响应拦截器
instance.interceptors.response.use(
    (response) => {
        // 响应返回的数据
        return response.data;
    },
    (err) => {
        // 相应错误信息
        return Promise.reject(err);
    }
);

// 二次封装请求方法，将状态码处理等过程进行封装
const http = {};
http.get = (url, options) => {
    return new Promise((res, rej) => {
        instance
            .get(url, options)
            .then((response) => {
                if (response.code === 20000) {
                    res(response.data);
                } else {
                    rej(response.message);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    });
};

http.post = (url, data, options) => {
    return new Promise((res, rej) => {
        instance
            .post(url, data, options)
            .then((response) => {
                if (response.code === 0) {
                    res(response.data);
                } else {
                    rej(response.message);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    });
};

export default http;
// export { http, instance };
