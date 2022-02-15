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

const MenuList = () => {
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
        <Typography variant="h6">☕ 에스프레소 메뉴 관리</Typography>
        <Box component="span">총 0개</Box>
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
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="에스프레소 메뉴 이름" />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
            <BorderColor />
          </IconButton>
        </Paper>
      </FormGroup>
      <List id="espresso-menu-list">{}</List>
    </Box>
  );
};

export default MenuList;
