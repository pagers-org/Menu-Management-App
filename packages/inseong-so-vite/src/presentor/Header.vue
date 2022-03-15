<script setup lang="ts">
import { APP_TITLE } from '@/constants';
import { useMenuStore } from '@/store';

const menuStore = useMenuStore();
const handlerClick = (event: MouseEvent) => {
  const selectCategoryId = (event.target as HTMLButtonElement).dataset.categoryName;
  if (selectCategoryId === undefined) throw new Error('엘리먼트가 유효하지 않아요😇');
  menuStore.selectCategory(selectCategoryId);
};
</script>
<template>
  <header class="my-4">
    <a href="/" class="text-black">
      <h1 class="text-center font-bold text-[2em] m-b my-5">{{ APP_TITLE }}</h1>
    </a>
    <nav class="flex justify-center flex-wrap">
      <template v-for="category in menuStore.categories" :key="category.id">
        <button
          :data-category-name="category.id"
          class="h-9 min-w-[64px] px-4 rounded outline-none border-none cursor-pointer shadow mx-1 hover:bg-gray-400"
          :class="category.selected ? 'bg-gray-300' : 'bg-white'"
          @click="handlerClick"
        >
          {{ category.text }}
        </button>
      </template>
    </nav>
  </header>
</template>
