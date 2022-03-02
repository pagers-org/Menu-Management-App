import { Routes, Route } from 'react-router-dom';
import MenuPage from './MenuPage';
import NotFound from './NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MenuPage />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
