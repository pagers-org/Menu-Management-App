export const MENU_LIST_ATTR = {
  elName: 'li',
  id: 'espresso-menu-id',
  className: 'menu-list-item d-flex items-center py-2',
} as const;

export const MENU_NAME_ATTR = {
  elName: 'span',
  id: 'espresso-menu-name',
  className: 'w-100 pl-2 menu-name',
} as const;

export const EDIT_BTN_ATTR = {
  elName: 'button',
  id: 'espresso-edit-button',
  className: 'bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button',
  text: '수정',
} as const;

export const REMOVE_BTN_ATTR = {
  elName: 'button',
  id: 'espresso-remove-button',
  className: 'bg-gray-50 text-gray-500 text-sm menu-remove-button',
  text: '삭제',
} as const;
