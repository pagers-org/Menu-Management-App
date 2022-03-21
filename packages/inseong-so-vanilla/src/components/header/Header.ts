import { TPresentation, TProps } from 'Component';

const Header: TPresentation = ({ categories }) => {
  return `
  <header id="header-area" class="my-4">
    <a href="/" class="text-black">
      <h1 class="text-center font-bold">🌝 문벅스 메뉴 관리</h1>
    </a>
    <nav id="nav-area" class="d-flex justify-center flex-wrap">
      ${categories
        .map((category: TProps) => {
          return `
        <button data-category-name="${category.id}" class="cafe-category-name btn bg-white shadow mx-1">
          ${category.text}
        </button>
        `;
        })
        .join('')}
    </nav>
  </header>
  `;
};

export default Header;
