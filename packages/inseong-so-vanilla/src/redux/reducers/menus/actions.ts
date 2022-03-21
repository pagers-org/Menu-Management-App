import { createRequestSaga, createRequestActionType, takeEvery } from '../../common';
import { loadMenu, insertItem, modifyItem, soldOutItem, removeItem } from '@/client';

export const [LOAD_MENU, LOAD_MENU_SUCCESS, LOAD_MENU_FAILURE] =
  createRequestActionType('LOAD_MENU');

export const [INSERT_MENU_ITEM, INSERT_MENU_SUCCESS, INSERT_MENU_FAILURE] =
  createRequestActionType('INSERT_MENU_ITEM');

export const [MODIFY_MENU_ITEM, MODIFY_MENU_SUCCESS, MODIFY_MENU_FAILURE] =
  createRequestActionType('MODIFY_MENU_ITEM');

export const [SOLD_OUT_MENU_ITEM, SOLD_OUT_MENU_SUCCESS, SOLD_OUT_MENU_FAILURE] =
  createRequestActionType('SOLD_OUT_MENU_ITEM');

export const [REMOVE_MENU_ITEM, REMOVE_MENU_SUCCESS, REMOVE_MENU_FAILURE] =
  createRequestActionType('REMOVE_MENU_ITEM');

export const loadMenuRequest = (action: any) => createRequestSaga(LOAD_MENU, loadMenu, action);

export const insertItemRequest = (action: any) =>
  createRequestSaga(INSERT_MENU_ITEM, insertItem, action);

export const modifyItemRequest = (action: any) =>
  createRequestSaga(MODIFY_MENU_ITEM, modifyItem, action);

export const soldOutItemRequest = (action: any) =>
  createRequestSaga(SOLD_OUT_MENU_ITEM, soldOutItem, action);

export const removeItemRequest = (action: any) =>
  createRequestSaga(REMOVE_MENU_ITEM, removeItem, action);

export function* menuSaga() {
  yield* takeEvery(LOAD_MENU, loadMenuRequest);
  yield* takeEvery(INSERT_MENU_ITEM, insertItemRequest);
  yield* takeEvery(MODIFY_MENU_ITEM, modifyItemRequest);
  yield* takeEvery(SOLD_OUT_MENU_ITEM, soldOutItemRequest);
  yield* takeEvery(REMOVE_MENU_ITEM, removeItemRequest);
}
