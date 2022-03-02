import { Container } from '@mui/material';
import CategoryList from './Category/CategoryList';
import MenuList from './Menu/MenuList';

const App = () => {
  return (
    <Container
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <CategoryList />
      <MenuList />
    </Container>
  );
};

export default App;
