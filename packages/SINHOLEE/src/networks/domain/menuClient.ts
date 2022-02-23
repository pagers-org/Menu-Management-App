import { MenuItem, MenuItemFormServer } from '../../modules/type';
import request, { parseResponse, checkProperties } from '../myRequest';

const menuRequest = request({
  options: {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  },
});

const adjustMenuItem = (menuItem: MenuItemFormServer): MenuItem => ({
  ...menuItem,
  id: menuItem.menuId,
  text: menuItem.name,
});

export const menuClient = {
  fetchByCategory: async (cate: string) => {
    const response = await menuRequest.get(`/category/${cate}/menu`);
    const menus = await parseResponse<MenuItemFormServer[]>(response);
    // validation check
    // 리턴값이 있는 모든 data 는 checkProperties 있는데.... 중복임
    menus.forEach(menu => checkProperties(menu, ['menuId', 'name', 'isSoldOut']));

    return menus.map(adjustMenuItem);
  },
  add: async (text: string, category: string): Promise<MenuItem> => {
    const response = await menuRequest.post(`/category/${category}/menu`, {
      name: text,
    });
    const res = await parseResponse<MenuItemFormServer>(response);
    // validation check
    checkProperties(res, ['menuId', 'name', 'isSoldOut']);
    return adjustMenuItem(res);
  },
  editText: async ({
    text,
    category,
    menuId,
  }: {
    text: string;
    category: string;
    menuId: string;
  }): Promise<MenuItem> => {
    /**
     *  제네릭이 자유롭게 추론되므로 해당 리퀘스트의 body 타입을 지정하고 싶으면 한 레이어 더 감ㄱ싸야 할듯
     */
    const response = await menuRequest.put<{ name: string }>(
      `/category/${category}/menu/${menuId}`,
      { name: text },
    );
    const res = await parseResponse<MenuItemFormServer>(response);
    // validation check
    checkProperties(res, ['menuId', 'name', 'isSoldOut']);
    return adjustMenuItem(res);
  },
  toggleSoldOut: async ({ category, menuId }: { category: string; menuId: string }) => {
    const response = await menuRequest.put(`/category/${category}/menu/${menuId}/soldout`);
    const res = await parseResponse<MenuItemFormServer>(response);
    // validation check
    checkProperties(res, ['menuId', 'name', 'isSoldOut']);
    return adjustMenuItem(res);
  },
  remove: async ({ category, menuId }: { category: string; menuId: string }) => {
    await menuRequest.delete(`/category/${category}/menu/${menuId}`);
  },
};
