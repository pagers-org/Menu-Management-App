import { SERVER_URL } from '../utils/constants/env.js';
import { TmenuResponse, TrequestConfig } from '../types/api.js';
import { Tmenu } from '../types/store.js';

export default async (config: TrequestConfig) => {
  const { url, method, data } = config;

  const requestUrl = SERVER_URL + url;
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(requestUrl, {
      method,
      headers,
      body: JSON.stringify(data),
    });

    if (response.status !== 200) throw Error('요청 에러');
    if (method !== 'GET') return;

    const resData = await response.json();

    return resData.map((data: TmenuResponse) => ({
      id: data.menuId,
      menuName: data.name,
      inStock: !data.isSoldOut,
    })) as Tmenu[];
  } catch (e) {
    console.error(e);
  }
};
