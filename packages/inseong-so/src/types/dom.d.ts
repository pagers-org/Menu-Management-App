declare module 'DiffRender' {
  export type TDiffRender = (
    $element: HTMLElement,
    realNode: HTMLElement,
    virtualNode: HTMLElement,
  ) => void | undefined;
  export type TNodeCompare = ($oldNode: HTMLElement, $newNode: HTMLElement) => boolean;
  export type TAttributeCompare = (
    node1: HTMLElement,
    node2: HTMLElement,
    name1: string,
    name2: string,
  ) => boolean;
}

declare module 'DomConverter' {
  export type TAttributes = TStringObject;
  export type TVNodeEvent = { type: string; cb: (...args: any[]) => any };
  export type TVNode = {
    type: 'Root' | 'Element' | 'Text';
    tagName: string;
    attributes: TAttributes;
    content: string;
    children: Partial<TVNode>[];
    events: TVNodeEvent[];
  };
  export type TTagRoot = { tag: 'Root'; children: object[] };
  export type TTagText = { type: 'Text'; content: string };
  export type TTokens = TagStart | EmptyTag | TagEnd | TextNode | TTagToken | TTagText;
  export type TTagToken = { name: string; attributes: TAttributes };
  export type TTextToken = { text: string };
  export type TStringObject = { [key: string]: string };
  export type TValidObject = { [key: string]: boolean };
}

declare module 'DOMEvent' {
  export interface TEventHandlerProps extends HTMLElement {
    key: string;
  }
  export type TMouseEvent = MouseEvent & { target: HTMLButtonElement };
}

declare module 'DOM' {
  export type TDomGetter = (selector: string) => HTMLElement;
}
