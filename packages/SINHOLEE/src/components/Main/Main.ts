import Component from '../../core/Component';
import MenuTitle from './MenuTitle';
import { createCurrentMenuService } from '../../modules/notUsingMiddlewares/services';
import { createCurrentMenuRepository } from '../../modules/notUsingMiddlewares/Repository';
import MenuInput from './MenuInput';
import MenuList from './MenuList/MenuList';

export default class Main extends Component {
  template() {
    return `
    <div class="wrapper bg-white p-10">
          <div class="heading d-flex justify-between" data-component="menu-title">
            {{menu-title}}
          </div>
          <form id="espresso-menu-form" data-component="menu-input">
            {{menu-input}}
          </form>
          <ul id="espresso-menu-list" class="mt-3 pl-0" data-component="menu-list">
            {{menu-list}}
          </ul>
        </div>
    `;
  }
  mount() {
    const currentMenuRepo = createCurrentMenuRepository(this.store);
    const currentMenuService = createCurrentMenuService(currentMenuRepo);
    new MenuTitle({
      key: 'menu-title',
      props: {
        currentMenuService,
      },
    });
    new MenuInput({
      key: 'menu-input',
      props: {
        currentMenuService,
      },
    });
    new MenuList({
      key: 'menu-list',
      props: {
        currentMenuService,
        currentMenuRepo,
      },
    });
  }
}
