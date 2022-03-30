import { INITIAL_CATEGORIES } from '@/constants';
import { createUUID } from '@/helper';
import { Category, Menu, State } from '@/types';
import { defineStore } from 'pinia';

export const useMenuStore = defineStore({
  id: 'menu',
  state: (): State => ({
    categories: INITIAL_CATEGORIES,
    selected: 'espresso',
  }),
  getters: {
    category(): Category {
      const targetCategory = this.categories.find(({ id }) => this.selected === id);
      if (targetCategory === undefined) throw new Error('해당 카테고리가 존재하지 않아요!🤔');
      return targetCategory;
    },
    menus(): Menu[] {
      return this.category.menus;
    },
  },
  actions: {
    selectCategory(categoryId: string) {
      this.selected = categoryId;
      this.categories = this.categories.map(category => ({ ...category, selected: categoryId === category.id }));
    },
    add(name: string) {
      const addMenu = {
        menuId: createUUID(),
        name,
        isSoldOut: false,
      };
      this.category.menus.push(addMenu);
    },
    soldOut({ menuId, isSoldOut }: Omit<Menu, 'name'>) {
      const soldOutMenus = this.category.menus.map(menuItem => {
        if (menuItem.menuId === menuId) return { ...menuItem, isSoldOut };
        return menuItem;
      });
      this.category.menus = soldOutMenus;
    },
    modify({ menuId, name }: Menu) {
      const modifiedMenus = this.category.menus.map(menuItem => {
        if (menuItem.menuId === menuId) return { ...menuItem, name };
        return menuItem;
      });
      this.category.menus = modifiedMenus;
    },
    remove({ menuId }: Menu) {
      const removedMenus = this.category.menus.filter(menuItem => menuItem.menuId !== menuId);
      this.category.menus = removedMenus;
    },
  },
});
