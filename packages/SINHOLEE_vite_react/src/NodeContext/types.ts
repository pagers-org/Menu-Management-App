export type CategoryTitle = 'espresso' | 'frappuccino' | 'blended' | 'teavana' | 'desert';
export type GlobalUniqueNode = {
  id: string;
  type: string;
};

export interface MenuItem extends GlobalUniqueNode {
  type: '@menuItem';
  title: string;
  isSoldOut: boolean;
  '@category': string;
}
export interface Category extends GlobalUniqueNode {
  type: '@category';
  name: CategoryTitle;
  title_ko: string;
  postPosition: string;
}

export type ReducerType = MenuItem['type'] | Category['type'];
