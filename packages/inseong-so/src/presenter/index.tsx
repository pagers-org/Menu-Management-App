import * as React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  FormGroup,
  IconButton,
  InputBase,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { BorderColor, Delete, Edit, NoFood } from '@mui/icons-material';

function generate(element: React.ReactElement) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const App = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box
          component="header"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Link href="/" underline="none" color="black">
            <Typography variant="h4" fontWeight={700}>
              카페 메뉴 관리
            </Typography>
          </Link>
          <ButtonGroup sx={{ marginTop: 4 }} variant="outlined" aria-label="outlined button group">
            <Button data-category-name="espresso">☕ 에스프레소</Button>
            <Button data-category-name="frappuccino">🥤 프라푸치노</Button>
            <Button data-category-name="blended">🍹 블렌디드</Button>
            <Button data-category-name="teavana">🍸 티바나</Button>
            <Button data-category-name="desert">🍰 디저트</Button>
          </ButtonGroup>
        </Box>
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
          <Box>
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
            <ul id="espresso-menu-list"></ul>
            <List>
              <ListItem
                secondaryAction={
                  <>
                    <IconButton edge="start" aria-label="sold-out">
                      <NoFood />
                    </IconButton>
                    <IconButton aria-label="edit">
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                      <Delete />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary="Single-line item" />
              </ListItem>
              <ListItem
                secondaryAction={
                  <>
                    <IconButton edge="start" aria-label="sold-out">
                      <NoFood />
                    </IconButton>
                    <IconButton aria-label="edit">
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                      <Delete />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary="Single-line item" />
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default App;
