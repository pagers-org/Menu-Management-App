import request from '../utils/request.js';
import { Tparams } from '../types/api.js';

/* 카테고리별 메뉴리스트 조회 */
export const getMenusAPI = (category: string) => {
  return request({
    url: `/api/category/${category}/menu`,
    method: 'GET',
  });
};

/* 메뉴 생성 */
export const createMenuAPI = ({ category, name }: Tparams) => {
  return request({
    url: `/api/category/${category}/menu`,
    method: 'POST',
    data: { name },
  });
};

/* 메뉴 이름 수정 */
export const modifyMenuAPI = ({ category, menuId, name }: Tparams) => {
  return request({
    url: `/api/category/${category}/menu/${menuId}`,
    method: 'PUT',
    data: { name },
  });
};

/* 메뉴 품절 처리 */
export const soldOutMenuAPI = ({ category, menuId }: Tparams) => {
  return request({
    url: `/api/category/${category}/menu/${menuId}/soldout`,
    method: 'PUT',
  });
};

/* 메뉴 삭제 */
export const deleteMenuAPI = ({ category, menuId }: Tparams) => {
  return request({
    url: `/api/category/${category}/menu/${menuId}`,
    method: 'DELETE',
  });
};
