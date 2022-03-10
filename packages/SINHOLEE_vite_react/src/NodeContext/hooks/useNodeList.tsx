import { GlobalUniqueNode, ReducerType } from '../types';
import { useNodeState } from '../index';
import { TYPE_TO_REDUCER_MAPPER } from '../constants';

export function useNodeList<T extends GlobalUniqueNode>({ type }: { type: ReducerType }) {
  const state = useNodeState();
  const stateKey = TYPE_TO_REDUCER_MAPPER[type];
  // https://garbagevalue.com/blog/typescript-custom-to-primitive-type-casting
  return state[stateKey] as unknown as T[];
}
