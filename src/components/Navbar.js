import React, { useState } from 'react';
import './Navbar.css';
import logo from '../img/logo.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/"><img src={logo} alt='Logo' className='navbar-logo' /></a>
        <a className="brand">Car selling Autohunt</a>
        <div className="sreach">
          <input type="text" placeholder="Search.." className="input" />
          <button type="submit"><i className="fa fa-search"></i></button>
        </div>
        <div className="gh">
          <a href="#"><i className="fa-solid fa-cart-shopping"></i></a>
        </div>
        <div className="us">
          <a href="#"><i className="fa-solid fa-user"></i></a>
        </div>
      </div>

      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <ul className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        <li><a href="#">Toyota</a></li>
        <li><a href="#">Mercedes</a></li>
        <li><a href="#">BMW</a></li>
        <li><a href="#">Rolls-Royce</a></li>
        <li><a href="#">Vinfast</a></li>
        <li><a href="#">Tesla</a></li>
        <li><a href="#">Lexus</a></li>
        <li><a href="#">Audi</a></li>
        <li><a href="#">Maserati</a></li>
        <li><a href="#">Phụ Kiện</a></li>
        <li><a href="#">Tin Tức</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
