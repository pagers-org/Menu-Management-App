export const $ = (selector: string) => {
  return document.querySelector(selector) as HTMLElement;
};
