import Component from '../types/component';
import cafeMenuStore from '../cafeMenuStore';
import * as actions from '../actions';

export default class MenuCategory extends Component {
  categorys: Category[];
  selectedCategory: Category;

  init() {
    const { categorys, selectedCategory } = cafeMenuStore.getState() as CafeMenuState;
    this.categorys = categorys;
    this.selectedCategory = selectedCategory;
  }

  template(): string {
    return this.categorys
      .map(
        category =>
          `
            <button data-category-name="${category.name}" class="cafe-category-name btn bg-white shadow mx-1">
                ${category.emoji}  ${category.value}
            </button>
          `,
      )
      .join('\n');
  }

  componentDidMount(): void {
    this.$target.addEventListener('click', e => {
      const $target = e.target as HTMLElement;
      const categoryName = $target?.dataset?.categoryName;
      const selectCategory = this.categorys.find(category => category.name === categoryName);

      if (!selectCategory) return;

      cafeMenuStore.dispatch(actions.changeCategory(selectCategory));
      cafeMenuStore.dispatch(actions.setMenuNames([])); // 데이터 불러오기 기능 구현 전까지는 빈 배열로 초기화
    });
  }
}
