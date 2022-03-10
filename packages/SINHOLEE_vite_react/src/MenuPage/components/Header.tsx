import { Category } from '../../NodeContext/types';
import { GLOBAL_UNIQUE_TYPE } from '../../NodeContext/constants';
import { LAYOUT } from '../../css-constant';
import React from 'react';
import { useNode } from '../../NodeContext/hooks/useNode';
import { useNodeList } from '../../NodeContext/hooks/useNodeList';
import { useSearchParams } from 'react-router-dom';

const CategoryItem = ({ id }: { id: string }) => {
  const category = useNode<Category>({ id, type: GLOBAL_UNIQUE_TYPE.category });
  const [, setSearchParams] = useSearchParams();
  const onChangeTabAs = () => {
    setSearchParams({ [GLOBAL_UNIQUE_TYPE.category]: id });
  };
  return (
    <li style={{ display: 'flex' }}>
      <button type={'button'} className={'secondary'} onClick={onChangeTabAs}>
        {category.title_ko}
      </button>
    </li>
  );
};
export const Header = () => {
  const categories = useNodeList({ type: GLOBAL_UNIQUE_TYPE.category });
  return (
    <header style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
        <h1 style={{ marginTop: '2rem' }}>문벅스 관리</h1>
      </div>
      <div className={LAYOUT.container}>
        <ul style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
          {categories.map(({ id }) => (
            <CategoryItem id={id} key={id} />
          ))}
        </ul>
      </div>
    </header>
  );
};
