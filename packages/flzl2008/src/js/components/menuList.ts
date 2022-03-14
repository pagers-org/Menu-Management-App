import Component from '../types/component.js';
import cafeMenuStore from '../cafeMenuStore.js';
import $ from '../utils/commons.js';
import * as actions from '../actions';

export default class MenuList extends Component {
  template() {
    const { menuNames } = cafeMenuStore.getState() as CafeMenuState;
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
    <div class="content__menu-list wrapper bg-white p-10">
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

  addInputMenuName($target: HTMLInputElement): void {
    const value = $target.value.trim();
    if (!value) return;
    cafeMenuStore.dispatch(actions.addMenuName(value));
  }

  deleteMenuName($target: HTMLInputElement): void {
    const isDelete = confirm('정말 삭제하시겠습니까?');
    if (!isDelete || !$target.dataset?.menuId) return;

    const removeIndex = parseInt($target.dataset.menuId);
    cafeMenuStore.dispatch(actions.deleteMenuName(removeIndex));
  }

  editMenuName($target: HTMLInputElement): void {
    const changeValue = prompt('메뉴명을 수정하세요')?.trim();
    if (!changeValue || !$target.dataset?.menuId) return;

    const index = parseInt($target.dataset.menuId);
    cafeMenuStore.dispatch(actions.editMenuName({ changeValue, index }));
  }

  componentDidMount() {
    $('.content__menu-list').addEventListener('click', e => {
      const $target = e.target as HTMLElement;

      if ($target.id === 'espresso-menu-submit-button') {
        this.addInputMenuName($('#espresso-menu-name') as HTMLInputElement);
      } else if ($target.classList.contains('menu-edit-button')) {
        this.editMenuName($target.closest('.menu-list-item') as HTMLInputElement);
      } else if ($target.classList.contains('menu-delete-button')) {
        this.deleteMenuName($target.closest('.menu-list-item') as HTMLInputElement);
      }

      e.preventDefault();
    });

    $('.content__menu-list').addEventListener('keydown', e => {
      const $target = e.target as HTMLInputElement;

      if (e.key !== 'Enter') return;

      if ($target.id === 'espresso-menu-name') {
        this.addInputMenuName($target);
        e.preventDefault();
      }
    });
  }
}
