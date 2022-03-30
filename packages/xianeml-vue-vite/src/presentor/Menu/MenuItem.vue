<template>
  <ul id="espresso-menu-list" class="mt-3 pl-0">
    <li v-for="menu in menus" :key="menu.id" class="flex items-center py-2">
      <span
        class="w-full pl-2"
        :class="{ 'line-through text-gray-400': !menu.inStock }"
        >{{ menu.menuName }}</span
      >
      <button
        class="bg-gray-50 text-gray-500 text-sm mr-1 w-[60px] cursor-pointer h-auto border-none outline-none rounded-[2rem]"
        @click="soldOutMenu(menu.id)"
      >
        {{ menu.inStock ? '품절' : '입고' }}
      </button>
      <button
        class="bg-gray-50 text-gray-500 text-sm mr-1 w-[60px] cursor-pointer h-auto border-none outline-none rounded-[2rem]"
        @click="modifyMenu(menu.id)"
      >
        수정
      </button>
      <button
        class="bg-gray-50 text-gray-500 text-sm mr-1 w-[60px] cursor-pointer h-auto border-none outline-none rounded-[2rem]"
        @click="deleteMenu(menu.id)"
      >
        삭제
      </button>
    </li>
  </ul>
</template>

<script>
// TODO: 추후 ts, setup 적용
import { modifyMenuAPI, soldOutMenuAPI, deleteMenuAPI } from '@/api/menu.ts';

export default {
  props: {
    category: {
      type: String,
      require: true,
      default: 'espresso',
    },
    menus: {
      type: Array,
      require: true,
      default: () => [],
    },
  },
  emits: ['reloadMenuList'],
  data() {
    return {};
  },
  methods: {
    async soldOutMenu(menuId) {
      if (!confirm('메뉴를 품절 처리하시겠습니까?')) return;
      const params = {
        category: this.category,
        menuId,
      };
      try {
        await soldOutMenuAPI(params);
      } catch (e) {
        console.error(e);
      }
      this.$emit('reloadMenuList');
    },
    async modifyMenu(menuId) {
      const newMenuName = prompt('수정할 메뉴명을 입력하세요.')?.trim();
      if (!newMenuName) return;
      const params = {
        category: this.category,
        menuId,
        name: newMenuName || '',
      };
      try {
        await modifyMenuAPI(params);
      } catch (e) {
        console.error(e);
      }
      this.$emit('reloadMenuList');
    },
    async deleteMenu(menuId) {
      if (!confirm('메뉴를 삭제하시겠습니까?')) return;
      const params = {
        category: this.category,
        menuId,
      };
      try {
        // TODO: 메뉴아이디와 다른 메뉴가 삭제되고 있음. 확인필요
        await deleteMenuAPI(params);
      } catch (e) {
        console.error(e);
      }
      this.$emit('reloadMenuList');
    },
  },
};
</script>
