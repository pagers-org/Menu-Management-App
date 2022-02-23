import { AppContext, CategoryContext } from 'domain';
import { createMachine, assign } from 'xstate';

const initialState: CategoryContext = {
  id: '@@init@@',
  text: 'espresso',
  displayText: '에스프레소',
  selected: true,
  menus: [],
};

const categoryMachine = createMachine<AppContext>({
  id: 'category',
  initial: '',
  context: {
    categories: [initialState],
  },
  states: {},
});
