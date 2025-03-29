import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/js/Home';
import Volvo from './pages/js/Volvo';
import Register from './pages/js/Register';
import Login from './pages/js/Login';
import '@fortawesome/fontawesome-free/css/all.min.css';
import UserList from './pages/js/UserList';
import CarList from './pages/js/CarList';
import Shopping from './pages/js/Shopping';
import Mercedes from './pages/js/Mercedes';
import Footer from './components/Footer';
import CarDetails from './pages/details/CarDetails';
function Layout() {
  const location = useLocation(); // Đặt useLocation() BÊN TRONG Router

  const hideNavAndFooter = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavAndFooter && <Navbar />}

      <main className="flex-1">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/volvo" element={<Volvo />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/car-list" element={<CarList />} />
          <Route path="/shopping-cart" element={<Shopping />} />
          <Route path="/mercedes" element={<Mercedes />} />
          <Route path="/details" element={<CarDetails />} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </main>

      {!hideNavAndFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout /> {/* Bọc Layout trong Router */}
    </Router>
  );
}

export default App;
