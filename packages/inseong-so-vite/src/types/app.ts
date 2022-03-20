export interface Menu {
  menuId: string;
  name: string;
  isSoldOut: boolean;
  createdAt?: Date;
}

export interface Category {
  id: string;
  text: string;
  menus: Menu[];
  selected: boolean;
}

export interface State {
  categories: Category[];
  selected: string;
}
