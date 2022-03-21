import {
  INSERT_MENU_FAILURE,
  INSERT_MENU_SUCCESS,
  LOAD_MENU_FAILURE,
  LOAD_MENU_SUCCESS,
  MODIFY_MENU_FAILURE,
  MODIFY_MENU_SUCCESS,
  REMOVE_MENU_FAILURE,
  REMOVE_MENU_SUCCESS,
  SOLD_OUT_MENU_FAILURE,
  SOLD_OUT_MENU_SUCCESS,
} from './actions';
import { TMenuPageProps, TMenuProps } from 'App';
import { TReducer } from 'redux';
import { CATEGORIES } from '~/src/constants';

interface StateProps {
  categories: TMenuPageProps[];
  selected: Partial<TMenuPageProps>;
}

export const initialState: StateProps = {
  categories: CATEGORIES.map(category => ({ ...category, menuList: [] })),
  selected: {},
};

const menus: TReducer = (state = initialState, action = { type: '' }) => {
  switch (action.type) {
    case LOAD_MENU_SUCCESS: {
      const selectedMenu = state.categories.map((category: TMenuPageProps) => {
        if (category.id !== action.category) return category;
        return { ...category, menuList: action.data };
      });
      return {
        ...state,
        categories: selectedMenu,
        selected: selectedMenu.find((category: TMenuPageProps) => category.id === action.category),
      };
    }
    case INSERT_MENU_SUCCESS: {
      const targetCategory = state.categories.find(
        (category: TMenuPageProps) => category.id === action.category,
      );
      targetCategory.menuList.push(action.data);
      const insertedMenu = state.categories.map((category: TMenuPageProps) => {
        if (category.id === targetCategory.id) return targetCategory;
        return category;
      });
      return {
        ...state,
        categories: insertedMenu,
        selected: targetCategory,
      };
    }
    case MODIFY_MENU_SUCCESS:
    case SOLD_OUT_MENU_SUCCESS: {
      const updatedItem = state.categories
        .find((category: TMenuPageProps) => category.id === action.category)
        .menuList.map((menu: TMenuProps) => {
          if (menu.menuId === action.data.menuId) return action.data;
          return menu;
        });
      const updatedMenu = state.categories.map((category: TMenuPageProps) => {
        if (category.id !== action.category) return category;
        return { ...category, menuList: updatedItem };
      });
      return {
        ...state,
        categories: updatedMenu,
        selected: updatedMenu.find((category: TMenuPageProps) => category.id === action.category),
      };
    }
    case REMOVE_MENU_SUCCESS: {
      const removedItem = state.categories
        .find((category: TMenuPageProps) => category.id === action.category)
        .menuList.filter((menu: TMenuProps) => menu.menuId !== action.menuId);
      const removedMenu = state.categories.map((category: TMenuPageProps) => {
        if (category.id !== action.category) return category;
        return { ...category, menuList: removedItem };
      });
      return {
        ...state,
        categories: removedMenu,
        selected: removedMenu.find((category: TMenuPageProps) => category.id === action.category),
      };
    }
    /**
     * @todo 에러 처리
     */
    case LOAD_MENU_FAILURE:
    case INSERT_MENU_FAILURE:
    case MODIFY_MENU_FAILURE:
    case SOLD_OUT_MENU_FAILURE:
    case REMOVE_MENU_FAILURE:
    default:
      return state;
  }
};

export default menus;
