import React, { useState } from "react";
import logo from "../img/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container px-4 bg-gradient-to-r from-yellow-500 to-gray-900">
      <nav className="flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center space-x-4 gap-8">
          <a href="/">
            <img src={logo} alt="Logo" className="w-16 h-16 rounded-xl" />
          </a>
          <a className="text-2xl font-bold text-cyan-400 ml-10">MD  Autohunt</a>
        </div>

        {/* Search Box */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-lg  px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-yellow-600"
          />
          <button className="absolute right-2 top-2 text-yellow-600">
            <i className="fa fa-search "></i>
          </button>
        </div>

        {/* Icons */}
        <div className="flex space-x-6 text-xl">
          <a href="#" className="text-yellow-500 hover:text-cyan-600">
            <i className="fa-solid fa-cart-shopping"></i>
          </a>
          <a href="#" className="text-yellow-500 hover:text-cyan-600">
            <i className="fa-solid fa-user"></i>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </nav>

      {/* Navigation Links */}
      <ul
        className={`flex flex-col md:flex-row md:space-x-6 text-lg font-semibold justify-center justify-between py-2 bg-gradient-to-r from-yellow-500 to-gray-900 text-white ${
          isOpen ? "block" : "hidden md:flex"
        }`}
      >
        {[
          "Toyota",
          "Mercedes",
          "BMW",
          "Rolls-Royce",
          "Vinfast",
          "Tesla",
          "Lexus",
          "Audi",
          "Maserati",
          "Phụ Kiện",
          "Tin Tức",
        ].map((item) => (
          <li key={item} className="py-2 md:py-0">
            <a href="#" className="hover:text-cyan-300 bg-gradient-to-r from-gray-100 to-yellow-300 bg-clip-text text-transparent transition duration-300">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
