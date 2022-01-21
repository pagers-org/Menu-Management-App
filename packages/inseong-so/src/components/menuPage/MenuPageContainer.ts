import { TMouseEvent } from 'DOMEvent';
import { IStore } from 'Store';
import { createUUID } from '~/src/helpers/common';
import MenuPage from './MenuPage';

const MenuPageContainer = (store: IStore) => {
  const { id, text } = store.read('current');
  const menuListId = `${id}-menuList`;
  const handleClick = ({ target }: TMouseEvent) => {
    if (!target.matches('.input-submit')) return;

    const $input = document.querySelector('.input-field') as HTMLInputElement;
    if ($input.value.trim() === '') return;

    const menuList = store.read(menuListId);
    menuList.push({ menuId: createUUID(), name: $input.value, isSoldOut: false });
    store.create(menuListId, menuList);

    $input.value = '';
  };

  return {
    component: MenuPage({ menuList: store.read(menuListId), id, text }),
    events: [{ type: 'click', cb: handleClick }],
  };
};

export default MenuPageContainer;
