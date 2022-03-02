import { Container as muiContainer } from '@mui/material';
import styled from '@emotion/styled';
import CategoryList from './Category/CategoryList';
import MenuList from './Menu/MenuList';

const Container = styled(muiContainer)`
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = () => {
  return (
    <Container>
      <CategoryList />
      <MenuList />
    </Container>
  );
};

export default App;
