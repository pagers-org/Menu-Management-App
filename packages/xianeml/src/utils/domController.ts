export const $ = (selector: string) => {
  return document.querySelector(selector) as HTMLElement;
};

// export const bindEvent = (
//   $el: HTMLElement,
//   eventName: string,
//   handler: (e: Event) => void,
// ) => {
//   $el.addEventListener(eventName, handler);
// };
