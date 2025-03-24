import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/js/Home';
import About from './pages/js/Toyota';
import Register from './pages/js/Register';
import Login from './pages/js/Login';
import '@fortawesome/fontawesome-free/css/all.min.css';
import UserList from './pages/js/UserList';
import CarList from './pages/js/CarList';
import Shopping from './pages/js/Shopping';
function App() {
  return (
    <Router>
      {/* Ẩn Navbar trên Login và Register */}
      {window.location.pathname !== "/login" && window.location.pathname !== "/register" && <Navbar />}

      <Routes>
        {/* Trang đăng ký */}
        <Route path="/register" element={<Register />} />

        {/* Trang đăng nhập */}
        <Route path="/login" element={<Login />} />

        {/* Trang chủ */}
        <Route path="/home" element={<Home />} />

        {/* Trang giới thiệu về Toyota */}
        <Route path="/about" element={<About />} />


        {/* Chuyển hướng mặc định */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/user-list" element={<UserList/>} />
        <Route path="/car-list" element={<CarList/>} />
        <Route path="/shopping-cart" element={<Shopping/>} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />

      </Routes>
    </Router>
  );
}



export default App;

