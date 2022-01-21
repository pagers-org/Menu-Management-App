import { Tstate } from '../types/store.js';
import { getCategoryMenus } from '../utils/helper.js';

const MenuCount = (state: Tstate) => {
  const { menus, currentTab } = state;
  const categoryMenus = getCategoryMenus(menus, currentTab);

  return `
    <h2 class="mt-1">${currentTab.name} 메뉴 관리</h2>
    <span id="menu-count" class="mr-2 mt-4 menu-count">
      총 ${categoryMenus.length}개
    </span>`;
};

export default MenuCount;
