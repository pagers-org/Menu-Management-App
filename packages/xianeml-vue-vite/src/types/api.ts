export type Tparams = {
  category?: string;
  menuId?: string;
  name?: string;
};

export type TmenuResponse = {
  menuId: string;
  name: string;
  isSoldOut: boolean;
};

export type TrequestConfig = {
  url: string;
  method: string;
  data?: { name?: string };
};
