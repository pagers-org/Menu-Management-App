import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { NodeProvider } from './NodeContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <NodeProvider>
        <App />
      </NodeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
