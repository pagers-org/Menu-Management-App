<template>
  <div class="flex justify-between">
    <h2 class="text-2xl mb-5 mt-1 font-bold">☕ 에스프레소 메뉴 관리</h2>
    <span class="mr-2 mt-4">총 {{ menuCount }}개</span>
  </div>
  <form id="espresso-menu-form" @submit.prevent="addMenu">
    <div class="flex w-full">
      <label for="espresso-menu-name" hidden> 에스프레소 메뉴 이름 </label>
      <input
        id="espresso-menu-name"
        v-model="newMenuName"
        type="text"
        name="espressoMenuName"
        class="text-base font-normal w-full h-auto px-5 py-3 border-none outline-none rounded-[2rem] bg-[#f1f5f9]"
        placeholder="에스프레소 메뉴 이름"
        autocomplete="off"
      />
      <button
        id="espresso-menu-submit-button"
        type="submit"
        name="submit"
        class="text-base cursor-pointer min-w-[90px] h-auto px-5 py-[0.65rem] border-none outline-none rounded-[2rem] bg-green-600 ml-2"
      >
        확인
      </button>
    </div>
  </form>
  <MenuItem :menus="menus" @reload-menu-list="initMenuList" />
</template>

<script>
// TODO: 추후 ts, setup 적용
import { ref } from '@vue/reactivity';
import MenuItem from './MenuItem.vue';
import { getMenusAPI, createMenuAPI } from '@/api/menu.ts';
export default {
  components: {
    MenuItem,
  },
  setup() {
    /* 반응형 data 선언 */
    const newMenuName = ref('');

    return { newMenuName };
  },
  data() {
    return {
      category: 'espresso',
      menus: [],
    };
  },
  computed: {
    menuCount() {
      return this.menus.length;
    },
  },
  mounted() {
    this.initMenuList();
  },
  methods: {
    async initMenuList() {
      const menuList = await getMenusAPI(this.category);
      this.menus = menuList;
    },
    async addMenu() {
      if (this.menus.length === 20) {
        return alert('메뉴는 20개까지 추가 가능합니다.');
      }
      if (!this.newMenuName) return;
      try {
        await createMenuAPI({
          category: this.category,
          name: this.newMenuName,
        });
      } catch (error) {
        // TODO: 커스텀 에러 객체 만들어서 message만 알림창에 표시하기
        this.newMenuName = '';
        return alert(error);
      }
      this.newMenuName = '';
      this.initMenuList();
    },
  },
};
</script>
