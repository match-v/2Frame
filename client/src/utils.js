import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', // 设置基础 URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加请求拦截器，在每个请求发送前自动添加 Authorization 头部
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 封装 GET 请求方法
export const getRequestListView = async (url, params) => {
  try {
    const response = await apiClient.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('请求错误：', error);
    throw error;
  }
};


