import { BorderColor } from '@mui/icons-material';
import {
  Box,
  Divider,
  FormGroup,
  IconButton,
  InputBase,
  List,
  Paper,
  Typography,
} from '@mui/material';
import { useMachine } from '@xstate/react';
import { CategoryContext } from 'domain';
import appMachine from 'machine/app/machine';
import MenuItem from './MenuItem';

const MenuList = () => {
  const [current, send] = useMachine(appMachine);
  const { categories } = current.context;
  const { text, displayText, menus } = categories.find(
    category => category.selected,
  ) as CategoryContext;

  return (
    <Box
      component="main"
      sx={{
        marginTop: 4,
        width: '700px',
        bgcolor: 'white',
        padding: '3em',
        borderRadius: '15px',
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">{displayText}</Typography>
        <Box component="span">총 {menus.length}개</Box>
      </Box>
      <FormGroup id="espresso-menu-form">
        <Paper
          variant="outlined"
          sx={{
            marginTop: 2,
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder={`${displayText} 메뉴 이름`} />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
            <BorderColor />
          </IconButton>
        </Paper>
      </FormGroup>
      <List id={`${text}-menu-list`}>
        {menus.map(menu => (
          <MenuItem key={menu.menuId} menu={menu} />
        ))}
      </List>
    </Box>
  );
};

export default MenuList;
