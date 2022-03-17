export default function createStore(reducer: Redux.reducer): Redux.Store {
  let state: any;
  const listeners: Redux.subscribeFunction[] = [];

  const dispatch: Redux.dispatch = (action: Redux.Action) => {
    state = reducer(action, state);
    publish();
  };

  const getState: Redux.getState = () => state;
  const subscribe: Redux.subscribe = (fn: Redux.subscribeFunction) => listeners.push(fn);
  const publish = () => listeners.forEach(listener => listener());

  return {
    subscribe,
    getState,
    dispatch,
  };
}
