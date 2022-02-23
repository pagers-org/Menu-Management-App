import { CategoryContext } from 'domain';

export const CATEGORIES: CategoryContext[] = [
  {
    id: '@espresso@',
    text: 'espresso',
    displayText: '☕ 에스프레소',
    selected: false,
    menus: [],
  },
  {
    id: '@frappuccino@',
    text: 'frappuccino',
    displayText: '🥤 프라푸치노',
    selected: false,
    menus: [],
  },
  { id: '@blended@', text: 'blended', displayText: '🍹 블렌디드', selected: false, menus: [] },
  { id: '@teavana@', text: 'teavana', displayText: '🍸 티바나', selected: false, menus: [] },
  { id: '@desert@', text: 'desert', displayText: '🍰 디저트', selected: false, menus: [] },
];
