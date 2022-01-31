import { SERVER_URL } from '../utils/constants/env.js';

type Tconfig = {
  url: string;
  method: string;
  data?: { name?: string };
};

export default async (config: Tconfig) => {
  const { url, method, data } = config;

  const requestUrl = SERVER_URL + url;

  const response = await fetch(requestUrl, {
    method,
    body: JSON.stringify(data),
  });
  console.log('요청정보? >>>> ', response);
  const resData = await response.json();

  if (response.status === 200) {
    return resData;
  } else {
    throw new Error('서버요청 에러!!');
  }
};
