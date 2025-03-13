import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/js/Home';
import About from './pages/js/Toyota';
import Contact from './pages/js/Rolls-Royce';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Register from './pages/js/Register';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
        
      </Routes>
    </Router>
  );
}

export default App;