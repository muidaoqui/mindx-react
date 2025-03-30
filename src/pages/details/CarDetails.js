import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {interior, exterior, behind, light, lightbehind } from "../../img/mec/sclass/index"
import CarList from "../js/CarList";
import ava from "../../img/ava.jpg"
import { PhoneIcon } from "@heroicons/react/24/solid";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const CarDetails = () => {

    const [isExpanded, setIsExpanded] = useState(false);

    const images = [
        interior,
        exterior,
        behind,
        light,
        lightbehind,
    ];

    const [cars, setCars] = useState(null);
    const { carid } = useParams(); // Lấy carid từ URL
    useEffect(() => {
        const storedCars = JSON.parse(localStorage.getItem("cars")) || [];
        const foundCar = storedCars.find(c => c.carid === carid); // Tìm xe có carid trùng
        setCars(foundCar || null); // Nếu không tìm thấy thì set null
    }, [carid]);

    const [selectedImage, setSelectedImage] = useState(images.length > 0 ? images[0] : "");

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: true,
        focusOnSelect: true,
    };

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [contact, setContact] = useState('');

    const center = [10.762622, 106.660172];

  return (
    <div>
        <h1>Chi tiết xe: {carid}</h1>
        <div className="w-full max-w-5xl mx-auto my-16"> {/* Tăng max-width lên 5xl */}
            <div className="relative justify-center flex">
                <img
                    src={selectedImage}
                    alt="Car"
                    className="w-40 md:w-80 object-cover rounded-lg "
                />
            </div>

            <Slider {...settings} className="mt-4">
                {images.map((img, index) => (
                    <div key={index} className="px-2">
                        <img
                            src={img}
                            alt={`Thumbnail ${index}`}
                            className={`w-32 h-20 object-cover cursor-pointer rounded-lg md:w-auto ${
                                selectedImage === img ? "border-2 border-blue-500" : ""
                            }`}
                            onClick={() => setSelectedImage(img)}
                        />
                    </div>
                ))}
            </Slider>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 mt-4 mx-8 gap-8">
            <div>
                <div>
                    <h1 className="text-black text-2xl font-bold mb-4">Description</h1>
                    {cars ? (
                        <div>
                            <p className="text-lg text-black">
                                {cars.carDescription ? isExpanded ? cars.carDescription : `${cars.carDescription.substring(0, 300)}...` : "Không có mô tả"}
                            </p>
                            <button 
                                className="text-blue-500 hover:underline cursor-pointer" 
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                {isExpanded ? "Show Less" : "Show More"}
                            </button>
                        </div>
                    ) : (
                        <p className="text-lg text-red-500">Không tìm thấy thông tin xe.</p>
                    )}
                </div>

                <div>
                    <h1 className="text-black text-2xl font-bold my-8">Dealer Info</h1>
                    <div className="flex justify-around bg-gray-800 p-4 shadow-md mt-4 w-auto gap-4 space-x-4">
                        <div className="flex items-center gap-4 w-auto">
                            <img src={ava} class="w-16 h-16 rounded-full border-1 border-gray-800 shadow-lg"/>
                            <div>
                                <h3 className="text-white font-semibold">Mui Dao</h3>
                                <p className="text-white text-center text-sm">Service</p>
                            </div>
                        </div>
                        <div className="md:flex  gap-2 text-white lg:flex flex-col  gap-2 text-white">
                            <div className="flex items-center gap-2 text-white">
                                <PhoneIcon className="w-6 h-6 text-blue-500" />
                                <span>+84 773 153 987</span>
                            </div>
                            <div className="flex items-center gap-2 text-white">
                                <EnvelopeIcon className="w-6 h-6 text-red-500" />
                                <span>muidao156@email.com</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className="text-black text-2xl font-bold my-8">Contact</h1>
                    <form className="flex flex-col w-full gap-4">
                        <label>Họ Tên</label>
                        <input className="bg-white-500 h-8 border rounded-lg"
                            type="text"
                            placeholder="Họ Tên"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label>Số Điện Thoại</label>
                        <input className="bg-white-500 h-8 border rounded-lg"
                            type="tel"
                            placeholder="+84 xxx.xxx.xxx"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <label>Chúng tôi có thể giúp gì cho bạn</label>
                        <textarea 
                            className="bg-white-500 h-20 border rounded-lg p-1 align-top"
                            placeholder="Nhập câu hỏi tại đây chúng tôi sẽ giải đáp thắc mắc của bạn."
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                        />
                        <button type="submit" className="bg-red-600 border rounded-lg h-10 text-white font-bold">Gửi</button>
                    </form>
                </div>
                <div>
                    <h1 className="text-black text-2xl font-bold my-8">Địa Chỉ</h1>
                    <MapContainer center={center} zoom={13} className="w-auto">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={center}>
                            <Popup>Đây là Hồ Chí Minh.</Popup>
                        </Marker>
                    </MapContainer>
                </div>
                <div>
                    <h1 className="text-black text-2xl font-bold my-8">Dự Đoán Trả Góp</h1>
                </div>
            </div>
            <div>
                <p>bderther</p>
            </div>
        </div>
    </div>
  );
};

export default CarDetails;
