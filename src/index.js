import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ContextProvider } from './contexts/ContextProvider';
import { Toaster } from 'react-hot-toast';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider  >
      <App />
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
