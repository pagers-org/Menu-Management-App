import '../assets/css/index.scss';

import App from './App';
import render from './helpers/dom/render';
import store from './store';
import { CATEGORIES } from './constants';

const diffRenderer = () => {
  const $root = document.getElementById('app') as HTMLElement;
  const $old = $root.firstChild as HTMLElement;
  const $new = App(store);
  render($root, $old, $new);
};

// 초기값 설정
store.create('categories', CATEGORIES);
store.create('current', { id: 'espresso', text: '☕ 에스프레소' });

// 구독
store.subscribe(diffRenderer);

// 최초 실행
diffRenderer();
