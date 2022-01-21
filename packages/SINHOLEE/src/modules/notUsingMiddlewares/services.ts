// 추후 서비스 고도화하기
import { CoffeeKeys, MenuItem } from '../type';
import { CurrentMenuRepository } from './Repository';
import { MESSAGES } from '../../constants';
export interface CurrentMenuService {
  getList: () => MenuItem[];
  currentTab: () => { koreanName: string; key: CoffeeKeys };
  changeTab: (selectedTab: CoffeeKeys) => void;

  remove: (menuId: string | undefined) => void;
  toggleSoldOut: (menuId: string | undefined) => void;
  edit: (menuId: string | undefined) => void;
  add: (text: string) => void;
  fetchByCategory: (cate: CoffeeKeys) => void;
}
export const createCurrentMenuService = (() => {
  console.log('클로져!!');
  return (currentMenuRepo: CurrentMenuRepository): CurrentMenuService => ({
    getList: currentMenuRepo.getList,
    currentTab: currentMenuRepo.currentTab,

    changeTab: selectedTab => {
      currentMenuRepo.changeTab(selectedTab);
    },
    toggleSoldOut: async menuId => {
      if (menuId === undefined) {
        return;
      }
      if (!currentMenuRepo.findById(menuId)) {
        alert('수정할 수 없는 메뉴입니다.');
        return;
      }
      const category = currentMenuRepo.currentTab().key;
      try {
        await currentMenuRepo.toggleSoldOut(menuId, category);
      } catch (e: any) {
        console.error(e);
        alert(e?.message);
      }
    },
    // 시도1 컴포넌트에서 ui 조작까지 다 도맡아 하기
    remove: async menuId => {
      // validate
      if (menuId === undefined) {
        return;
      }
      if (!currentMenuRepo.findById(menuId)) {
        alert('삭제할 수 없는 메뉴입니다.');
        return;
      }
      const category = currentMenuRepo.currentTab().key;
      try {
        await currentMenuRepo.remove(menuId, category);
      } catch (e: any) {
        console.error(e);
        alert(e?.message);
      }
    },
    // 시도2 service에서 ui 조작까지 다 도맡아 하기
    edit: async menuId => {
      const menu = currentMenuRepo.findById(menuId);
      if (!menu) {
        alert('수정할 수 없는 메뉴입니다.');
        return;
      }

      const newName = prompt(MESSAGES.PROMPT_EDIT_MENU, menu?.text);
      if (newName === null || newName === '') {
        alert('빈값을 입력할 수 없습니다.');
        return;
      }

      if (currentMenuRepo.findByText(newName)) {
        // 원본과 똑같으므로 바꾸지 않는다. 추후 기존과 동일한 정보로 수정할 수 없다는 ui 추가예정
        return;
      }
      const category = currentMenuRepo.currentTab().key;
      // try catch 사용처 고민
      // 에러를 포착하는 시점은 application 의 상단부분에 가까울 수록 좋은가?
      // 아니면 코어에 가까울수록 좋은가?
      // 개인적으로는 application 단에 가까울수록 개발 친화적이라고 생각한다.
      //이유 1. try-catch 가 여기저기 달려있으면 지저분해보여 가독성을 헤친다고 생각한다.
      //이유 2. 미리 캐치를 해버리면 앱 상단에서 처리를 위임할 수 없다.
      try {
        await currentMenuRepo.edit({
          menuId: menu.id,
          text: newName,
          category,
        });
      } catch (e: any) {
        console.error(e);
        alert(e?.message);
      }
    },
    // 에러, validate, ui 컨트롤 영역
    add: async text => {
      // validate
      // 해당 메서드가 validation 과 ui 컨트롤을 하는데, 너무 중구난방의 느낌이 든다.
      if (text === '') {
        return;
      }
      if (currentMenuRepo.findByText(text)) {
        alert('이미 존재하고 있는 음료입니다.');
        return;
      }

      const category = currentMenuRepo.currentTab().key;
      try {
        await currentMenuRepo.add(text, category);
      } catch (e: any) {
        alert(e?.message);
      }
    },
    fetchByCategory: async cate => {
      await currentMenuRepo.fetchByCategory(cate);
    },
  });
})();

// 임시 테스트
