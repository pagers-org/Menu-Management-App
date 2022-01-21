import { Actions, DefaultState } from './type';

// todo 추상화
export default function reducer(
  state: DefaultState,
  action: Actions,
): DefaultState {
  switch (action.type) {
    case 'FETCH_MENUS_BY_CATEGORY': {
      if (state.currentTab !== action.payload.category) {
        throw new Error(
          `현재 카테고리와 ${action.payload.category}가 다르면 안됩니다.`,
        );
      }

      return {
        ...state,
        menus: {
          ...state.menus,
          [action.payload.category]: action.payload.menus,
        },
      };
    }
    case 'CHANGE_TAB': {
      return {
        ...state,
        currentTab: action.payload.tabKey,
      };
    }
    case 'ADD': {
      return {
        ...state,
        menus: {
          ...state.menus,
          [state.currentTab]: state.menus[state.currentTab].concat([
            action.payload.menu,
          ]),
        },
      };
    }
    case 'REMOVE': {
      const newCurrentMenu = state.menus[state.currentTab].filter(
        coffee => action.payload.id !== coffee.id,
      );
      return {
        ...state,
        menus: {
          ...state.menus,
          [state.currentTab]: newCurrentMenu,
        },
      };
    }
    case 'NAME_EDIT': {
      const newCurrentMenu = state.menus[state.currentTab].map(coffee =>
        action.payload.menu.id !== coffee.id
          ? coffee
          : { ...action.payload.menu },
      );
      return {
        ...state,
        menus: {
          ...state.menus,
          [state.currentTab]: newCurrentMenu,
        },
      };
    }
    case 'SOLD_OUT': {
      const newCurrentMenu = state.menus[state.currentTab].map(coffee =>
        action.payload.id !== coffee.id
          ? coffee
          : { ...coffee, isSoldOut: !coffee.isSoldOut },
      );

      return {
        ...state,
        menus: {
          ...state.menus,
          [state.currentTab]: newCurrentMenu,
        },
      };
    }
    default:
      return state;
  }
}
