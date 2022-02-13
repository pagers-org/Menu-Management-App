interface Store {
  subscribe: subscribe;
  getState: getState;
  dispatch: dispatch;
}

interface dispatch {
  (action: Action): void;
}

interface getState {
  (): any;
}

interface subscribe {
  (fn: () => void): void;
}

interface Action {
  type: string;
  data?: any;
}

interface reducer {
  (action: Action, state?: any): Object;
}

export { Store, dispatch, getState, subscribe, Action, reducer };
