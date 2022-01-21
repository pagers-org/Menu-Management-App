import { $ } from '../utils/domController.js';
import layoutView from '../components/layout/index.js';
import { Tstate } from '../types/store.js';
import {
  handleNavigation,
  handleSubmitMenuForm,
  handleMenuList,
} from './events.js';

export const renderViews = (state: Tstate) => {
  $('#app').innerHTML = layoutView(state);

  const $menuForm = $('#espresso-menu-form');
  const $menuList = $('#espresso-menu-list');
  $('nav').addEventListener('click', (e: Event) => handleNavigation(e));
  $menuForm.addEventListener('submit', (e: Event) => handleSubmitMenuForm(e));
  $menuList.addEventListener('click', (e: Event) => handleMenuList(e));
};
