// src/api/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://church-app-backend-q9z7.onrender.com/',  // Django API URL
});

// const axiosInstance = axios.create({
//   baseURL: 'http://127.0.0.1:8000/',  // Django API URL
// });

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle token expiration, logout, or refresh token logic here
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;