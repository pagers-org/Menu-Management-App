import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { Category, MenuItem, GlobalUniqueNode, ReducerType } from './types';
import { GLOBAL_UNIQUE_TYPE, TYPE_TO_REDUCER_MAPPER } from './constants';

const CATEGORIES: Category[] = [
  {
    id: 'c1',
    type: GLOBAL_UNIQUE_TYPE.category,
    name: 'espresso',
    title_ko: '에스프레소',
    postPosition: '를',
  },
  {
    id: 'c2',
    type: GLOBAL_UNIQUE_TYPE.category,
    name: 'frappuccino',
    title_ko: '프라푸치노',
    postPosition: '를',
  },
  {
    id: 'c3',
    type: GLOBAL_UNIQUE_TYPE.category,
    name: 'blended',
    title_ko: '블랜디드',
    postPosition: '를',
  },
  {
    id: 'c4',
    type: GLOBAL_UNIQUE_TYPE.category,
    name: 'teavana',
    title_ko: '티바나',
    postPosition: '를',
  },
  {
    id: 'c5',
    type: GLOBAL_UNIQUE_TYPE.category,
    name: 'desert',
    title_ko: '디저트',
    postPosition: '를',
  },
];

const MENUS: MenuItem[] = [
  {
    id: 'm1',
    type: GLOBAL_UNIQUE_TYPE.menuItem,
    title: '김치프라푸치노',
    isSoldOut: false,
    [GLOBAL_UNIQUE_TYPE.category]: 'c2',
  },
  {
    id: 'm2',
    type: GLOBAL_UNIQUE_TYPE.menuItem,
    title: '김치에스프레소',
    isSoldOut: false,
    [GLOBAL_UNIQUE_TYPE.category]: 'c1',
  },
];

const initialState = {
  categories: [] as Category[],
  menus: [] as MenuItem[],
};
type RootState = typeof initialState;
type Action<T extends GlobalUniqueNode> =
  | { type: 'SET_LIST'; payload: { type: ReducerType; list: T[] } }
  | { type: 'ADD_ITEM'; payload: { type: ReducerType; item: T } }
  | { type: 'UPDATE_ITEM'; payload: { type: ReducerType; item: T } }
  | { type: 'REMOVE_ITEM'; payload: { type: ReducerType; id: string } };

type NodeDispatchContext<T extends GlobalUniqueNode> = Dispatch<Action<T>>;
const NodeStateContext = createContext(initialState);
const NodeDispatchContext = createContext<NodeDispatchContext<any> | null>(null);

export function NodeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { categories: CATEGORIES, menus: MENUS });

  return (
    <NodeDispatchContext.Provider value={dispatch}>
      <NodeStateContext.Provider value={state}>{children}</NodeStateContext.Provider>
    </NodeDispatchContext.Provider>
  );
}
function reducer<T extends GlobalUniqueNode>(state: RootState, action: Action<T>) {
  const stateKey = TYPE_TO_REDUCER_MAPPER[action.payload.type];
  switch (action.type) {
    case 'SET_LIST':
      return {
        ...state,
        [stateKey]: action.payload.list,
      };
    case 'ADD_ITEM':
      return {
        ...state,
        [stateKey]: [...state[stateKey], action.payload.item],
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        [stateKey]: state[stateKey].map(item =>
          item.id === action.payload.item.id ? action.payload.item : item,
        ),
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        [stateKey]: (state[stateKey] as GlobalUniqueNode[]).filter(
          item => item.id !== action.payload.id,
        ),
      };

    default:
      throw new Error('말도 안되는 타입이 들어왔어요.');
  }
}

export function useNodeState() {
  const state = useContext(NodeStateContext);
  if (!state) throw new Error('NodeStateContext 를 찾을 수 없습니다.');
  return state;
}
export function useNodeDispatch() {
  const dispatch = useContext(NodeDispatchContext);
  if (!dispatch) throw new Error('NodeDispatchContext 를 찾을 수 없습니다.');
  return dispatch;
}
