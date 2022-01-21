import Component from '../../../core/Component';
import { CurrentMenuService } from '../../../modules/notUsingMiddlewares/services';
import { MenuItem } from './MenuItem';
import { EVENTS, MESSAGES, SELECTORS } from '../../../constants';

export default class MenuList extends Component {
  get service() {
    return this?.props?.currentMenuService as CurrentMenuService;
  }
  get menuList() {
    return this.service.getList();
  }
  template() {
    return `${this.menuList
      .map(
        item => `
    <li class="menu-list-item d-flex items-center py-2" data-component="item-${item.id}">
    {{${item.text}}}
    </li>
    `,
      )
      .join('')}`;
  }

  mount() {
    //fetch를 어느시점에 해야하는지 모르겠다...
    // 비상 -> fetch 로직이 컴포넌트 안에 있으니 코어로직에서 각각의 render함수를 구독하고 있기 때문에
    // 컴포넌트가 생성될때마다 fetch가 실행됨...
    // init <-> rerender 두 로직을 분리해야하는 필요성 느낌
    console.log(this.service.currentTab().key);
    this.service.fetchByCategory(this.service.currentTab().key);

    this.menuList.forEach(
      item => new MenuItem({ key: `item-${item.id}`, props: { item } }),
    );
  }

  async onToggleSoldOut(e: MouseEvent) {
    const { target } = e;
    if ((target as Element).closest('.menu-sold-out-button')) {
      const id = (target as HTMLElement).dataset.id;
      this.service.toggleSoldOut(id);
    }
  }

  // service 에서 ui control 까지 맡기기
  async onEdit(e: MouseEvent) {
    const { target } = e;
    if ((target as Element).closest(SELECTORS.CLASS.MENU_EDIT_BUTTON)) {
      const id = (target as HTMLElement).dataset.id;
      this.service.edit(id);
    }
  }
  // ui 컨트롤은 component 에 맡기기
  async onDelete(e: MouseEvent) {
    const { target } = e;
    if ((target as Element).closest(SELECTORS.CLASS.MENU_REMOVE_BUTTON)) {
      const answer = confirm(MESSAGES.CONFIRM_REMOVE);
      if (answer) {
        const id = (target as HTMLElement).dataset.id;
        this.service.remove(id);
      }
    }
  }

  bindEvents() {
    return [
      {
        eventType: EVENTS.click,
        callback: this.onEdit.bind(this),
      },
      {
        eventType: EVENTS.click,
        callback: this.onToggleSoldOut.bind(this),
      },
      {
        eventType: EVENTS.click,
        callback: this.onDelete.bind(this),
      },
    ];
  }
}
