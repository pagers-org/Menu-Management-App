// action type
export const ADD_MENU_NAME = 'ADD_MENU_NAME';
export const EDIT_MENU_NAME = 'EDIT_MENU_NAME';
export const DELETE_MENU_NAME = 'DELETE_MENU_NAME';
export const INIT_STATE = 'INIT_STATE';

// action create
export const addMenuName = (name: string): Redux.Action => ({ type: ADD_MENU_NAME, data: name });
export const editMenuName = (data: editMenuData): Redux.Action => ({
  type: EDIT_MENU_NAME,
  data: data,
});
export const deleteMenuName = (removeIndex: number): Redux.Action => ({
  type: DELETE_MENU_NAME,
  data: removeIndex,
});
export const initState = (): Redux.Action => ({ type: INIT_STATE });
