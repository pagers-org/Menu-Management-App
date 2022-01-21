import { Tstate } from '../../types/store.js';

const Navigation = (state: Tstate) => {
  const { categories, currentTab } = state;

  return categories
    .map(
      category =>
        `<button
      data-category-name="${category.id}"
      class="cafe-category-name btn shadow mx-1 ${
        category.id === currentTab.id ? 'bg-green-600' : 'bg-white'
      }"
    >
      ${category.name}
    </button>`,
    )
    .join('');
};

export default Navigation;
