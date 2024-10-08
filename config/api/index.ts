import axios, { AxiosRequestConfig } from 'axios';

export default async function CallApi({
  url,
  method,
  data,
}: AxiosRequestConfig) {
  const response = await axios({
    url,
    method,
    data,
  }).catch((err) => err.response);

  if (response.status > 300) {
    const res = {
      error: true,
      message: response.data.message,
      data: null,
    };
    return res;
  }
  const res = {
    error: false,
    message: 'Success',
    data: response.data.data,
  };
  return res;
}
