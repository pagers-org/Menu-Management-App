import {
  Actions,
  CoffeeKeys,
  DefaultState,
  MenuItem,
  MenuItemFormServer,
} from '../type';
import { ReturnCreateStore } from '../../core/myRedux';
import {
  addMenu,
  changeTab,
  editMenu,
  fetchMenus,
  removeMenu,
  soldOutMenu,
} from '../actions';
import { Coffee } from '../constants';
import { menuClient } from '../../networks/domain/menuClient';

const adjustMenuItem = (menuItem: MenuItemFormServer): MenuItem => ({
  ...menuItem,
  text: menuItem.name,
});

export interface CurrentMenuRepository {
  add: (text: string, category: string) => void;
  edit: ({
    menuId,
    text,
    category,
  }: {
    menuId: string;
    text: string;
    category: string;
  }) => void;
  toggleSoldOut: (menuId: string, category: string) => void;
  remove: (menuId: string, category: string) => void;
  fetchByCategory: (cate: CoffeeKeys) => void;
  // cache data
  getList: () => Array<MenuItem>;
  findById: (id: string | undefined) => MenuItem | undefined;
  findByText: (text: string) => MenuItem | undefined;
  changeTab: (selectedTab: CoffeeKeys) => void;
  currentTab: () => { koreanName: string; key: CoffeeKeys };
}

export const createCurrentMenuRepository = (() => {
  let repository: CurrentMenuRepository;
  return (
    store: ReturnCreateStore<DefaultState, Actions>,
    client: typeof menuClient = menuClient,
  ): CurrentMenuRepository => {
    const { dispatch, getState } = store;
    if (repository) {
      return repository;
    }
    repository = {
      currentTab: () => {
        const currentState = getState();
        return Coffee[currentState.currentTab];
      },
      getList: () => {
        const currentState = getState();
        return currentState.menus[currentState.currentTab];
      },
      findById: id => {
        return createCurrentMenuRepository(store, client)
          .getList()
          .find(coffee => coffee.id === id);
      },
      findByText: text => {
        return createCurrentMenuRepository(store, client)
          .getList()
          .find(coffee => coffee.text === text);
      },
      remove: async (menuId, category) => {
        // db action, state action
        await client.remove({ menuId, category });

        dispatch(removeMenu(menuId));
      },
      changeTab: selectedTab => {
        dispatch(changeTab(selectedTab));
      },
      toggleSoldOut: async (menuId, category) => {
        // http.client
        await client.toggleSoldOut({ menuId, category }); // 서버를 믿는다...?
        dispatch(soldOutMenu(menuId));
      },
      edit: async ({ menuId, text, category }) => {
        // http.client put
        const newMenu = await client.editText({ menuId, text, category });
        dispatch(
          editMenu({
            ...adjustMenuItem(newMenu),
          }),
        );
      },
      fetchByCategory: async cate => {
        const menuList = await client.fetchByCategory(cate);
        dispatch(fetchMenus(cate, menuList.map(adjustMenuItem)));
      },
      add: async (text, category) => {
        const menuItem = await client.add(text, category);
        dispatch(addMenu(adjustMenuItem(menuItem)));
      },
    };
    return repository;
  };
})();
