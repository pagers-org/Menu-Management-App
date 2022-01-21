import { Tstate } from '../../types/store.js';
import Header from './Header.js';
import MenuForm from '../MenuForm.js';
import MenuCount from '../MenuCount.js';
import MenuItem from '../MenuItem.js';

const LayoutIndex = (state: Tstate) => {
  return `
  <div class="d-flex justify-center mt-5 w-100">
  <div class="w-100">
    ${Header(state)}
    <main class="mt-10 d-flex justify-center">
      <div class="wrapper bg-white p-10">
        <div class="heading d-flex justify-between"
          ${MenuCount(state)}
        </div>
        <form id="espresso-menu-form">
          ${MenuForm(state)}
        </form>
        <ul id="espresso-menu-list" class="mt-3 pl-0">
          ${MenuItem(state)}
        </ul>
      </div>
    </main>
  </div>
</div>
`;
};

export default LayoutIndex;
