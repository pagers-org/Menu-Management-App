import { useNode } from '../../../NodeContext/hooks/useNode';
import { MenuItem } from '../../../NodeContext/types';
import { GLOBAL_UNIQUE_TYPE } from '../../../NodeContext/constants';
import React from 'react';

export default function Menu({ id }: { id: string }) {
  const { isSoldOut, title } = useNode<MenuItem>({ id, type: GLOBAL_UNIQUE_TYPE.menuItem });

  return (
    <li style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <span style={{ textDecoration: isSoldOut ? 'line-through' : 'none' }}>{title}</span>
      </div>
      <div>
        <a href="#" role="button">
          <span>품절</span>
        </a>
        <a href="#" role="button">
          수정
        </a>
        <a href="#" role="button">
          삭제
        </a>
      </div>
    </li>
  );
}
