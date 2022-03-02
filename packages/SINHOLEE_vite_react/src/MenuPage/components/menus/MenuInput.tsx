import { useNode } from '../../../NodeContext/hooks/useNode';
import { Category } from '../../../NodeContext/types';
import { GLOBAL_UNIQUE_TYPE } from '../../../NodeContext/constants';
import { LAYOUT } from '../../../css-constant';
import React from 'react';

export default function MenuInput({ categoryId }: { categoryId: string }) {
  const category = useNode<Category>({ type: GLOBAL_UNIQUE_TYPE.category, id: categoryId });

  return (
    <form>
      <label className={LAYOUT.grid}>
        <input
          type="text"
          placeholder={`${category.title_ko}${category.postPosition} 등록하세요.`}
        />
        <input type="submit" value="등록" />
      </label>
    </form>
  );
}
