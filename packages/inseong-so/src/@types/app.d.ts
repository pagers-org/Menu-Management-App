declare module 'domain' {
  export interface CategoryEntity {
    id: string;
    text: string;
    displayText: string;
  }

  export interface MenuItemEntity {
    menuId: string;
    name: string;
    isSoldOut: boolean;
  }

  export interface CategoryContext extends CategoryEntity {
    menus: MenuItemEntity[];
    selected: boolean;
  }

  export interface MenuContext {
    categories: CategoryContext[];
    showSpinner: boolean;
  }
}
