import React from 'react';

export default function MenuListHeader({
  categoryTitle,
  menusLength,
}: {
  categoryTitle: string;
  menusLength: number;
}) {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h2 style={{ margin: 0 }}>{categoryTitle}</h2>
      </div>
      <div>총 {menusLength}개</div>
    </header>
  );
}
