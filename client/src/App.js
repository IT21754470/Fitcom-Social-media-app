import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Reg from './components/reg';
import Login from './components/Login';
import Profile from './components/Profile';
import Follow from './components/follow';
import Dashboard from './components/Dashboard';
import Followed from './components/followed';
import UserProfilePage from './components/userProfilePage';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Reg />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:user_id" element={<Profile />} />
          <Route path="/follow" element={<Follow />} />
          <Route path="/dashboard" element={<Dashboard />} />
<Route path="/followed" element={<Followed />} />

       <Route path="/userProfilePage/:userId" element={<UserProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

