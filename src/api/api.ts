import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const axiosConfig = {
  baseURL: 'http://localhost:8081'
};

const axiosInstance = axios.create(axiosConfig);

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
