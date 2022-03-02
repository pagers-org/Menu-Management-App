import { AppContext } from 'domain';
import { CATEGORIES } from '../../constants';
import { createMachine } from 'xstate';
import { changeCategoryAction, initAction } from './action';

const initialState = { categories: CATEGORIES };

const appMachine = createMachine<AppContext>({
  id: 'domain',
  initial: 'selected',
  context: initialState,
  states: {
    selected: {
      entry: initAction,
      on: { TOGGLE: 'changing' },
    },
    changing: {
      entry: changeCategoryAction,
      on: { TOGGLE: 'changing' },
    },
  },
});

export default appMachine;
