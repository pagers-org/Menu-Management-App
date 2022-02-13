import Component from '../types/component.js';
import { cafeMenuStore } from '../cafeMenuStore.js';
import { $ } from '../utils/commons.js';
import * as actions from '../actions';

export default class MenuList extends Component {
  public $target: HTMLElement;
  public props: any;

  template() {
    const { menuNames }: { menuNames: [] } = cafeMenuStore.getState();
    console.log('menuNames', menuNames);
    const menuListLi = menuNames
      .map(
        (value, index) =>
          `
              <li data-menu-id=${index} class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name">${value}</span>
                <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
                <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-delete-button">삭제</button>
              </li>
              `,
      )
      .join('');

    return `
    <div class="wrapper bg-white p-10">
      <div class="heading d-flex justify-between">
        <h2 class="mt-1">☕ 에스프레소 메뉴 관리</h2>
        <span class="mr-2 mt-4 menu-count">총 ${menuNames.length}개</span>
      </div>
      <form id="espresso-menu-form">
        <div class="d-flex w-100">
          <label for="espresso-menu-name" class="input-label" hidden>
              에스프레소 메뉴 이름
          </label>
          <input type="text" id="espresso-menu-name" name="espressoMenuName" class="input-field"
                placeholder="에스프레소 메뉴 이름" autocomplete="off" />
          <button type="button" name="submit" id="espresso-menu-submit-button"
                class="input-submit bg-green-600 ml-2">
                확인
          </button>
        </div>
      </form>
      <ul id="espresso-menu-list" class="mt-3 pl-0">
        ${menuListLi}
      </ul>
    </div>
    `;
  }

  addInputMenuName() {
    const $input = $('#espresso-menu-name') as HTMLInputElement;
    const value = $input.value.trim();
    if (!value) return;
    cafeMenuStore.dispatch(actions.addMenuName(value));
  }

  componentDidMount() {
    $('#espresso-menu-submit-button').addEventListener('click', () => {
      this.addInputMenuName();
    });

    $('#espresso-menu-name').addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.addInputMenuName();
      }
    });
  }
}
