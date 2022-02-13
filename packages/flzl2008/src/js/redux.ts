import { Store, dispatch, getState, subscribe, Action, reducer } from './types/types.js';

export default function createStore(reducer: reducer): Store {
  let state: Record<string, any>;
  const listeners: (() => void)[] = [];

  const dispatch: dispatch = (action: Action) => {
    state = reducer(action, state);
    publish();
  };

  const getState: getState = () => state;
  const subscribe: subscribe = (fn: () => void) => listeners.push(fn);
  const publish = () => listeners.forEach(listener => listener());

  return {
    subscribe,
    getState,
    dispatch,
  };
}
