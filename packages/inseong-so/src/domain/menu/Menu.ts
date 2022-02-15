import { MenuEntity } from 'menu';

export default class Menu {
  menuKey: string;
  menus: readonly MenuEntity[];

  constructor(menuKey = 'espresso', menus: MenuEntity[] = []) {
    this.menuKey = menuKey;
    this.menus = menus;
  }

  addItem(name: string) {}

  modifyItem(menuId: string, name: string) {}

  removeItem(menuId: string) {}

  soldOutItem(menuId: string) {}
}
