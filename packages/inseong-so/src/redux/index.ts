import { createStore } from './common';
import rootReducer from './reducers';
import { runSaga } from './sagas';
import { TReducer } from 'redux';
import { menuSaga } from './reducers/menus/actions';

const store = createStore(<TReducer>rootReducer);

runSaga(store, menuSaga);

export default store;
