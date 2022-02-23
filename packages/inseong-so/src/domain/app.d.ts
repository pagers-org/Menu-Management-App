declare module 'domain' {
  export interface CategoryEntity {
    id: string;
    text: string;
    displayText: string;
  }

  export interface MenuEntity {
    menuId: string;
    name: string;
    isSoldOut: boolean;
  }

  export interface CategoryContext extends CategoryEntity {
    menus: MenuEntity[];
    selected: boolean;
  }

  export interface AppContext {
    categories: CategoryContext[];
  }
}
