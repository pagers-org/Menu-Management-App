import { Box, Button, ButtonGroup, Link, Typography } from '@mui/material';

const CategoryList = () => {
  return (
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
  );
};

export default CategoryList;
