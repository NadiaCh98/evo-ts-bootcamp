import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { AppErrorBoundary } from './AppErrorBoundary';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppErrorBoundary>
        <Provider store={store}>
          <App />
        </Provider>
      </AppErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
