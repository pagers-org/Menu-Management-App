type Listener = (...args: any[]) => any;

export class EventEmitter {
  events: { [key: string]: Listener };
  constructor() {
    this.events = {};
  }

  on(type: string, listener: Listener) {
    this.events[type] = listener;
  }

  emit(type: any, ...args: any[]) {
    if (!this.events[type]) return;
    this.events[type](...args);
  }

  once(type: string, listener: Listener) {
    if (typeof listener !== 'function')
      throw new TypeError(
        `The "listener" argument must be of type Function. Received type ${typeof listener}`,
      );

    this.on(type, this._onceWrap(listener));
    return this;
  }

  _onceWrap(listener: Listener) {
    return (...args: any[]) => listener.apply(this, args);
  }
}
