export default (selector: string) => {
  return document.querySelector(selector) as HTMLElement;
};
