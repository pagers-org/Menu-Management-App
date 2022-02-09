import { TMouseEvent } from 'DOMEvent';
import { IStore } from 'redux';
import { LOAD_MENU } from '~/src/redux/reducers/menus/actions';
import Header from './Header';

const HeaderContainer = (store: IStore) => {
  const handleClick = ({ target }: TMouseEvent) => {
    if (!target.matches('button')) return;
    store.dispatch({
      type: LOAD_MENU,
      category: target.getAttribute('data-category-name'),
    });
  };

  return {
    component: Header({ categories: store.getState('menus', 'categories') }),
    events: [{ type: 'click', cb: handleClick }],
  };
};

export default HeaderContainer;
