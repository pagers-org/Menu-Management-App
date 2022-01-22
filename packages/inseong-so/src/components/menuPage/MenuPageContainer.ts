import { TMouseEvent } from 'DOMEvent';
import { IStore } from 'Store';
import { ERROR_MESSAGE } from '~/src/constants';
import { createUUID } from '~/src/helpers/common';
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

  const addMenu = () => {
    const { id: currentId } = store.read('current');
    const currentMenuListId = `${currentId}-menuList`;

    const $input = document.querySelector('.input-field') as HTMLInputElement;
    if ($input.value.trim() === '') return alert(ERROR_MESSAGE.INVALIID_INPUT);

    const menuList = store.read(currentMenuListId);
    menuList.push({ menuId: createUUID(), name: $input.value, isSoldOut: false });
    store.create(currentMenuListId, menuList);

    $input.value = '';
  };

  const soldOutMenu = () => {};
  const editMenu = () => {};
  const removeMenu = () => {};

  // TODO: 이벤트 리스너를 어떻게 효율적으로 처리할 것인가
  const handleClick = ({ target }: TMouseEvent) => {
    if (target.matches('.input-submit')) return addMenu();
    if (target.matches('.menu-sold-out-button')) return soldOutMenu();
    if (target.matches('.menu-edit-button')) return editMenu();
    if (target.matches('.menu-remove-button')) return removeMenu();
  };

  return {
    component: MenuPage({ menuList: store.read(menuListId), id, text }),
    events: [{ type: 'click', cb: handleClick }],
  };
};

export default MenuPageContainer;
