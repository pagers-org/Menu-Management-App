import Component from '../../core/Component';
import Category from './Category';
import { EVENTS } from '../../constants';
import { CoffeeKeys } from '../../modules/type';

export default class Header extends Component {
  template() {
    return `
    <a href="/" class="text-black">
      <h1 class="text-center font-bold">🌝 문벅스 메뉴 관리</h1>
    </a>
    <nav
      class="d-flex justify-center flex-wrap nav-category-tab"
      data-component="category"
    >
		{{category}}
    </nav>
    `;
  }
  mount() {
    new Category({ key: 'category', $parent: this.$parent });
  }
  bindEvents() {
    return [
      {
        eventType: EVENTS.click,
        callback: (e: MouseEvent) => {
          const target = e.target;
          if (target === null) {
            return;
          }
          if ((<Element>target).closest('[data-category-name]')) {
            const clickedTab = (<HTMLElement>target).dataset['categoryName'];
            console.log({ clickedTab });
            if (clickedTab === undefined) {
              return;
            }
            this?.props?.currentMenuService.changeTab(clickedTab as CoffeeKeys);
            // this.props?.
          }
        },
      },
    ];
  }
}
