import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/qyeryClient';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store} >
        <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);




