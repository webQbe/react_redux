/* Root of the App */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { store } from './app/store.jsx';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
/* Import Actions */
import { fetchPosts } from './features/posts/postSlice.jsx'; 
import { fetchUsers } from './features/users/usersSlice.jsx';

// Dispatch fetchPosts before rendering
store.dispatch(
                fetchPosts() /* Any component that use useSelector to access posts will have the latest data when the app starts. */
              );

// Dispatch fetchUsers
store.dispatch(fetchUsers());


// Create a root node for rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap the <App /> in <Provider store={store}> to make the Redux store available throughout the app
root.render(
  <React.StrictMode>
    <Provider store={store}>
     <Router> {/* Wrap the App inside <BrowserRouter> so that routing works */}
      <Routes> {/* App is rendered inside <Routes> */}
        <Route path='/*' element={<App />} />
      </Routes>
     </Router>
    </Provider>
  </React.StrictMode>
);