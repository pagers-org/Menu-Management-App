import { createStore } from './helper.js';
import menuReducer from './menu.js';

const store = createStore(menuReducer);

export default store;
