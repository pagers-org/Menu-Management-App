import { IStore } from 'redux';
import HeaderContainer from './components/header/HeaderContainer';
import MenuPageContainer from './components/menuPage/MenuPageContainer';
import { setupComponent } from './helpers/dom/converter';
import { createVDOM } from './helpers/dom/converter';

const App = (store: IStore) => {
  return createVDOM({
    type: 'Element',
    tagName: 'div',
    attributes: { class: 'd-flex justify-center mt-5 w-100' },
    children: [
      {
        type: 'Element',
        tagName: 'div',
        attributes: { class: 'w-100' },
        children: setupComponent<IStore>(store, [HeaderContainer, MenuPageContainer]),
      },
    ],
  });
};

export default App;
