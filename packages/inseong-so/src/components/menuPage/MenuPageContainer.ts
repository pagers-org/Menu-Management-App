import { TMenuProps, TMenuEventHandler } from 'App';
import { TMouseEvent } from 'DOMEvent';
import { IStore } from 'Store';
import { ERROR_MESSAGE } from '~/src/constants';
import { $closest, createUUID } from '~/src/helpers/common';
import MenuPage from './MenuPage';

// let lastCallback: any;
// let lastCallbackDependencies: any[];

// const useCallback = (callback: any, dependencies: any[]) => {
//   if (lastCallbackDependencies) {
//     const isChange = !dependencies.every(
//       (item: any, index: number) => item === lastCallbackDependencies[index],
//     );
//     if (isChange) {
//       lastCallback = callback;
//       lastCallbackDependencies = dependencies;
//     }
//   } else {
//     lastCallback = callback;
//     lastCallbackDependencies = dependencies;
//   }

//   return lastCallback;
// };

const MenuPageContainer = (store: IStore) => {
  const { id, text } = store.read('current');
  const menuListId = `${id}-menuList`;

  const addMenu = (menuList: TMenuProps[], categoryId: string) => {
    const $input = document.querySelector('.input-field') as HTMLInputElement;
    if ($input.value.trim() === '') return alert(ERROR_MESSAGE.INVALIID_INPUT);
    menuList.push({ menuId: createUUID(), name: $input.value, isSoldOut: false });
    store.create(categoryId, menuList);

    $input.value = '';
  };

  const soldOutMenu: TMenuEventHandler = ($element, menuList, categoryId) => {
    const isSoldOut = $element.classList.contains('sold-out');
    const key = $element.getAttribute('key');
    if (!confirm(`${isSoldOut ? '입고' : '품절'} 처리를 하시겠어요?`)) return;
    const newMenuList = menuList.map(menu => {
      if (menu.menuId === key) return { ...menu, isSoldOut: !isSoldOut };
      return menu;
    });
    store.create(categoryId, newMenuList);
  };
  const editMenu: TMenuEventHandler = ($element, menuList, categoryId) => {
    const newMenuName = prompt('메뉴를 수정하시겠어요?') as string;
    if (newMenuName.trim().length < 1) return alert(ERROR_MESSAGE.INVALIID_INPUT);
    const key = $element.getAttribute('key');
    const newMenuList = menuList.map(menu => {
      if (menu.menuId === key) return { ...menu, name: newMenuName };
      return menu;
    });
    store.create(categoryId, newMenuList);
  };
  const removeMenu: TMenuEventHandler = ($element, menuList, categoryId) => {
    if (!confirm('메뉴를 삭제하시겠어요?')) return;
    const key = $element.getAttribute('key');
    const newMenuList = menuList.filter(menu => menu.menuId !== key);
    store.create(categoryId, newMenuList);
  };

  const SELECTOR = {
    ADD: '.input-submit',
    SOLDOUT: '.menu-sold-out-button',
    EDIT: '.menu-edit-button',
    REMOVE: '.menu-remove-button',
  };

  // TODO: 이벤트 리스너를 어떻게 효율적으로 처리할 것인가
  const handleClick = ({ target }: TMouseEvent) => {
    const check = Object.values(SELECTOR)
      .map(elementSelector => target.matches(elementSelector))
      .filter(check => check)[0];
    if (check === undefined) return;

    const { id: currentId } = store.read('current');
    const currentMenuListId = `${currentId}-menuList`;
    const menuList = store.read(currentMenuListId) as TMenuProps[];
    if (target.matches(SELECTOR.ADD)) {
      return addMenu(menuList, currentMenuListId);
    }
    const $item = $closest(target, 'li', 'span');
    if ($item === undefined) return;
    if (target.matches(SELECTOR.SOLDOUT)) {
      return soldOutMenu($item, menuList, currentMenuListId);
    }
    if (target.matches(SELECTOR.EDIT)) {
      return editMenu($item, menuList, currentMenuListId);
    }
    if (target.matches(SELECTOR.REMOVE)) {
      return removeMenu($item, menuList, currentMenuListId);
    }
  };

  return {
    component: MenuPage({ menuList: store.read(menuListId), id, text }),
    events: [{ type: 'click', cb: handleClick }],
  };
};

export default MenuPageContainer;
