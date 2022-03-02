import { menuMachine } from '@machine/MenuMachine';
import { BorderColor } from '@mui/icons-material';
import { Box, FormGroup, List, Typography } from '@mui/material';
import { useMachine } from '@xstate/react';
import { ACTIONS } from '../../constants';
import React, { useEffect, useRef } from 'react';
import * as Styled from './Menu.styles';
import MenuItem from './MenuItem';

const MenuList = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [{ context }, send] = useMachine(menuMachine);

  const selectedCategory = context.categories.find(({ selected }) => selected);

  useEffect(() => {
    send('FETCH');
  }, [send]);

  const addMenuItem = (name: string) => {
    const payload = { categoryId: selectedCategory?.id, name };
    send({ type: ACTIONS.ADD_MENU_ITEM, payload });

    if (inputRef.current instanceof HTMLInputElement) inputRef.current.value = '';
  };

  const handleClick = () => {
    addMenuItem(inputRef.current?.value as string);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    addMenuItem(inputRef.current?.value as string);
  };

  return (
    <Styled.MenuListWrapper component="main">
      <Styled.MenuListTitleWrapper>
        <Typography variant="h6">{selectedCategory?.displayText}</Typography>
        <Box component="span">총 {selectedCategory?.menus.length}개</Box>
      </Styled.MenuListTitleWrapper>
      <FormGroup id={`${selectedCategory?.text}-menu-form`}>
        <Styled.Paper variant="outlined">
          <Styled.InputBase
            inputRef={inputRef}
            placeholder={`${selectedCategory?.displayText} 메뉴 이름`}
            onKeyDown={handleKeyDown}
          />
          <Styled.Divider orientation="vertical" />
          <Styled.IconButton color="primary" onClick={handleClick}>
            <BorderColor />
          </Styled.IconButton>
        </Styled.Paper>
      </FormGroup>
      <List id={`${selectedCategory?.text}-menu-list`}>
        {selectedCategory?.menus.map((menu, index) => (
          <MenuItem key={index} menu={menu} />
        ))}
      </List>
    </Styled.MenuListWrapper>
  );
};

export default MenuList;
