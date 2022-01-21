import Component from '../../core/Component';
import { Coffee } from '../../modules/constants';

export default class Category extends Component {
  template() {
    return Object.values(Coffee)
      .map(
        ({ koreanName, key }) => `
	<button
		data-category-name="${key}"
		class="cafe-category-name btn bg-white shadow mx-1"
	>
		${koreanName}
	</button>`,
      )
      .join('');
  }
}
