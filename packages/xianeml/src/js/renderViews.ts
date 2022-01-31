import { $ } from '../utils/domController.js';
import layoutView from '../components/layout/index.js';
import { Tstore } from '../types/store.js';
import { handleNavigation, handleSubmitMenuForm, handleMenuList } from './events.js';

export const renderViews = (store: Tstore) => {
  const state = store.getState();
  $('#app').innerHTML = layoutView(state);

  const $menuForm = $('#espresso-menu-form');
  const $menuList = $('#espresso-menu-list');
  $('nav').addEventListener('click', handleNavigation(store));
  $menuForm.addEventListener('submit', handleSubmitMenuForm(store));
  $menuList.addEventListener('click', (e: Event) => handleMenuList(e, store));
};
