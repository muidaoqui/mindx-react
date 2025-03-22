import React, { useState } from "react";
import logo from "../img/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container mx-auto px-4">
      <nav className="flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <a href="/">
            <img src={logo} alt="Logo" className="w-16 h-16" />
          </a>
          <a className="text-2xl font-bold text-gray-800">Car Selling Autohunt</a>
        </div>

        {/* Search Box */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-md px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-2 top-2 text-gray-500">
            <i className="fa fa-search"></i>
          </button>
        </div>

        {/* Icons */}
        <div className="flex space-x-6 text-xl">
          <a href="#" className="text-gray-700 hover:text-blue-600">
            <i className="fa-solid fa-cart-shopping"></i>
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600">
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
        className={`flex flex-col md:flex-row md:space-x-6 text-lg font-semibold ${
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
            <a href="#" className="hover:text-blue-600 transition duration-300">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
