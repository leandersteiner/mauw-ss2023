import axios, { AxiosResponse } from 'axios';

export const Get = <T,>(url: string, setState: any) => {
  axios.get(url).then((response: AxiosResponse<T[]>) => {
    setState(response.data);
  });
};
