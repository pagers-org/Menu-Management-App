import { Tstate } from '../types/store.js';
import { getCategoryMenus } from '../utils/helper.js';

const MenuItem = (state: Tstate) => {
  const { menus, currentTab } = state;
  const categoryMenus = getCategoryMenus(menus, currentTab);

  return categoryMenus
    .map(
      menu =>
        `<li id="${menu.id}" class="menu-list-item d-flex items-center py-2">
  <span id="espresso-menu-name" class="w-100 pl-2 menu-name ${
    menu.inStock || 'sold-out'
  }">${menu.menuName}</span>
  <button
    type="button"
    id="espresso-edit-button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
  >
    수정
  </button>
  <button
    id="espresso-remove-button"
    type="button"
    class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
  >
    삭제
  </button>
  <button
    id="espresso-soldout-button"
    type="button"
    class="bg-gray-50 text-gray-500 text-sm menu-soldout-button"
    ${menu.inStock || 'disabled'}
  >
    품절
  </button>
</li>`,
    )
    .join('');
};

export default MenuItem;
