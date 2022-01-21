import { TMenu, TMenuPage } from 'App';

const MenuPage: TMenuPage = ({ menuList, id, text }) => {
  return `
  <main class="mt-10 d-flex justify-center">
    <div class="wrapper bg-white p-10">
      <div class="heading d-flex justify-between">
        <h2 id="header-title" class="mt-1">${text} 메뉴 관리</h2>
        <span class="mr-2 mt-4 menu-count">총 ${menuList.length}개</span>
      </div>
      <form id="${id}-menu-form">
        <div class="d-flex w-100">
          <label for="${id}-menu-name" class="input-label" hidden>
          ${text} 메뉴 이름
          </label>
          <input type="text" id="${id}-menu-name" name="${id}MenuName" class="input-field"
            placeholder="${text} 메뉴 이름" autocomplete="off" />
          <button type="button" name="submit" id="${id}-menu-submit-button"
            class="input-submit bg-green-600 ml-2">
            확인
          </button>
        </div>
      </form>
      <ul id="${id}-menu-list" class="mt-3 pl-0">
        ${menuList
          .map(({ menuId, name, isSoldOut }: TMenu, index) => {
            return `
            <li class="menu-list-item d-flex items-center py-2">
              <span
                class="w-100 pl-2 menu-name ${isSoldOut ? 'sold-out' : ''}"
                key=${menuId} index=${index}>${name}</span>
              <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
              >
              ${isSoldOut ? '입고' : '품절'}
              </button>
              <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
              >
                수정
              </button>
              <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
              >
                삭제
              </button>
            </li>
          `;
          })
          .join('')}
      </ul>
    </div>
  </main>
  `;
};

export default MenuPage;
