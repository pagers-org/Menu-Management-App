declare module 'Storage' {
  export type TItem = { key: string; value: any };

  export interface IStorage {
    subscribe: (listener: (...args: any[]) => any) => () => void;
    notify: () => void;
    create: (key: string, value: any, isNotify = true) => void;
    produce: (...args: any[]) => void;
    read: (key: string) => any;
    setState: (newState: TItem, isNotify: boolean) => void;
  }
}
