import { renderViews } from './renderViews.js';
import store from '../store/index.js';

// TODO: 개선해야할 코드
const render = () => {
  const state = store.getState();
  renderViews(state);
};
render();

// TODO: 리스너 파라미터로 상태를 넘겨주려면?
store.subscribe(render);
