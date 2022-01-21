const baseURL = 'http://localhost:3000/api';

export async function parseResponse<ReturnType>(
  res: Response,
): Promise<ReturnType> {
  if (res.ok) {
    return (await res.json()) as ReturnType;
  } else {
    const e = await res.json();
    throw new Error(e?.message);
  }
}

export const checkProperties = (
  data: Record<string, any>,
  expectedPropertyKeys: string[],
) => {
  expectedPropertyKeys.forEach(key => {
    if (!Object.keys(data).includes(key)) {
      // 개발에 필요한 에러
      throw new Error(
        `서버에서 받아온 데이터 ${JSON.stringify(
          data,
        )}에 key가 ${key}인 데이터가 존재하지 않습니다.`,
      );
    }
  });
};

export default ({
  url = baseURL,
  options = {
    headers: {},
  },
}: {
  url?: string;
  options: Record<string, any>;
}) => ({
  get: async (restUrl: string) => {
    return await fetch(`${url}${restUrl}`, {
      method: 'GET',
      ...options,
    });
  },
  post: async <BodyType>(restUrl: string, body?: BodyType) => {
    return await fetch(`${url}${restUrl}`, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    });
  },
  put: async <BodyType>(restUrl: string, body?: BodyType) => {
    return await fetch(`${url}${restUrl}`, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : null,
      ...options,
    });
  },
  delete: async <BodyType>(restUrl: string) => {
    return await fetch(`${url}${restUrl}`, {
      method: 'PUT',
      ...options,
    });
  },
});
