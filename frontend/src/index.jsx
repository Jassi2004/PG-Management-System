// import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Create a root to render the App
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App inside the root
root.render(
  <BrowserRouter>  {/* This should wrap the whole App */}
    <App />
  </BrowserRouter>
);
