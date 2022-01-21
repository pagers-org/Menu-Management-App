declare module 'Store' {
  export type TItem = { key: string; value: any };

  export interface IStore {
    subscribe: (listener: (...args: any[]) => any) => () => void;
    notify: () => void;
    create: (key: string, value: any, isNotify = true) => void;
    produce: (...args: any[]) => void;
    read: (key: string) => any;
    setState: (newState: TItem, isNotify: boolean) => void;
  }
}
