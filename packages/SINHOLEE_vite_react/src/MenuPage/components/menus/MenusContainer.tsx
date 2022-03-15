import { useNodeList } from '../../../NodeContext/hooks/useNodeList';
import { Category, MenuItem } from '../../../NodeContext/types';
import { GLOBAL_UNIQUE_TYPE } from '../../../NodeContext/constants';
import { useNode } from '../../../NodeContext/hooks/useNode';
import { LAYOUT } from '../../../css-constant';
import MenuListHeader from './MenusHeader';
import MenuInput from './MenuInput';
import Menu from './MenuItem';
import React, { useEffect } from 'react';
import axios from 'axios';

const useMenuListByCategory = ({ categoryId }: { categoryId: string }) => {
  const menuList = useNodeList<MenuItem>({ type: GLOBAL_UNIQUE_TYPE.menuItem });
  return menuList.filter(item => item[GLOBAL_UNIQUE_TYPE.category] === categoryId);
};

export default function MenusContainer({ categoryId }: { categoryId: string }) {
  const menus = useMenuListByCategory({ categoryId });
  const category = useNode<Category>({ type: GLOBAL_UNIQUE_TYPE.category, id: categoryId });

  useEffect(() => {
    const url = `api/v1/category/${category.name}/menu`;
    const asyncFetch = async () => {
      const data = await axios(url);
      console.log(data);
    };
    asyncFetch();
  }, [categoryId]);

  return (
    <main className={LAYOUT.container}>
      <MenuListHeader categoryTitle={category.title_ko} menusLength={menus.length} />
      <MenuInput categoryId={categoryId} />
      <ul>
        {menus.map(({ id }) => (
          <Menu id={id} key={id} />
        ))}
      </ul>
    </main>
  );
}
