import { Tcategory, TmenuAction } from '../types/store.js';
import { Tstate } from '../types/store.js';

/* 액션 타입 정의 */
const CREATE_MENU = 'CREATE_MENU' as const;
const EDIT_MENU = 'EDIT_MENU' as const;
const REMOVE_MENU = 'REMOVE_MENU' as const;
const SOLD_OUT_MENU = 'SOLD_OUT_MENU' as const;
const SET_CURRENT_TAB = 'SET_CURRENT_TAB' as const;

/* 액션 생성 함수 */
export const createMenuItem = (categoryId: string, menuName: string) => ({
  type: CREATE_MENU,
  payload: {
    categoryId,
    menuName,
  },
});

export const editMenuItem = (menuId: string, menuName: string) => ({
  type: EDIT_MENU,
  payload: {
    menuId,
    menuName,
  },
});

export const removeMenuItem = (menuId: string) => ({
  type: REMOVE_MENU,
  payload: {
    menuId,
  },
});

export const soldOutMenuItem = (menuId: string) => ({
  type: SOLD_OUT_MENU,
  payload: {
    menuId,
  },
});

export const setCurrentTab = (categoryId: string) => ({
  type: SET_CURRENT_TAB,
  payload: {
    categoryId,
  },
});

// 리듀서는 새로운 상태를 생성하는 함수.
export default function reducer(state: Tstate, action: TmenuAction) {
  const { type, payload } = action;
  const { categoryId = '', menuId = '', menuName = '' } = payload;
  const { menus, categories } = state;

  switch (type) {
    case CREATE_MENU: {
      const categoryMenus = menus.filter(menu => {
        return menu.categoryId === categoryId;
      });
      // TODO: 중복 가능성 의심, UUID 적용
      const id = `${categoryId}-menu-id-${categoryMenus.length}`;
      const newMenu = { id, categoryId, menuName, inStock: true };
      const newMenuList = [...menus, newMenu];
      return { ...state, menus: newMenuList };
    }
    case EDIT_MENU: {
      const newMenuList = menus.map(menu => {
        if (menu.id === menuId) {
          menu.menuName = menuName;
        }
        return menu;
      });
      return { ...state, menus: newMenuList };
    }
    case REMOVE_MENU: {
      const newMenuList = menus.filter(menu => menu.id !== menuId);
      return { ...state, menus: newMenuList };
    }
    case SOLD_OUT_MENU: {
      const newMenuList = menus.map(menu => {
        if (menu.id === menuId) {
          menu.inStock = false;
        }
        return menu;
      });
      return { ...state, menus: newMenuList };
    }
    case SET_CURRENT_TAB: {
      // TODO: 에러처리 및  undefiend 체크하는 공통함수 구현
      const category = categories.find(category => {
        return category.id === categoryId;
      }) as Tcategory;
      return { ...state, currentTab: category };
    }
    default:
      return state;
  }
}
