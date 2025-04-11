import React, { useState, useEffect } from "react";
import logo from '../../img/volvo/logo.jpg'
import {xc40, xc60, xc90, ec40, s90} from '../../img/volvo/index.js';
import CarList from './CarList';
function Volvo() {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    const storedCars = JSON.parse(localStorage.getItem("cars")) || [];
    setCars(storedCars);
  }, []);        
  return (
    <div className="font-sans mb-10">
        <div className="flex justify-center my-16">
          <img src={logo} alt="Logo Volvo" className=" w-20"/>
        </div>
        <div className="flex justify-between mx-10">
            <div>
              <p className="font-light">request a quote</p>
              <h1 className="text-3xl font-bold">Select model</h1>
            </div>
            <div>
              <h3 className="text-xl font-light text-black">Select which car to get a quote on</h3>
            </div>
        </div>
        <div className="flex justify-center my-10 gap-1 w-auto">
          <button className="border-1 text-center focus:outline-none focus hover:bg-gray-100 w-32 h-10 ">
            All
          </button>
          <button className="border-1 text-center focus:outline-none focus hover:bg-gray-100 w-32 h-10"> 
            Electric
          </button>
          <button className="border-1 text-center focus:outline-none focus hover:bg-gray-100 w-32 h-10">
            Plug-In Hybrid
          </button>
          <button className="border-1 text-center focus:outline-none focus hover:bg-gray-100 w-32 h-10">
            Mild Hybrid
          </button>
        </div>
        <div className="grid-cols-1 md:grid grid-cols-2 xl:grid-cols-3 gap-10 mx-20">
                {cars
                .filter(car => car.carbrand === "Volvo")
                .map((car, index) => (
                    <div key={index} className="border border-gray-400 my-10 text-center rounded-lg shadow-lg">
                        <img src={car.carImage} alt={car.carname} className="w-auto object-cover rounded-md mx-auto"/>
                        <h2 className="text-black text-lg font-semibold mt-2">{car.carname}</h2>
                        <h3 className="text-gray-700">Giá từ {car.carprice} tỷ</h3>
                    </div>
                ))}
        </div>
    </div>
  )
}

export default Volvo;