let currentState: any;
let listeners: Map<string, () => void> = new Map();

export type Action<AType = any, TPayload = any> = {
  type: AType;
  payload: TPayload;
};
type Reducer<TState, TAction> = (state: TState, action: TAction) => TState;
export type ReturnCreateStore<TState = any, TAction = any> = {
  reset: () => void;
  getState: () => Readonly<TState>;
  dispatch: (action: TAction) => void;
  subscribe: (id: string, listener: () => void) => () => void;
};

export function createStore<TState, TActions>(
  reducer: Reducer<TState, TActions>,
  initialState: TState,
): ReturnCreateStore<TState, TActions> {
  currentState = initialState;
  return {
    reset: () => {
      currentState = initialState;
      listeners = new Map();
    },
    getState: () => {
      const res: Readonly<TState> = currentState as TState;
      return res;
    },
    dispatch: action => {
      const result = reducer(currentState, action);
      currentState = result;
      console.log(listeners);
      listeners.forEach(fn => fn());
    },

    subscribe: (id, listener) => {
      listeners.set(id, listener);
      return () => {
        listeners.delete(id);
      };
    },
  };
}
