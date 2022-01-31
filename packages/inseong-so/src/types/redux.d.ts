declare module 'redux' {
  export type TAnyState = {
    [key: string | symbol]: any;
  };

  export interface TAction<T = any> {
    type: T;
    [key: string]: any;
  }

  export interface IAnyAction extends TAction {
    [key: string | symbol]: any;
  }

  export type TReducer<S = any, A extends TAction = IAnyAction> = (state?: S, action?: A) => S;

  export interface IDispatch<A extends TAction = IAnyAction> {
    <T extends A>(action: T, ...extraArgs: any[]): T;
  }

  export interface IUnsubscribe {
    (): void;
  }

  export interface IStore<T = any> {
    dispatch: (action: TAction<any>) => void;
    subscribe: (callback: TAnyState) => void;
    getState: (reduce?: string, key?: string) => any;
    actionsEmitter: T;
  }
}
