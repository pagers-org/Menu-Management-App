import { Action } from '../core/myRedux';
import { Coffee } from './constants';

export type CoffeeKeys = keyof typeof Coffee;

export type MenuItemFormServer = {
  id: string;
  name: string;
  isSoldOut: boolean;
};
export type MenuItem = {
  id: string;
  text: string;
  isSoldOut: boolean;
};
export type DefaultState = {
  currentTab: CoffeeKeys;
  menus: { [K in CoffeeKeys]: Array<MenuItem> };
};
// 아 어떻게 관리해야 좀 더 깔끔하게 타입 지정할 수 있을까요...
// type MenuActionKey = 'ADD' | 'NAME_EDIT' | 'REMOVE' | 'SOLD_OUT';
// type TabActionKey = 'CHANGE_TAB';

export type FetchMenusByCategoryAction = Action<
  'FETCH_MENUS_BY_CATEGORY',
  { category: CoffeeKeys; menus: MenuItem[] }
>;
export type MenuAddAction = Action<'ADD', { menu: MenuItem }>;
export type MenuEditAction = Action<'NAME_EDIT', { menu: MenuItem }>;
export type MenuRemoveAction = Action<'REMOVE', { id: string }>;
export type MenuSoldOutAction = Action<'SOLD_OUT', { id: string }>;
export type TabChangeAction = Action<'CHANGE_TAB', { tabKey: CoffeeKeys }>;

export type Actions =
  | MenuAddAction
  | MenuEditAction
  | MenuRemoveAction
  | MenuSoldOutAction
  | TabChangeAction
  | FetchMenusByCategoryAction;
