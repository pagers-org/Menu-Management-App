import getSingletonStore from '../modules/getSingletonStore';
import { $, addEvent } from '../utils/util';

type BindEvent = {
  eventType: string;
  callback: EventListenerOrEventListenerObject;
};
interface CoreComponent {
  template: () => string;
  mount?: () => void;
  bindEvents?: () => Array<BindEvent>;
}

export default class Component implements CoreComponent {
  private key: string;
  protected store;
  protected $component: HTMLElement;
  protected $parent;
  protected props;
  private static keyBucket: Set<string> = new Set();
  constructor({
    key,
    $parent,
    props,
  }: {
    key: string;
    $parent?: HTMLElement;
    props?: Record<string, any>;
  }) {
    this.key = key;
    // this._setupKey(this.key);
    if ($parent === undefined) {
      this.$parent = $('body');
    }
    this.$parent = $parent;
    this.$component = $(`[data-component=${this.key}]`, this.$parent);
    this.props = props;
    this.store = getSingletonStore();
    this.store.subscribe(this.key, this.render.bind(this));
    this.render();
    this.setEvents();
  }
  _setupKey(key: string) {
    if (Component.keyBucket.has(key)) {
      throw new Error('Component는 중복된 키값을 가질 수 없습니다.');
    } else {
      Component.keyBucket.add(key);
    }
  }
  template() {
    return '';
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  mount() {}
  render() {
    this.$component.innerHTML = this.template();
    this?.mount();
  }

  bindEvents() {
    return [] as {
      eventType: string;
      callback: (...args: any[]) => any;
    }[];
  }

  setEvents() {
    this.bindEvents().forEach(({ eventType, callback }) => {
      addEvent(this.$component, eventType, callback);
    });
  }
}
