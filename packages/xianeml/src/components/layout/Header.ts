import { Tstate } from '../../types/store.js';
import Navigation from './Navigation.js';

const Header = (state: Tstate) => {
  return `<header class="my-4">
    <a href="/" class="text-black">
      <h1 class="text-center font-bold">🌝 문벅스 메뉴 관리</h1>
    </a>
    <nav class="d-flex justify-center flex-wrap">
      ${Navigation(state)}
    </nav>
</header>`;
};

export default Header;
