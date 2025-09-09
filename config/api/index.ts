import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

interface CallAPIProps extends AxiosRequestConfig {
  token?: boolean;
  serverToken?: string;
}

export default async function callAPI({
  url,
  method,
  data,
  token,
  serverToken,
}: CallAPIProps) {
  const headers: Record<string, string> = {};

  if (serverToken) {
    headers.Authorization = `Bearer ${serverToken}`;
    console.log('🔑 Using serverToken:', serverToken);
  } else if (token) {
    const tokenCookies = Cookies.get('token');
    console.log('🔑 Token from cookies (raw):', tokenCookies);

    if (tokenCookies) {
      try {
        // decode token kalau sebelumnya disimpan pakai btoa()
        const decodedToken = atob(tokenCookies);
        headers.Authorization = `Bearer ${decodedToken}`;
        console.log('✅ Token after atob decode:', decodedToken);
      } catch (err) {
        console.error('❌ Gagal decode token dari cookies:', err);
      }
    } else {
      console.warn('⚠️ No token found in cookies');
    }
  }

  try {
    const response = await axios({
      url,
      method,
      data,
      headers,
    });
    return {
      error: false,
      message: 'success',
      data: response.data.data,
    };
  } catch (err) {
    const errorResponse = (err as any).response;
    console.error('❌ API Error:', errorResponse?.data);
    return {
      error: true,
      message: errorResponse?.data?.message || 'Terjadi kesalahan.',
      data: null,
    };
  }
}
