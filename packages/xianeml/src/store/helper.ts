import { Treducer, TmenuAction, Tlistener, Tstate } from '../types/store.js';

export function createStore(reducer: Treducer) {
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

  const getState = () => {
    return JSON.parse(localStorage.getItem('state') || '{}');
  };

  const dispatch = (action: TmenuAction) => {
    const storageState = JSON.parse(localStorage.getItem('state') || '{}');

    if (!storageState) {
      localStorage.setItem('state', JSON.stringify(initialState));
    } else {
      const newState = reducer(storageState, action);
      localStorage.setItem('state', JSON.stringify(newState));
    }
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
}
