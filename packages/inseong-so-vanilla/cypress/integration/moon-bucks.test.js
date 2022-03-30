import { CATEGORIES } from '../../dist/constants/index.js';

describe('Cafe Menu Management App', () => {
  describe('header', () => {
    beforeEach(() => {
      cy.visit('../../public/index.html');
    });

    it('최초 렌더링 시 카테고리 타이틀은 에스프레소임', () => {
      cy.getCategoryTitle(CATEGORIES[0].text);
    });

    describe('카테고리 버튼을 클릭', () => {
      it('카테고리 타이틀이 변경됨', () => {
        const index = 1;
        cy.categoryClick(index);
        cy.getCategoryTitle(CATEGORIES[index].text);
      });
    });
  });
});
