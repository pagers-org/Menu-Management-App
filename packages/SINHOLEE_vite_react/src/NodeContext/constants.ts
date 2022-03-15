export const GLOBAL_UNIQUE_TYPE = {
  category: '@category',
  menuItem: '@menuItem',
} as const;

export const TYPE_TO_REDUCER_MAPPER = {
  [GLOBAL_UNIQUE_TYPE.category]: 'categories',
  [GLOBAL_UNIQUE_TYPE.menuItem]: 'menus',
} as const;
