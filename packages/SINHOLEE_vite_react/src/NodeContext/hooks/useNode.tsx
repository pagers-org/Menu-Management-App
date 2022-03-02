import { GlobalUniqueNode, ReducerType } from '../types';
import { useNodeList } from './useNodeList';

export function useNode<T extends GlobalUniqueNode>({
  type,
  id,
}: {
  type: ReducerType;
  id: string;
}) {
  const list = useNodeList({ type });
  const node = (list as unknown as T[]).find(item => id === item.id);
  if (!node) {
    throw new Error(`해당 ${type} 타입의 id가 ${id} 인 노드가 없습니다.`);
  }
  return node;
}
