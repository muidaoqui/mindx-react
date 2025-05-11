import React, { useState } from "react";
import logo from "../img/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const loggedInEmail = localStorage.getItem("loggedInUser");
  return (
    <div className="px-4 bg-gray-500 w-full">
      <nav className="flex items-center justify-between py-4 w-full">
        <div className="flex items-center gap-4">
          <a href="/home">
            <img src={logo} alt="Logo" className="w-12 h-12 md:w-16 md:h-16 rounded-xl" />
          </a>
          <span className="hidden md:inline text-2xl font-bold text-cyan-400">MD Autohunt</span>
        </div>
        <div className="relative flex-1 mx-4 md:mx-0 md:flex-none">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-lg px-4 py-2 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-yellow-600"
          />
          <button className="absolute right-3 top-2 text-yellow-600">
            <i className="fa fa-search"></i>
          </button>
        </div>
        <div className="flex items-center space-x-4 text-xl">
          {loggedInEmail?.toLowerCase() === "muidao156@gmail.com" && (
            <div className="hidden md:flex space-x-4">
              <a href="/user-list" className="text-yellow-500 hover:text-cyan-600">
                <i className="fa-solid fa-users"></i>
              </a>
              <a href="/car-list" className="text-yellow-500 hover:text-cyan-600">
                <i className="fa-solid fa-car"></i>
              </a>
            </div>
          )}
          <a href="/shopping-cart" className="text-yellow-500 hover:text-cyan-600">
            <i className="fa-solid fa-cart-shopping"></i>
          </a>
          <a href="/login" className="text-yellow-500 hover:text-cyan-600">
            <i className="fa-solid fa-user"></i>
          </a>
          <button className="md:hidden text-3xl text-yellow-500 hover:text-cyan-600 ml-2" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
        </div>
      </nav>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out md:hidden ${
          isOpen ? "max-h-[1000px] py-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col text-lg font-semibold space-y-2 text-white">
          {[
            { name: "Volvo", link: "/volvo" },
            { name: "Mercedes", link: "/mercedes" },
            { name: "BMW", link: "/bmw" },
            { name: "Rolls-Royce", link: "/rolls-royce" },
            { name: "Vinfast", link: "/vinfast" },
            { name: "Tesla", link: "/tesla" },
            { name: "Lexus", link: "/lexus" },
            { name: "Audi", link: "/audi" },
            { name: "Maserati", link: "/maserati" },
            { name: "Accessory", link: "/phu-kien" },
            { name: "News", link: "/tin-tuc" },
          ].map((item) => (
            <li key={item.name} className="text-center">
              <a
                href={item.link}
                className="hover:text-cyan-300 bg-gradient-to-r from-gray-100 to-yellow-300 bg-clip-text text-transparent transition duration-300"
              >
                {item.name}
              </a>
            </li>
          ))}
          {loggedInEmail?.toLowerCase() === "muidao156@gmail.com" && (
            <ul>
              <li className="text-center">
                <a href="/user-list" className="hover:text-cyan-300 bg-gradient-to-r from-gray-100 to-yellow-300 bg-clip-text text-transparent transition duration-300">
                  Danh Sách Người Dùng
                </a>
              </li>
              <li className="text-center">
                <a href="/car-list" className="hover:text-cyan-300 bg-gradient-to-r from-gray-100 to-yellow-300 bg-clip-text text-transparent transition duration-300">
                  Danh Sách Xe
                </a>
              </li>
            </ul>
          )}
        </ul>
      </div>
      <ul className="hidden md:flex md:flex-row md:space-x-6 text-lg font-semibold justify-center py-2 text-white">
        {[
          { name: "Volvo", link: "/volvo" },
          { name: "Mercedes", link: "/mercedes" },
          { name: "BMW", link: "/bmw" },
          { name: "Rolls-Royce", link: "/rolls-royce" },
          { name: "Vinfast", link: "/vinfast" },
          { name: "Tesla", link: "/tesla" },
          { name: "Lexus", link: "/lexus" },
          { name: "Audi", link: "/audi" },
          { name: "Maserati", link: "/maserati" },
          { name: "Accessory", link: "/phu-kien" },
          { name: "News", link: "/tin-tuc" },
        ].map((item) => (
          <li key={item.name}>
            <a
              href={item.link}
              className="hover:text-cyan-300 bg-gradient-to-r from-gray-100 to-yellow-300 bg-clip-text text-transparent transition duration-300"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
