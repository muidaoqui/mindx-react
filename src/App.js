import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/js/Home';
import About from './pages/js/Toyota';
import Contact from './pages/js/Rolls-Royce';
import Register from './pages/js/Register';
import Login from './pages/js/Login';
import '@fortawesome/fontawesome-free/css/all.min.css';
import UserList from './pages/js/UserList';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-list" element={<UserList />} /> {/* Thêm route này */}
      </Routes>
    </Router>
  );
}

export default App;


