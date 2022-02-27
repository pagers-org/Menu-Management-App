import { Button, Link, Typography } from '@mui/material';
import { useMachine } from '@xstate/react';
import { CategoryContext } from 'domain';
import * as Styled from './Category.styles';
import { menuMachine } from '@machine/MenuMachine';
import { useEffect } from 'react';
import Spinner from 'presenter/components/Spinner';

const CategoryList = () => {
  const [{ context }, send] = useMachine(menuMachine);

  const categories: CategoryContext[] = context.categories;
  const showSpinner = context.showSpinner;

  useEffect(() => {
    send('FETCH');
  }, [send]);

  if (showSpinner) return <Spinner />;

  return (
    <Styled.Box component="header">
      <Link href="/" underline="none" color="black">
        <Typography variant="h4" fontWeight={700}>
          카페 메뉴 관리
        </Typography>
      </Link>
      <Styled.ButtonGroup variant="outlined">
        {categories.map(({ id, text, displayText, selected }) => (
          <Button
            variant={selected ? 'contained' : 'outlined'}
            key={id}
            data-category-name={text}
            onClick={() => send('TOGGLE', { id })}
          >
            {displayText}
          </Button>
        ))}
      </Styled.ButtonGroup>
    </Styled.Box>
  );
};

export default CategoryList;
