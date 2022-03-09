// action type
export const ADD_MENU_NAME = 'ADD_MENU_NAME';
export const EDIT_MENU_NAME = 'EDIT_MENU_NAME';
export const DELETE_MENU_NAME = 'DELETE_MENU_NAME';

// action create
export const addMenuName = (name: string) => ({ type: ADD_MENU_NAME, data: name });
export const editMenuName = (data: any) => ({
  type: EDIT_MENU_NAME,
  data: data,
});
export const deleteMenuName = (removeIndex: number) => ({
  type: DELETE_MENU_NAME,
  data: removeIndex,
});
