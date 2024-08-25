import axios, { AxiosRequestConfig } from "axios";

export const get = <T>(url: string, config?: AxiosRequestConfig<T>) => {
  return axios.get<T>(url, config);
};
