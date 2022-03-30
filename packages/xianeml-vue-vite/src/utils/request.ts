import { SERVER_URL } from '../utils/constants/env.js';
import { TmenuResponse, TrequestConfig } from '../types/api.js';
import { Tmenu } from '../types/store.js';

export default async (config: TrequestConfig) => {
  const { url, method, data } = config;

  const requestUrl = SERVER_URL + url;
  const headers = {
    'Content-Type': 'application/json',
  };

  // try {
  const response = await fetch(requestUrl, {
    method,
    headers,
    body: JSON.stringify(data),
  });
  const resData = await response.json();

  if (response.status !== 200) throw new Error(resData.message);
  if (method === 'GET') {
    return resData.map((data: TmenuResponse) => ({
      id: data.menuId,
      menuName: data.name,
      inStock: !data.isSoldOut,
    })) as Tmenu[];
  }

  // } catch (e) {
  // console.error(e);
  // }
  // TODO: 여기에서 에러 캐치하면 컴포넌트 쪽에서 에러핸들링 못함.
};
