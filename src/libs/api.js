import axios from 'axios';
import { message } from 'antd';

const api = axios.create({
  baseURL: window.blocklet ? window.blocklet.prefix : '/',
  timeout: 20000,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API call failed:', error);
    message.error(`fail: ${error}`);
    return Promise.reject(error);
  }
);

export default api;
