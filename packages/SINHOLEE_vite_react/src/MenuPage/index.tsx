import React from 'react';
import { GLOBAL_UNIQUE_TYPE } from '../NodeContext/constants';
import { Header } from './components/Header';
import { useSearchParams } from 'react-router-dom';
import MenusContainer from './components/menus/MenusContainer';

const MenuPage = () => {
  const [searchParams] = useSearchParams();
  // 마음에 안드는 부분... category도 id로 관리하려다 보니 default 값도 id를 알아야 함...
  const categoryId = searchParams.get(GLOBAL_UNIQUE_TYPE.category) ?? 'c1';
  return (
    <>
      <Header />
      <MenusContainer categoryId={categoryId} />
    </>
  );
};

export default MenuPage;
