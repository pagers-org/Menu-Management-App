import { renderViews } from './renderViews.js';
import store from '../store/index.js';

const render = () => renderViews(store);
render();

store.subscribe(render);
