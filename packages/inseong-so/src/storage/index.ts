import { IStore, TItem } from 'Store';

const isNull = (value: any) => value === null || value === undefined;

class Storage implements IStore {
  state: globalThis.Storage;
  listeners: ((...args: any[]) => any)[];
  constructor() {
    this.state = localStorage;
    this.listeners = [];
  }

  get keys() {
    return Array.from({ length: this.state.length }).map((_, index) => this.state.key(index));
  }

  subscribe(listener: (...args: any[]) => any) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener());
  }

  create(key: string, value: any, isNotify = true) {
    this.setState({ key, value }, isNotify);
  }

  produce(...items: any[]) {
    items.forEach(item =>
      Object.entries(item).forEach(([key, value]) => this.setState({ key, value }, false)),
    );
    this.notify();
  }

  read(key: string) {
    const item = this.state.getItem(key) as string;
    return isNull(item) ? [] : JSON.parse(item);
  }

  setState({ key, value }: TItem, isNotify: boolean) {
    this.state.setItem(key, JSON.stringify(value));
    if (isNotify) this.notify();
  }
}

export default new Storage();
