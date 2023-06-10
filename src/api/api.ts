import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = {
  baseURL: 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json',
    Accepts: 'application/json'
  }
};

const axiosInstance = axios.create(axiosConfig);

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = sessionStorage.getItem('token');
  if (token) {
    const newConfig = { ...config };
    newConfig.headers.Authorization = `Bearer ${token.replaceAll('"', '')}`;
    return newConfig;
  }
  return config;
};

axiosInstance.interceptors.request.use(onRequest);

const buildApi = (instance: AxiosInstance) => {
  return {
    get: <T>(url: string, config: AxiosRequestConfig = {}) => instance.get<T>(url, config),
    delete: <T>(url: string, config: AxiosRequestConfig = {}) => instance.delete<T>(url, config),
    post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      instance.post<T>(url, body, config),
    patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      instance.patch<T>(url, body, config),
    put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      instance.put<T>(url, body, config)
  };
};

export const api = buildApi(axiosInstance);
