import createStore from './redux';
import { Action } from './types/types';
import * as actions from './actions';

const initialState = {
  categoryNames: ['espresso', 'frappuccino', 'blended', 'teavana', 'desert'],
  menuNames: [],
};

function cafeMenuReducer(action: Action, state: any = initialState) {
  switch (action.type) {
    case actions.ADD_MENU_NAME:
      return {
        ...state,
        menuNames: state.menuNames.concat(action.data),
      };

    default:
      return { ...state };
  }
}

const cafeMenuStore = createStore(cafeMenuReducer);
cafeMenuStore.dispatch({ type: '' }); // 초기 state를 set헤주기 위해 빈 action 호출

export { cafeMenuStore };
