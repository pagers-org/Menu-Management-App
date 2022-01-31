import { TAttributeCompare, TDiffRender, TNodeCompare } from 'DiffRender';
import { isEquals, isNull } from '../common';

/**
 * Diff 알고리즘을 적용한 렌더링을 시행합니다.
 *
 * @param $element
 * @param realNode
 * @param virtualNode
 * @returns
 */
const render: TDiffRender = ($element, realNode, virtualNode) => {
  if (isNull(realNode) && isNull(virtualNode)) return;
  if (isOnlyExistRight(realNode, virtualNode)) return $element.append(virtualNode);
  if (isOnlyExistLeft(realNode, virtualNode)) return realNode.remove();
  if (isChangedNode(realNode, virtualNode)) return realNode.replaceWith(virtualNode);

  const [realChildren, realLength] = getChildren(realNode);
  const [virtualChildren, virtualLength] = getChildren(virtualNode);

  for (let i = 0; i < Math.max(realLength, virtualLength); i++) {
    render(realNode, realChildren[i], virtualChildren[i]);
  }
};

/**
 * 특정 엘리먼트의 자식 엘리먼트와 그 길이를 반환합니다.
 *
 * @param target
 * @returns
 */
const getChildren = (target: HTMLElement): [HTMLElement[], number] => {
  if (!target) return [[], 0];
  const targetChildrens = Array.from(target.children) as HTMLElement[];
  return [targetChildrens, targetChildrens.length];
};

/**
 * 노드가 변경되었는지 검사합니다.
 *
 * @param realNode
 * @param virtualNode
 * @returns
 */
const isChangedNode: TNodeCompare = (realNode, virtualNode) => {
  if (isNodeNotEquals(realNode, virtualNode)) return true;
  if (isDifferenceAttributes(realNode, virtualNode)) return true;
  if (isNotEqualsLastContent(realNode, virtualNode)) return true;
  return false;
};

/**
 * 어트리뷰트가 변경되었는지 검사합니다.
 *
 * @param realNode
 * @param virtualNode
 * @returns
 */
const isDifferenceAttributes: TNodeCompare = (realNode, virtualNode) => {
  const $realNodeAttributes = realNode.attributes;
  const $virtualNodeAttributes = virtualNode.attributes;

  if (!isEquals($realNodeAttributes.length, $virtualNodeAttributes.length)) return true;

  for (let i = 0; i < $realNodeAttributes.length; i++) {
    const $r = $realNodeAttributes[i].name;
    const $v = $virtualNodeAttributes[i].name;
    if (isEqualsAttribute(realNode, virtualNode, $r, $v)) return true;
  }

  return false;
};

/**
 * 어트리뷰트가 동일한지 검사합니다.
 *
 * @param node1
 * @param node2
 * @param name1
 * @param name2
 * @returns
 */
const isEqualsAttribute: TAttributeCompare = (node1, node2, name1, name2) =>
  node1.getAttribute(name1) !== node2.getAttribute(name1) ||
  node1.getAttribute(name2) !== node2.getAttribute(name2);

/**
 * 종단(마지막)의 컨텐츠가 동일한지 검사합니다.
 *
 * @param realNode
 * @param virtualNode
 * @returns
 */
const isNotEqualsLastContent: TNodeCompare = (realNode, virtualNode) => {
  const { firstChild: realFirstChild, textContent: realText } = realNode;
  const { firstChild: virtualFirstChild, textContent: virtualText } = virtualNode;
  if (!isTextNode(realFirstChild)) return false;
  if (!isTextNode(virtualFirstChild)) return false;
  if (!isEquals(realText, virtualText)) return true;
  return false;
};

/**
 * 타겟 노드가 서로 다른지 검사합니다.
 *
 * @param node1
 * @param node2
 * @returns
 */
const isNodeNotEquals: TNodeCompare = (node1, node2) => node1.nodeName !== node2.nodeName;

/**
 * 왼쪽(real/old) 노드만 존재하는지 검사합니다.
 *
 * @param node1
 * @param node2
 * @returns
 */
const isOnlyExistLeft: TNodeCompare = (node1, node2) => node1 && !node2;

/**
 * 오른쪽(virtual/new) 노드만 존재하는지 검사합니다.
 *
 * @param node1
 * @param node2
 * @returns
 */
const isOnlyExistRight: TNodeCompare = (node1, node2) => !node1 && node2;

/**
 * 노드가 텍스트타입인지 검사합니다.
 *
 * @param node
 * @returns
 */
const isTextNode = (node: any) => node instanceof Text;

export default render;
