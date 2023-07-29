import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/app" element={<App />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/profile/:username" element={<Profile />} />
    </Routes>
  </Router>
);
