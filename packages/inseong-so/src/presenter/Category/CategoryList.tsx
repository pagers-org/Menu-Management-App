import { Box, Button, ButtonGroup, Link, Typography } from '@mui/material';
import { useMachine } from '@xstate/react';
import appMachine from 'machine/app/machine';

const CategoryList = () => {
  const [current, send] = useMachine(appMachine);
  const { categories } = current.context;

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
        {categories.map(({ id, text, displayText }) => (
          <Button key={id} data-category-name={text} onClick={() => send('TOGGLE', { id })}>
            {displayText}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default CategoryList;
