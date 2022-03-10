import { ACTIONS, INITIAL_CATEGORIES, MENU_CATEGORIES } from '../constants';
import { CategoryContext, MenuContext } from 'domain';
import { assign, createMachine } from 'xstate';

const uuid = () => {
  let dt = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, callback => {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (callback == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};

const persistCategories = (categories: CategoryContext[]) => {
  localStorage.setItem(MENU_CATEGORIES, JSON.stringify(categories));
  return categories;
};

export const menuMachine = createMachine<MenuContext>({
  id: 'menu',
  initial: 'idle',
  context: {
    categories: INITIAL_CATEGORIES,
    showSpinner: true,
  },
  states: {
    idle: {
      on: { FETCH: 'loading' },
    },
    loading: {
      invoke: {
        id: 'fetchCategories',
        src: async () => {
          const categories: CategoryContext[] = JSON.parse(
            localStorage.getItem(MENU_CATEGORIES) || JSON.stringify(INITIAL_CATEGORIES),
          );
          await new Promise(resolve => setTimeout(resolve, 1000));
          return categories;
        },
        onDone: {
          actions: assign({
            categories: (context, event) => event.data,
            showSpinner: context => false,
          }),
        },
      },
      on: {
        [ACTIONS.ADD_MENU_ITEM]: {
          actions: assign({
            categories: (context, { payload }) => {
              const selected = <CategoryContext>(
                context.categories.find(({ id }) => id === payload.categoryId)
              );
              selected.menus = [
                {
                  menuId: uuid(),
                  name: payload.name,
                  isSoldOut: false,
                },
                ...selected.menus,
              ];
              return persistCategories(
                context.categories.map(category => {
                  if (category.id === selected.id) return selected;
                  return category;
                }),
              );
            },
          }),
        },
      },
    },
  },
});
