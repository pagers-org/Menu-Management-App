// actions
import {
  CoffeeKeys,
  MenuAddAction,
  MenuEditAction,
  MenuItem,
  MenuRemoveAction,
  MenuSoldOutAction,
  TabChangeAction,
  FetchMenusByCategoryAction,
} from './type';

export const addMenu = (menu: MenuItem): MenuAddAction => {
  return {
    type: 'ADD',
    payload: {
      menu,
    },
  };
};
export const fetchMenus = (
  cate: CoffeeKeys,
  menus: MenuItem[],
): FetchMenusByCategoryAction => {
  return {
    type: 'FETCH_MENUS_BY_CATEGORY',
    payload: {
      category: cate,
      menus,
    },
  };
};

export const editMenu = (menu: MenuItem): MenuEditAction => {
  return {
    type: 'NAME_EDIT',
    payload: {
      menu,
    },
  };
};

export const changeTab = (tabKey: CoffeeKeys): TabChangeAction => ({
  type: 'CHANGE_TAB',
  payload: {
    tabKey,
  },
});

export const removeMenu = (menuId: string): MenuRemoveAction => {
  return {
    type: 'REMOVE',
    payload: {
      id: menuId,
    },
  };
};

export const soldOutMenu = (menuId: string): MenuSoldOutAction => {
  return {
    type: 'SOLD_OUT',
    payload: {
      id: menuId,
    },
  };
};
