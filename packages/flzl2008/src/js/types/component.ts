import cafeMenuStore from '../cafeMenuStore';

export default class Component {
  $target: HTMLElement;
  props: any;

  constructor($target: HTMLElement, props?: any) {
    this.$target = $target;
    this.props = props;
    this.render();
  }

  template(): string {
    // 마크업 작성
    return ``;
  }

  render(): void {
    // 브라우저에 렌더링
    this.$target.innerHTML = this.template();
    this.componentDidMount();
  }

  componentDidMount(): void {
    // 이벤트 등록 및 관련(하위) 컴포넌트 생성
  }
}
