import { CategoryEntity } from 'category';

export default class Category {
  categories: readonly CategoryEntity[];
  current: CategoryEntity;

  constructor(categories: CategoryEntity[]) {
    this.categories = categories;
    this.current = this.categories[0];
  }

  selected(id: string) {
    this.current = this.categories.find(
      ({ id: categoryId }) => id === categoryId,
    ) as CategoryEntity;
  }
}
