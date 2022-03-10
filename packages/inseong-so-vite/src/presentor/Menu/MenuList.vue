<script setup lang="ts">
import MenuItem from './MenuItem.vue';
</script>
<template>
  <div class="flex justify-between">
    <h2 class="text-2xl mb-5 mt-1 font-bold">☕ 에스프레소 메뉴 관리</h2>
    <span class="mr-2 mt-4">총 0개</span>
  </div>
  <form id="espresso-menu-form">
    <div class="flex w-full">
      <label for="espresso-menu-name" hidden> 에스프레소 메뉴 이름 </label>
      <input
        id="espresso-menu-name"
        type="text"
        name="espressoMenuName"
        class="text-base font-normal w-full h-auto px-5 py-3 border-none outline-none rounded-[2rem] bg-[#f1f5f9]"
        placeholder="에스프레소 메뉴 이름"
        autocomplete="off"
      />
      <button
        id="espresso-menu-submit-button"
        type="button"
        name="submit"
        class="text-base cursor-pointer min-w-[90px] h-auto px-5 py-[0.65rem] border-none outline-none rounded-[2rem] bg-green-600 ml-2"
      >
        확인
      </button>
    </div>
  </form>
  <ul id="espresso-menu-list" class="mt-3 pl-0">
    <MenuItem />
  </ul>
</template>
