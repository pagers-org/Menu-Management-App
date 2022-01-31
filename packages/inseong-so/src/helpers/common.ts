import { TDomGetter } from 'DOM';

export const $ = (selector: string) => document.querySelector(selector) as HTMLElement;

export const $all = (selector: string) => {
  return document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
};

export const $closest = (current: HTMLElement, selector: string, target: string) => {
  const $li = current.closest(selector);
  if (!($li instanceof HTMLElement)) throw new Error(`Not Defined ${selector}`);
  const $item = $li.querySelector(target);
  if (!($item instanceof HTMLElement)) throw new Error(`Not Defined ${selector}`);
  return $item;
};

export const $parentComponent: TDomGetter = selector => {
  let $element: HTMLElement = $(selector);
  while ($element.parentElement !== null) {
    const parent = $element.parentElement as HTMLElement;
    if (parent.tagName === 'BODY' || parent.getAttribute('data-component') !== null) break;
    $element = parent;
  }
  return $element.parentElement as HTMLElement;
};

export const $attr = ($element: HTMLElement, selector: string | void) =>
  $element.getAttribute(selector || 'data-component');

/**
 * 문자열을 각 케이스로 변경합니다.
 */
export const notationConvert = {
  /**
   * 대시 케이스를 카멜 케이스로 변경합니다.
   *
   * @param target
   * @returns
   */
  dashToCamel: (target: string) => {
    return target.replace(/-[a-z]{1}/gi, char => {
      return char.toUpperCase().substr(1);
    });
  },
  /**
   * 스네이크 케이스를 카멜 케이스로 변경합니다.
   *
   * @param target
   * @returns
   */
  snakeToCamel: (target: string) => {
    return target.replace(/_[a-z]{1}/gi, char => {
      return char.toUpperCase().substr(1);
    });
  },
  /**
   * 카멜 케이스를 스네이크 케이스로 변경합니다.
   *
   * @param target
   * @returns
   */
  camelToSnake: (target: string) => {
    return target.replace(/([A-Z]{1})/g, '_$1').toLowerCase();
  },
};

/**
 * 객체를 깊은 복사합니다.
 *
 * @param state
 * @returns
 */
export const deepClone = (state: object) => JSON.parse(JSON.stringify(state));

/**
 * 객체를 깊은 복사 후 동결시킵니다.
 *
 * @param state
 * @returns
 */
export const deepCloneAndFreeze = (state: object) =>
  Object.freeze(JSON.parse(JSON.stringify(state)));

/**
 *
 * @TODO 다른 브라우저가 활성화 되어 있거나,
 *       브라우저 OS가 포커싱되지 않았다면 requestAnimationFrame이 멈춘다.
 *
 * @param callback
 * @returns
 */
export const debounceV1 = (callback: (...args: any) => void) => {
  let currentCallback: number | null = null;
  return (...args: any) => {
    if (currentCallback) {
      cancelAnimationFrame(currentCallback);
      currentCallback = null;
    }
    currentCallback = requestAnimationFrame(() => callback(args));
  };
};

/**
 * 디바운스를 설정합니다.
 *
 * @param callback
 * @param wait
 * @returns
 */
export const debounce = (callback: any, wait = 0) => {
  let currentArguments: object[] | undefined;
  let timerId: NodeJS.Timeout | undefined;

  if (typeof callback !== 'function') throw new TypeError('Expected a function');

  const startTimer = (pendingCallback: () => any, term: number) => {
    return setTimeout(pendingCallback, term);
  };

  const trailingEdge = () => {
    timerId = undefined;
    const args = <object[]>currentArguments;
    currentArguments = undefined;
    callback(...args);
  };

  return (...args: object[]) => {
    currentArguments = args;
    if (timerId === undefined) timerId = startTimer(trailingEdge, wait);
  };
};

/**
 * UUID를 생성합니다.
 *
 * @returns
 */
export const createUUID = () => {
  let dt = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, callback => {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (callback == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};

/**
 * 값이 null이나 undefined인지 검사합니다.
 *
 * @param value
 * @returns
 */
export const isNull = (value: any) => value === null || value === undefined;

/**
 * 값이 비어있는지 검사합니다.
 *
 * @param {Array|number|string} value
 * @returns {boolean}
 */
export const isEmpty = (
  value: null | undefined | undefined[] | number | string | HTMLCollection,
) => {
  if (isNull(value)) return true;
  if (value instanceof Array) return value.length < 1 || value === [];
  if (typeof value === 'number') return value === 0;
  return value === '';
};

/**
 * 값이 일치(===)하는지 검사합니다.
 *
 * @param target1
 * @param target2
 * @returns
 */
export const isEquals = <T>(target1: T, target2: T) => target1 === target2;

/**
 * 배열에 값이 포함 되어 있는지 검사합니다.
 *
 * @param value
 * @param items
 * @returns
 */
export const isIncludes = (value: undefined, items: undefined[]) => items.includes(value);

/**
 * 중복 여부를 검사합니다.
 *
 * @param value
 * @param items
 * @returns
 */
export const isDuplicate = (value: any, items: any[]) =>
  !isNull(items.find(({ name }) => name === value));

/**
 * @TODO 고도화 필요, 함수형 프로그래밍 철학 적용하기
 *
 * @param array
 * @param args
 * @returns
 */
export const last = (array: any[], ...args: any[]) => array[array.length - 1][args[0]];

let lastCallback: any;
let lastCallbackDependencies: any[];

export const useCallback = (callback: any, dependencies: any[]) => {
  if (lastCallbackDependencies) {
    const isChange = !dependencies.every(
      (item: any, index: number) => item === lastCallbackDependencies[index],
    );
    if (isChange) {
      lastCallback = callback;
      lastCallbackDependencies = dependencies;
    }
  } else {
    lastCallback = callback;
    lastCallbackDependencies = dependencies;
  }

  return lastCallback;
};
