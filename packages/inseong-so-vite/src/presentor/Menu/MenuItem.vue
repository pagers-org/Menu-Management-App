<script setup lang="ts">
import { computed } from 'vue';
import { useMenuStore } from '@/store';

const menuStore = useMenuStore();
const menuList = computed(() => menuStore.menus);
</script>
<template>
  <template v-for="menu in menuList" :key="menu.id">
    <li class="flex items-center py-2">
      <span class="w-full pl-2">{{ menu.name }}</span>
      <button
        class="bg-gray-50 text-gray-500 text-sm mr-1 w-[60px] cursor-pointer h-auto border-none outline-none rounded-[2rem]"
      >
        품절
      </button>
      <button
        class="bg-gray-50 text-gray-500 text-sm mr-1 w-[60px] cursor-pointer h-auto border-none outline-none rounded-[2rem]"
      >
        수정
      </button>
      <button
        class="bg-gray-50 text-gray-500 text-sm mr-1 w-[60px] cursor-pointer h-auto border-none outline-none rounded-[2rem]"
      >
        삭제
      </button>
    </li>
  </template>
</template>
