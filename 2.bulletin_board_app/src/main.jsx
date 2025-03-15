/* Main Entry Point */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { store } from './app/store.jsx';
import { Provider } from 'react-redux';

// Create a root node for rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap the <App /> in <Provider store={store}> to make the Redux store available throughout the app
root.render(
  <React.StrictMode>
    <Provider store={store}>
     <App />
    </Provider>
  </React.StrictMode>
);