import '../assets/css/index.scss';

import App from './App';
import render from './helpers/dom/render';
import store from './redux';
import { LOAD_MENU } from './redux/reducers/menus/actions';

const diffRenderer = () => {
  const $root = document.getElementById('app') as HTMLElement;
  const $old = $root.firstChild as HTMLElement;
  const $new = App(store);

  render($root, $old, $new);
};

// 구독
store.subscribe({ render: diffRenderer });

// 해당 페이지 메뉴 렌더링
store.dispatch({ type: LOAD_MENU, category: 'espresso' });
