import { TMouseEvent } from 'DOMEvent';
import { IStore } from 'Store';
import Header from './Header';

const HeaderContainer = (store: IStore) => {
  const handleClick = ({ target }: TMouseEvent) => {
    if (!target.matches('button')) return;
    store.create('current', {
      id: target.getAttribute('data-category-name'),
      text: target.textContent,
    });
  };

  return {
    component: Header({ categories: store.read('categories') }),
    events: [{ type: 'click', cb: handleClick }],
  };
};

export default HeaderContainer;
