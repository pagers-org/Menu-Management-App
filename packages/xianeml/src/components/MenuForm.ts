import { Tstate } from '../types/store.js';

const MenuForm = (state: Tstate) => {
  const { currentTab } = state;

  return `
    <div class="d-flex w-100">
      <label for="espresso-menu-name" class="input-label" hidden>
        ${currentTab.name} 메뉴 이름
      </label>
      <input
        type="text"
        id="espresso-menu-name"
        name="espressoMenuName"
        class="input-field"
        placeholder="${currentTab.name} 메뉴 이름"
        autocomplete="off"
      />
      <button
        type="submit"
        name="submit"
        id="espresso-menu-submit-button"
        class="input-submit bg-green-600 ml-2"
      >
        확인
      </button>
    </div>`;
};

export default MenuForm;
