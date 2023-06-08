import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { AuthContexProvider } from './context/authContext.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <React.StrictMode>
    <AuthContexProvider>
    <App />
    </AuthContexProvider>
    
  </React.StrictMode>
 
);


