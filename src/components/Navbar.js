import React, { useState } from 'react';
import './Navbar.css';
import logo from '../img/logo.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/"><img src={logo} alt='Logo' className='navbar-logo' ></img></a>
      </div>
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <ul className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        <li><a href="/">NỮ</a></li>
        <li><a href="/details/male">NAM</a></li>
        <li><a href="/contact">TRẺ EM</a></li>
        <li><a href="/contact">EM BÉ</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;