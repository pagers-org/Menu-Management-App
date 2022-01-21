import { Tmenu, Tcategory } from '../types/store.js';

export const getCategoryMenus = (menus: Tmenu[], currentTab: Tcategory) => {
  return menus.filter(menu => menu.categoryId === currentTab.id);
};
