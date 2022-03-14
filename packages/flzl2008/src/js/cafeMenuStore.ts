import createStore from './redux';
import * as actions from './actions';

const initialState: CafeMenuState = {
  categoryNames: [],
  menuNames: [],
};

const cafeMenuReducer = (
  action: Redux.Action,
  state: CafeMenuState = initialState,
): CafeMenuState => {
  switch (action.type) {
    case actions.ADD_MENU_NAME:
      return {
        ...state,
        menuNames: addMenuName(state.menuNames, action.data),
      };
    case actions.DELETE_MENU_NAME:
      return {
        ...state,
        menuNames: removeMenuName(state.menuNames, action.data),
      };
    case actions.EDIT_MENU_NAME:
      return {
        ...state,
        menuNames: editMenuName(state.menuNames, action.data),
      };
    case actions.INIT_STATE:
      return { ...state };
    default:
      return { ...state };
  }
};

const addMenuName = (previousMenuNames: string[], data: string): string[] => {
  const newMenuNames = previousMenuNames.slice();
  newMenuNames.push(data);
  return newMenuNames;
};

const removeMenuName = (previousMenuNames: string[], removeIndex: number): string[] => {
  return previousMenuNames.filter((value, index) => index !== removeIndex);
};

const editMenuName = (previousMenuNames: string[], data: editMenuData): string[] => {
  return previousMenuNames.map((name, index) => {
    if (index !== data.index) return name;

    return data.changeValue;
  });
};

const cafeMenuStore = createStore(cafeMenuReducer);
cafeMenuStore.dispatch(actions.initState());

export default cafeMenuStore;
