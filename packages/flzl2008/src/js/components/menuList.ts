import Component from '../types/component';
import cafeMenuStore from '../cafeMenuStore';
import $ from '../utils/commons';
import * as actions from '../actions';
import MenuItem from './menuItem';

export default class MenuList extends Component {
  template(): string {
    const { menuNames } = cafeMenuStore.getState() as CafeMenuState;

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
      <ul id="espresso-menu-list" class="mt-3 pl-0"></ul>
    </div>
    `;
  }

  componentDidMount(): void {
    $('#espresso-menu-form').addEventListener('click', e => {
      const $target = e.target as HTMLElement;

      if ($target.id === 'espresso-menu-submit-button') {
        this.addInputMenuName($('#espresso-menu-name') as HTMLInputElement);
      }

      e.preventDefault();
    });

    $('#espresso-menu-form').addEventListener('keydown', e => {
      const $target = e.target as HTMLInputElement;

      if (e.key !== 'Enter') return;

      if ($target.id === 'espresso-menu-name') {
        this.addInputMenuName($target);
        e.preventDefault();
      }
    });

    new MenuItem($('#espresso-menu-list'));
  }

  addInputMenuName($target: HTMLInputElement): void {
    const value = $target.value.trim();
    if (!value) return;
    cafeMenuStore.dispatch(actions.addMenuName(value));
  }
}
