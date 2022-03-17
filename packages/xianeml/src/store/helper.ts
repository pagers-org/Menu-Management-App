import { Treducer, TmenuAction, Tlistener, Tstate, Tstore } from '../types/store.js';
import { getMenus } from '../api/menu.js';

export const createStore = (reducer: Treducer): Tstore => {
  const initialState: Tstate = {
    menus: [],
    currentTab: { id: 'espresso', name: '☕ 에스프레소' },
    categories: [
      { id: 'espresso', name: '☕ 에스프레소' },
      { id: 'frappuccino', name: '🥤 프라푸치노' },
      { id: 'blended', name: '🍹 블렌디드' },
      { id: 'teavana', name: '🍸 티바나' },
      { id: 'desert', name: '🍰 디저트' },
    ],
  };

  const listeners: Tlistener[] = [];

  const getState = async () => {
    const menus = await getMenus(initialState.currentTab.id);
    const state = { ...initialState, menus };

    return state;
  };

  const dispatch = (action: TmenuAction) => {
    reducer(initialState, action);
    publish();
  };

  const subscribe = (callback: Tlistener) => {
    listeners.push(callback);
  };
  const publish = () => {
    listeners.forEach((callback: Tlistener) => callback());
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
};
