import { EventEmitter, logAction } from '../common';
import { debounce, deepClone, deepCloneAndFreeze } from '@/helpers/common';
import { TAction, TReducer, TAnyState } from 'redux';

export const createStore = (reducer: TReducer) => {
  const state = reducer();
  const observers: TAnyState = {};
  const actionsEmitter = new EventEmitter();

  const dispatch = (action: TAction) => {
    const newState = reducer(state, action);

    for (const [key, value] of Object.entries(newState)) {
      if (state[key] === value) continue;
      state[key] = value;
    }

    actionsEmitter.emit(action.type, action);

    if ((action.type as string).includes('SUCCESS') || (action.type as string).includes('FAILURE'))
      notifyAll(newState);
    logAction(action, newState);
  };

  const subscribe = (callback: TAnyState) => {
    Object.keys(callback).forEach(_key => {
      observers[_key] = debounce(callback[_key]);
    });
  };

  const notifyAll = (state: any) => {
    Object.keys(observers).forEach(_key => {
      observers[_key](deepClone(state));
    });
  };

  const getState = () => deepCloneAndFreeze(state);

  return { dispatch, subscribe, getState, actionsEmitter };
};
