import Component from '../../../core/Component';

export class MenuItem extends Component {
  template() {
    const item = this?.props?.item;

    return `
      <span class="w-100 pl-2 menu-name ${item.isSoldOut ? 'sold-out' : ''}">
      ${item.text}
      </span>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
        data-id="${item.id}"
      >
        ${item.isSoldOut ? '입고' : '품절'}
      </button>
      <button
        type="button"
        class="
          bg-gray-50
          text-gray-500 text-sm
          mr-1
          menu-edit-button
        "
        data-id="${item.id}"
      >
      수정
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
        data-id="${item.id}"
      >
        삭제
      </button>
    `;
  }
}
