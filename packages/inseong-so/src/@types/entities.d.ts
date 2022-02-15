declare module 'menu' {
  export interface MenuEntity {
    menuId: string;
    name: string;
    isSoldOut: boolean;
  }
}

declare module 'category' {
  export interface CategoryEntity {
    id: string;
    text: string;
    menus: [];
  }
}
