import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLogin from './components/UserLogin';
import Profile from './components/Profile';
import MyNavigation from './components/UI/Navigation';
import TaskEnter from './components/TaskEnter';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/" element={<MyNavigation />} />
            <Route path="login" element={<UserLogin />} />
            <Route path="task" element={<TaskEnter />} />
            <Route path="profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
