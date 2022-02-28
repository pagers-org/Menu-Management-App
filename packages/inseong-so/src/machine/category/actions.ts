import { MenuEntity } from 'domain';

const createMenuItem = ({ menuId, name, isSoldOut }: MenuEntity) => ({
  menuId,
  name,
  isSoldOut,
});

const newMenuItemAction = () => {};
const modifyMenuItemAction = () => {};
const soldOutMenuItemAction = () => {};
const removeMenuItemAction = () => {};
