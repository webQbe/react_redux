/* App Initialization */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// <ApiProvider> wraps the <App> component providing API functionality via apiSlice
import { ApiProvider } from '@reduxjs/toolkit/query/react'; 
import { apiSlice } from './features/api/apiSlice.jsx'; // Handles data fetching and caching

ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <ApiProvider api={apiSlice}> 
        <App />
      </ApiProvider>
    </React.StrictMode>
  );