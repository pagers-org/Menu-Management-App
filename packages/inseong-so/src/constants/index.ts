export const CATEGORIES = [
  { id: 'espresso', text: '☕ 에스프레소' },
  { id: 'frappuccino', text: '🥤 프라푸치노' },
  { id: 'blended', text: '🍹 블렌디드' },
  { id: 'teavana', text: '🍸 티바나' },
  { id: 'desert', text: '🍰 디저트' },
];

export const ERROR_MESSAGE = {
  INVALIID_INPUT: '정확한 메뉴명을 입력해주세요.',
};

/**
 * @see https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking/
 */
export const HTTP_METHOD = <const>{
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};
