import {
  TTagRoot,
  TTagText,
  TTokens,
  TTagToken,
  TTextToken,
  TStringObject,
  TValidObject,
  TVNode,
} from 'DomConverter';
import { last } from '../common';
import {
  ELEMENT_TYPE,
  TEXT_TYPE,
  EMPTY_END_TAG,
  FILL_ATTRIBUTE,
  REGEXP,
  ROOT_TYPE,
  EMPTY,
} from './constants';

class TagStart {
  name: string;
  attributes: TStringObject;
  constructor(name: string, tag: string) {
    this.name = name;
    this.attributes = this.getAttributes(tag);
  }

  getAttributes(str: string) {
    return (str.match(REGEXP.ATTRIBUTE) as string[]).reduce((acc: TStringObject, cur: string) => {
      const [key, value = makeMap(FILL_ATTRIBUTE)[key]] = cur.split('=');
      acc[key] = `${value || EMPTY}`.replace(REGEXP.ATTRIBUTE_VALID, '$1').trim();
      return acc;
    }, {});
  }
}

class EmptyTag extends TagStart {
  constructor(name: string, tag: string) {
    super(name, tag);
  }
}

class TagEnd {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class TextNode {
  text: string;
  constructor(text: string) {
    this.text = text;
  }
}

export const createVDOM = (node: Partial<TVNode>) => {
  const { type, tagName, children = [], attributes = {}, events = [] } = node;

  if (type === ROOT_TYPE && children.length > 1) throw new Error('최상위 태그로 묶여야 합니다.');

  const $node: HTMLElement =
    type === ROOT_TYPE ? createVDOM(children[0]) : document.createElement(tagName as string);

  // 태그 속성 설정
  Object.entries(attributes).forEach(([key, value]) => $node.setAttribute(key, value));
  // 이벤트 바인딩
  events.forEach(({ type, cb }) => $node.addEventListener(type, cb));
  // 자식 태그 추가
  children.forEach(child =>
    $node.append(
      child.type === TEXT_TYPE
        ? document.createTextNode(child.content as string)
        : createVDOM(child),
    ),
  );

  return $node;
};

const makeMap = (str: string) =>
  str.split(',').reduce((map: TValidObject, cur: string) => ({ ...map, [cur]: true }), {});

const tokenize = (html: string): TTokens[] => {
  let string = html;
  const tokens = [];

  while (string) {
    // 주석 제거
    if (string.indexOf('<!--') === 0) {
      const lastIndex = string.indexOf('-->') + 3;
      string = string.substring(lastIndex);

      continue;
    }
    // 프래그먼트 태그 or end 태그
    if (string.indexOf('</') === 0) {
      const match = string.match(REGEXP.END_TAG);
      if (!match) continue;
      string = string.substring(match[0].length);
      const name = match[1];
      if (makeMap(EMPTY_END_TAG)[name]) continue;

      tokens.push(new TagEnd(name));
      continue;
    }
    // < 시작 종료 />
    if (string.indexOf('<') === 0) {
      const match = string.match(REGEXP.START_TAG);
      if (!match) continue;
      string = string.substring(match[0].length);
      const name = match[1];
      const attrs = match[2];
      const token = makeMap(EMPTY_END_TAG)[name]
        ? new EmptyTag(name, attrs)
        : new TagStart(name, attrs);

      tokens.push(token);
      continue;
    }

    const index = string.indexOf('<');
    const text = index < 0 ? string : string.substring(0, index);

    string = index < 0 ? EMPTY : string.substring(index);
    tokens.push(new TextNode(text));
  }
  return tokens;
};

const createElement = (token: TTagToken) => {
  const tagName = token.name;
  const attributes = token.attributes;
  const element = { type: ELEMENT_TYPE, tagName, attributes };
  if (token instanceof EmptyTag) return element;
  return { ...element, children: [] };
};

const createTextNode = (token: TTextToken) => {
  const type = TEXT_TYPE;
  const content = token.text.replace(REGEXP.EMPTY_SPACE, EMPTY).trim();
  return { type, content };
};

const createNodeFactory = (type: string, token: TTokens) =>
  type === ELEMENT_TYPE ? createElement(token as TTagToken) : createTextNode(token as TTextToken);

const parse = (tokens: TTokens[]) => {
  const root: TTagRoot = { tag: ROOT_TYPE, children: [] };
  const tagArray: (TTagRoot | TVNode)[] = [root];

  for (const token of tokens) {
    if (token instanceof TagStart) {
      const node = createNodeFactory(ELEMENT_TYPE, token) as TVNode;
      if (node.children) tagArray.push(node);
      else last(tagArray, 'children').push(node);

      continue;
    }

    if (token instanceof TagEnd) {
      const parent = tagArray[tagArray.length - 2];
      const node = tagArray.pop() as TVNode;

      parent.children.push(node);
      continue;
    }

    if (token instanceof TextNode) {
      const text = createNodeFactory(TEXT_TYPE, token) as TTagText;

      if (text.content.trim() !== EMPTY) last(tagArray, 'children').push(text);
      continue;
    }
  }

  return root;
};

export const htmlParser = (html: string) => parse(tokenize(html));

export const bindState = <State>(
  component: (state: State) => {
    component: string;
    events: { type: string; cb: (params?: Event) => void }[];
  },
  state: State,
) => {
  return component(state);
};

export const setupComponent = <State>(
  state: any,
  components: ((state: State) => {
    component: string;
    events: { type: string; cb: any }[];
  })[],
) => {
  return components
    .map(component => bindState(component, state))
    .map(({ component, events }) => ({
      ...htmlParser(component).children[0],
      events,
    }));
};
