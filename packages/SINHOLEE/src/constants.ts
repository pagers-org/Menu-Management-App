export const EVENTS = {
  click: 'click',
  submit: 'submit',
} as const;

export const SELECTORS = {
  CLASS: {
    INPUT_FIELD: '.input-field',
    MENU_COUNT: '.menu-count',
    MENU_REMOVE_BUTTON: '.menu-remove-button',
    MENU_EDIT_BUTTON: '.menu-edit-button',
  },
  ID: {
    ESPRESSO_MENU_FORM: '#espresso-menu-form',
    ESPRESSO_MENU_LIST: '#espresso-menu-list',
  },
} as const;

export const MESSAGES = {
  CONFIRM_REMOVE: '정말 삭제하시겠습니까?',
  PROMPT_EDIT_MENU: '메뉴명을 수정하세요.',
} as const;
export const FETCH_RESULT = {
  OK: 'ok',
  SERVER_ERROR: 'server_error',
  CLIENT_ERROR: 'client_error',
} as const;
