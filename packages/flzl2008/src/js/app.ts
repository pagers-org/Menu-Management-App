import { $ } from './utils/index.js';

interface State {
  categoryNames: string[];
  menuNames: string[];
}

export default class App {
  private state: State;
  private template: string;
  private mainElementId: string;

  constructor(elementId: string) {
    this.mainElementId = elementId;
    this.state = {
      categoryNames: [
        'espresso',
        'frappuccino',
        'blended',
        'teavana',
        'desert',
      ],
      menuNames: [],
    };
    this.template = `
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
        <main class="mt-10 d-flex justify-center">
            <div class="wrapper bg-white p-10">
            <div class="heading d-flex justify-between">
                <h2 class="mt-1">☕ 에스프레소 메뉴 관리</h2>
                <span class="mr-2 mt-4 menu-count">총 0개</span>
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
        </main>
        </div>
    </div>
    `;
    $(this.mainElementId).innerHTML = this.template;
    this.bindEvent();
  }

  render(elementId: string): void {
    // state에 맞춰서 html 변경
    if (elementId === '#espresso-menu-list') {
      $(elementId).innerHTML = this.state.menuNames
        .map((value, index) => {
          return `
          <li data-menu-id=${index} class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${value}</span>
            <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
            <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-delete-button">삭제</button>
          </li>
          `;
        })
        .join('');
    } else if (elementId === '.menu-count') {
      $(elementId).innerHTML = `총 ${this.state.menuNames.length}개`;
    }
  }

  bindEvent(): void {
    $('main').addEventListener('click', e => {
      const $target = e.target as HTMLElement;
      if (!$target) return;

      if ($target.id === 'espresso-menu-submit-button') {
        this.addMenuName($('#espresso-menu-name') as HTMLInputElement);
      } else if ($target.classList.contains('menu-edit-button')) {
        this.editMenuName(
          $target.closest('.menu-list-item') as HTMLInputElement,
        );
      } else if ($target.classList.contains('menu-delete-button')) {
        this.deleteMenuName(
          $target.closest('.menu-list-item') as HTMLInputElement,
        );
      }

      e.preventDefault();
    });

    $('main').addEventListener('keydown', e => {
      const $target = e.target as HTMLElement;

      if (e.key === 'Enter' && $target.id === 'espresso-menu-name')
        this.addMenuName($target as HTMLInputElement);

      e.preventDefault();
    });
  }

  addMenuName($input: HTMLInputElement): void {
    if (!$input.value.trim()) {
      return;
    }
    this.state.menuNames.push($input.value);
    $input.value = '';
    this.render('#espresso-menu-list');
    this.render('.menu-count');
  }

  editMenuName($menuListItem: HTMLInputElement): void {
    const index = Number($menuListItem.getAttribute('data-menu-id'));
    const changeValue = prompt('메뉴명을 수정하세요')?.trim();

    if (changeValue && index >= 0) {
      this.state.menuNames[index] = changeValue;
      this.render('#espresso-menu-list');
    }
  }

  deleteMenuName($menuListItem: HTMLInputElement): void {
    const index = Number($menuListItem.getAttribute('data-menu-id'));
    const isDelete = confirm('정말 삭제하시겠습니까?');

    if (isDelete && index >= 0) {
      this.state.menuNames.splice(index, 1);
      this.render('#espresso-menu-list');
      this.render('.menu-count');
    }
  }
}
