import logo from '../../img/mec/logo.jpg';
import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Mercedes() {
    const [cars, setCars] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCars = JSON.parse(localStorage.getItem("cars")) || [];
        setCars(storedCars);
    }, []);

    const handleSelectType = (type) => {
        setSelectedType(prev => (prev === type ? null : type));
    };

    const filteredCars = cars
        .filter(car => car.carbrand === "Mercedes-Benz")
        .filter(car => {
            if (!selectedType) return true;
            return car.carmodel?.toLowerCase() === selectedType.toLowerCase();
        });

    return (
        <div className="font-serif">
            <div className="my-10 flex flex-col items-center px-4 text-center">
                <img src={logo} alt="Logo Mercedes" className="w-32" />
                <h1 className="text-3xl md:text-4xl my-6">Các dòng xe Mercedes-Benz</h1>
                <h4 className="text-base md:text-xl">
                    Khám phá thế giới đa dạng về thương hiệu và mẫu xe của chúng tôi: Tại đây, bạn sẽ tìm thấy chiếc xe mơ ước của mình.
                </h4>
            </div>
            <div className="flex flex-wrap justify-center gap-3 w-full md:w-3/4 lg:w-1/2 mx-auto mt-6 px-4">
                <button className="border-2 border-black p-3 md:p-4 hover:bg-black hover:text-white">
                    Mercedes-Benz
                </button>
                <button className="border-2 border-black p-3 md:p-4 hover:bg-black hover:text-white">
                    AMG
                </button>
                <button className="border-2 border-black p-3 md:p-4 hover:bg-black hover:text-white">
                    MAYBACH
                </button>
            </div>
            <div className="flex justify-center mt-8">
                <button
                    className="border-2 border-black px-6 py-2 rounded hover:bg-black hover:text-white"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    {showFilters ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
                </button>
            </div>
            <div className="flex flex-col lg:flex-row my-16 mx-4 lg:mx-20 gap-8">
                {showFilters && (
                    <div className="flex flex-col items-start gap-4 w-full lg:w-1/5">
                        <h2 className="text-xl md:text-2xl text-black">13 Mẫu</h2>
                        <h3 className="text-lg md:text-xl text-black">Dòng xe</h3>
                        {['Class', 'GL', 'G', 'Cabriolet'].map(type => (
                            <button
                                key={type}
                                className={`border-2 rounded-lg border-black p-2 w-full text-left ${
                                    selectedType === type ? 'bg-black text-white' : ''
                                }`}
                                onClick={() => handleSelectType(type)}
                            >
                                {type}
                            </button>
                        ))}
                        <h3 className="text-lg md:text-xl text-black mt-4">Loại nhiên liệu</h3>
                        <button className="border-2 rounded-lg border-black p-2 w-full text-left">
                            Điện
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
                    {filteredCars.map((car, index) => (
                        <div
                            key={index}
                            className="border border-gray-400 p-4 text-center rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
                            onClick={() => navigate(`/car-details/${car.carid}`)}
                        >
                            <img
                                src={car.carImage}
                                alt={car.carname}
                                className="w-full h-48 sm:h-56 object-cover rounded-md"
                            />
                            <h2 className="text-black text-lg font-semibold mt-2">{car.carname}</h2>
                            <h3 className="text-gray-700">Giá từ {car.carprice} tỷ</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Mercedes;
