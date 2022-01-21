import Component from '../core/Component';
import { createCurrentMenuRepository } from '../modules/notUsingMiddlewares/Repository';
import { createCurrentMenuService } from '../modules/notUsingMiddlewares/services';
import Header from './Header/Header';
import Main from './Main/Main';

export default class App extends Component {
  template() {
    return `
    <div class="d-flex justify-center mt-5 w-100">
    <div class="w-100">
      <header class="my-4" data-component="header">
      {{header}}
      </header>
      <main class="mt-10 d-flex justify-center" data-component="main">
        {{main}}
      </main>
    </div>
  </div>
    `;
  }
  mount() {
    const service = createCurrentMenuService(
      createCurrentMenuRepository(this.store),
    );
    new Header({
      key: 'header',
      $parent: this.$component,
      props: {
        currentMenuService: service,
      },
    });

    new Main({ key: 'main' });
  }
}
