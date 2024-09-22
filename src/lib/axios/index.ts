import axios, { AxiosRequestConfig } from "axios";

export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig<T>) => {
    return axios.get<T>(url, config);
  },
  delete: <T>(url: string, config?: AxiosRequestConfig<T>) => {
    return axios.delete<T>(url, config);
  },
  post: <T, R>(url: string, config?: AxiosRequestConfig<T>) => {
    return axios.post<T>(url, config);
  }
};
