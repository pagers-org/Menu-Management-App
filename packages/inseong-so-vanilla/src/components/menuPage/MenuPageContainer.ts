import { TMenuProps, TMenuEventHandler } from 'App';
import { TMouseEvent } from 'DOMEvent';
import { IStore } from 'redux';
import { ERROR_MESSAGE } from '~/src/constants';
import { $closest } from '~/src/helpers/common';
import {
  INSERT_MENU_ITEM,
  MODIFY_MENU_ITEM,
  REMOVE_MENU_ITEM,
  SOLD_OUT_MENU_ITEM,
} from '~/src/redux/reducers/menus/actions';
import MenuPage from './MenuPage';

const MenuPageContainer = (store: IStore) => {
  const addMenu = (category: string) => {
    const $input = document.querySelector('.input-field') as HTMLInputElement;
    if ($input.value.trim() === '') return alert(ERROR_MESSAGE.INVALIID_INPUT);
    store.dispatch({ type: INSERT_MENU_ITEM, category: category, name: $input.value });
    $input.value = '';
  };

  const soldOutMenu: TMenuEventHandler = ($element, category) => {
    const isSoldOut = $element.classList.contains('sold-out');
    if (!confirm(`${isSoldOut ? '입고' : '품절'} 처리를 하시겠어요?`)) return;
    store.dispatch({
      type: SOLD_OUT_MENU_ITEM,
      category,
      menuId: $element.getAttribute('key'),
      name: $element.textContent,
    });
  };

  const editMenu: TMenuEventHandler = ($element, category) => {
    const newMenuName = prompt('메뉴를 수정하시겠어요?') as string;
    if (newMenuName.trim().length < 1) return alert(ERROR_MESSAGE.INVALIID_INPUT);
    store.dispatch({
      type: MODIFY_MENU_ITEM,
      category,
      menuId: $element.getAttribute('key'),
      name: newMenuName,
    });
  };

  const removeMenu: TMenuEventHandler = ($element, category) => {
    if (!confirm('메뉴를 삭제하시겠어요?')) return;
    store.dispatch({
      type: REMOVE_MENU_ITEM,
      category,
      menuId: $element.getAttribute('key'),
    });
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

    const { id: currentId } = store.getState('menus', 'selected');
    if (target.matches(SELECTOR.ADD)) return addMenu(currentId);

    const $item = $closest(target, 'li', 'span');
    if ($item === undefined) return;
    if (target.matches(SELECTOR.SOLDOUT)) return soldOutMenu($item, currentId);
    if (target.matches(SELECTOR.EDIT)) return editMenu($item, currentId);
    if (target.matches(SELECTOR.REMOVE)) return removeMenu($item, currentId);
  };

  return {
    component: MenuPage(store.getState('menus', 'selected')),
    events: [{ type: 'click', cb: handleClick }],
  };
};

export default MenuPageContainer;
