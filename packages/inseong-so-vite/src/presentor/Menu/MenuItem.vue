<script setup lang="ts">
import { computed } from 'vue';
import { useMenuStore } from '@/store';
import { Menu } from '@/types';

const menuStore = useMenuStore();
const menuList = computed(() => menuStore.menus);

const soldOutMenuAction = ({ menuId, isSoldOut }: Menu) => {
  if (!confirm(`${isSoldOut ? '입고' : '품절'} 처리하시겠어요?`)) return;
  menuStore.soldOut({ menuId, isSoldOut: !isSoldOut });
};
const modifyMenuAction = (menu: Menu) => {
  const newName = prompt('메뉴 이름을 변경하시겠어요?🤤');
  if (newName.trim().length < 1) return alert('변경할 메뉴 이름을 입력해주세요!😳');
  menuStore.modify({ ...menu, name: newName });
};

const removeMenuAction = (menu: Menu) => {
  if (!confirm('삭제하시겠어요?🙄')) return;
  menuStore.remove(menu);
  alert('메뉴가 정상적으로 삭제 되었어요😇');
};
</script>
<template>
  <template v-for="menu in menuList" :key="menu.id">
    <li class="flex items-center py-2" :class="[menu.isSoldOut ? 'line-through' : '']">
      <span class="w-full pl-2">{{ menu.name }}</span>
      <button
        class="bg-gray-50 text-gray-500 text-sm mr-1 w-[60px] cursor-pointer h-auto border-none outline-none rounded-[2rem]"
        @click="() => soldOutMenuAction(menu)"
      >
        {{ menu.isSoldOut ? '입고' : '품절' }}
      </button>
      <button
        class="bg-gray-50 text-gray-500 text-sm mr-1 w-[60px] cursor-pointer h-auto border-none outline-none rounded-[2rem]"
        @click="() => modifyMenuAction(menu)"
      >
        수정
      </button>
      <button
        class="bg-gray-50 text-gray-500 text-sm mr-1 w-[60px] cursor-pointer h-auto border-none outline-none rounded-[2rem]"
        @click="() => removeMenuAction(menu)"
      >
        삭제
      </button>
    </li>
  </template>
</template>
