import { $ } from '../utils/domController.js';
import {
  createMenuItem,
  editMenuItem,
  removeMenuItem,
  soldOutMenuItem,
  setCurrentTab,
} from '../store/menu.js';
import { Tstore } from '../types/store.js';

export const handleNavigation = (store: Tstore) => (e: Event) => {
  const target = e.target as HTMLElement;
  const categoryId = target.dataset['categoryName'] as string;
  if (!categoryId) return;
  store.dispatch(setCurrentTab(categoryId));
};

export const handleSubmitMenuForm = (store: Tstore) => (e: Event) => {
  e.preventDefault();

  const $menuInput = $('#espresso-menu-name') as HTMLInputElement;
  if (!$menuInput.value) return;

  const { menus, currentTab } = store.getState();
  if (menus && menus.length === 20) {
    return alert('메뉴는 20개까지 추가 가능합니다.');
  }
  store.dispatch(createMenuItem(currentTab.id, $menuInput.value.trim()));
  $menuInput.value = '';
};

export const handleMenuList = (e: Event, store: Tstore) => {
  const target = e.target as HTMLElement;
  const targetMenuId = (target.parentElement as HTMLElement).id;

  if (target.matches('.menu-edit-button')) {
    const menuName = getNewMenuName();
    store.dispatch(editMenuItem(targetMenuId, menuName));
  } else if (target.matches('.menu-remove-button')) {
    if (!confirm('메뉴를 삭제하시겠습니까?')) return;
    store.dispatch(removeMenuItem(targetMenuId));
  } else if (target.matches('.menu-soldout-button')) {
    if (!confirm('메뉴를 품절 처리하시겠습니까?')) return;
    store.dispatch(soldOutMenuItem(targetMenuId));
  }
};

const getNewMenuName = () => {
  const newMenuName = prompt('수정할 메뉴명을 입력하세요.')?.trim();
  return newMenuName ? newMenuName : '';
};
