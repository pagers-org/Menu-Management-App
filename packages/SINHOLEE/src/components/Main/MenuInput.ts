import Component from '../../core/Component';
import { $ } from '../../utils/util';
import { EVENTS } from '../../constants';
import { CurrentMenuService } from '../../modules/notUsingMiddlewares/services';

export default class MenuInput extends Component {
  get service() {
    return this?.props?.currentMenuService as CurrentMenuService;
  }
  template() {
    const currentTab = this.service.currentTab().koreanName;
    return `
    <div class="d-flex w-100">
      <label for="espresso-menu-name" class="input-label" hidden>
        ${currentTab} 메뉴 이름
      </label>
      <input
        type="text"
        id="espresso-menu-name"
        name="espressoMenuName"
        class="input-field"
        placeholder="${currentTab} 메뉴 이름"
        autocomplete="off"
        autofocus
      />
      <button
        type="submit"
        name="submit"
        id="espresso-menu-submit-button"
        class="input-submit bg-green-600 ml-2"
      >
        확인
      </button>
    </div>
    `;
  }
  async onSubmit(e: Event) {
    const $input = $('#espresso-menu-name') as HTMLInputElement;
    e.preventDefault();
    if ($input.value) {
      await this.service.add($input.value);

      $input.value = '';
    }
  }

  bindEvents() {
    return [{ eventType: EVENTS.submit, callback: this.onSubmit.bind(this) }];
  }
}
