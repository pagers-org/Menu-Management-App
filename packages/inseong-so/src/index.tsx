import { StrictMode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import ReactDOM from 'react-dom';
import App from './presenter';
import * as Global from './index.styles';

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={Global.theme}>
      <CssBaseline>
        <Global.ResetStyle />
        <App />
      </CssBaseline>
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root'),
);
