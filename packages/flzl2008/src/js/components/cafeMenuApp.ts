import $ from '../utils/commons.js';
import Component from '../types/component.js';
import MenuList from './menuList.js';
import cafeMenuStore from '../cafeMenuStore.js';

export default class CafeMenuApp extends Component {
  template() {
    return `
    <div class="d-flex justify-center mt-5 w-100">
      <div class="w-100">
        <header class="my-4">
          <a href="/" class="text-black">
            <h1 class="text-center font-bold">🌝 문벅스 메뉴 관리</h1>
          </a>
          <nav class="d-flex justify-center flex-wrap">
            <button data-category-name="espresso" class="cafe-category-name btn bg-white shadow mx-1">
                ☕ 에스프레소
            </button>
            <button data-category-name="frappuccino" class="cafe-category-name btn bg-white shadow mx-1">
                🥤 프라푸치노
            </button>
            <button data-category-name="blended" class="cafe-category-name btn bg-white shadow mx-1">
                🍹 블렌디드
            </button>
            <button data-category-name="teavana" class="cafe-category-name btn bg-white shadow mx-1">
                🫖 티바나
            </button>
            <button data-category-name="desert" class="cafe-category-name btn bg-white shadow mx-1">
                🍰 디저트
            </button>
          </nav>
        </header>
        <main class="content mt-10 d-flex justify-center"></main>
      </div>
    </div>
    `;
  }

  componentDidMount() {
    const menuList = new MenuList($('.content'));
    cafeMenuStore.subscribe(() => menuList.render());
  }
}
