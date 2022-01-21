export type Treducer = (state: Tstate, action: TmenuAction) => Tstate;

export type Tstate = {
  menus: Tmenu[];
  currentTab: Tcategory;
  categories: Tcategory[];
};

export type TmenuAction = {
  type: string;
  payload: {
    categoryId?: string;
    menuId?: string;
    menuName?: string;
  };
};

export type Tmenu = {
  id: string;
  categoryId: string;
  menuName: string;
  inStock: boolean;
};

export type Tcategory = {
  id: string;
  name: string;
};

export type Tlistener = () => void;
