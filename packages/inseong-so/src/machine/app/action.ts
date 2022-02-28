import { AppContext } from 'domain';
import { AnyEventObject, assign } from 'xstate';

export const initAction = assign({
  categories: (context: AppContext) => {
    return context.categories.map((category, index) => ({
      ...category,
      selected: index === 0,
    }));
  },
});

export const changeCategoryAction = assign({
  categories: (context: AppContext, event: AnyEventObject) => {
    return context.categories.map(category => ({
      ...category,
      selected: category.id === event.id,
    }));
  },
});
