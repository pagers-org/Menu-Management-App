import { createStore } from '../core/myRedux';
import { Coffee } from './constants';
import reducer from './reducer';

const defaultState = {
  currentTab: Coffee.espresso.key,
  menus: {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  },
};

export default (function getStoreSingletonInit() {
  const store = createStore(reducer, defaultState);
  console.log('클로져 store');
  return () => {
    return store;
  };
})();
