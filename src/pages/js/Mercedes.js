import logo from '../../img/mec/logo.jpg'
import {cclass, eclass, sclass, glc, gle, gls, maysclass, maygls, g63} from '../../img/mec/index'
import {React, useEffect, useState} from 'react';
import CarList from './CarList';
function Mercedes() {
    const [cars, setCars] = useState([]);
    useEffect(() => {
        const storedCars = JSON.parse(localStorage.getItem("cars")) || [];
        setCars(storedCars);
    }, []);
  return (
    <div className="font-serif">
        <div className="my-10 flex flex-col items-center">
            <img src={logo} alt="Logo Mercedes" className="w-32"/>
            <h1 className="text-4xl my-6">Các dòng xe Mercedes-Benz</h1>
            <h4 className="text-xl">Khám phá thế giới đa dạng về thương hiệu và mẫu xe của chúng tôi: Tại đây, bạn sẽ tìm thấy chiếc xe mơ ước của mình.</h4>
        </div>
        <div className="flex justify-center w-1/2 mx-auto">
            <button className="border-2 border-black p-4 hover:bg-black hover:text-white">
                Mercrdes-Benz
            </button>
            <button className="border-2 border-black p-4 hover:bg-black hover:text-white">
                AMG
            </button>
            <button className="border-2 border-black p-4 hover:bg-black hover:text-white">
                MAYBACH
            </button>
        </div>
        <div className="flex my-16 mx-20">
            <div className="flex flex-col items-start gap-4 w-1/6">
                <h2 className="text-2xl text-black">13 Mẫu</h2>
                <h3 className="text-xl text-black">Loại thân xe</h3>
                <button className="border-2 rounded-lg border-black p-1 ">
                    Sedans
                </button>
                <button className="border-2 rounded-lg border-black p-1 ">
                    Xe địa hình / SUV
                </button>
                <button className="border-2 rounded-lg border-black p-1 ">
                    Xe Coupé
                </button>
                <button className="border-2 rounded-lg border-black p-1 ">
                    Cabriolet
                </button>
                <h3 className="text-xl text-black">Loại nhiên liệu</h3>
                <button className="border-2 rounded-lg border-black p-1 ">
                    Điện
                </button>
            </div>
            <div className="grid grid-cols-2 gap-20 mx-32 my-10">
                {cars
                .filter(car => car.carbrand === "Mercedes-Benz")
                .map((car, index) => (
                    <div key={index} className="border border-gray-400 p-4 text-center rounded-lg shadow-lg">
                        <img src={car.carImage} alt={car.carname} className="w-full h-48 object-cover rounded-md"/>
                        <h2 className="text-black text-lg font-semibold mt-2">{car.carname}</h2>
                        <h3 className="text-gray-700">Giá từ {car.carprice} tỷ</h3>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Mercedes;