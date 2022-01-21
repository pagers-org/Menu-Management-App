import Component from '../../core/Component';
import { CurrentMenuService } from '../../modules/notUsingMiddlewares/services';

export default class MenuTitle extends Component {
  template() {
    const service = this?.props?.currentMenuService as CurrentMenuService;
    const total = service.getList().length;
    const title = service.currentTab().koreanName;
    return `
    <h2 class="mt-1 menu-title">${title} 메뉴 관리</h2>
    <span class="mr-2 mt-4 menu-count">총 ${total}개</span>
    `;
  }
}
