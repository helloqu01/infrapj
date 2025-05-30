// lib/axios.ts
import axios, {
    AxiosInstance,
    AxiosError,
    InternalAxiosRequestConfig,
  } from 'axios';
  import { refreshAccessToken } from './auth';
import { handleSessionExpire } from '../utils/session';
  
  const API_URL = 'https://codingbyohj.com/api';
  // const API_URL = 'http://localhost:8080/api';
  
  const api: AxiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true, // ✅ refreshToken 쿠키 포함
  });
  
  // 요청 인터셉터
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  // 응답 인터셉터 - 401 시 자동 refresh
  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
  
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const { accessToken } = await refreshAccessToken();
          localStorage.setItem('token', accessToken);
          originalRequest.headers['X-Auth-Token'] = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch {
          handleSessionExpire(); 
        }
      }
  
      return Promise.reject(error);
    }
  );
  
  export default api;
  