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

    const [selectedImage, setSelectedImage] = useState(images.length > 0 ? images[0] : null);

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

    const [percent, setPercent] = useState(9); 
    const [months, setMonths] = useState(9); 

    const handleChange = (event) => {
        const selectedMonths = parseInt(event.target.value, 10);
        setMonths(selectedMonths); 
        setPercent(selectedMonths);
    };

    const [difference, setDifference] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [dividePrice, setDividePrice] = useState(0);

    useEffect(() => {
        if (cars?.carprice) {
            const carPriceNumber = parseFloat(cars.carprice); // Chuyển thành số
            if (!isNaN(carPriceNumber)) {
                const diff = (carPriceNumber * percent) / 100;
                const total = carPriceNumber + diff;
                setDifference(diff);
                setTotalPrice(total);
                setDividePrice(parseFloat(total / months * 1000).toFixed(3)); 
            }
        } else {
            setDifference(0);
            setTotalPrice(0);
            setDividePrice(0);
        }
    }, [percent, months, cars]);

    const handleAddToCart = (cars) => {
        const loggedInEmail = localStorage.getItem("loggedInUser");
        if (!loggedInEmail) {
            alert("Vui lòng đăng nhập trước khi thêm vào giỏ hàng!");
            return;
        }
    
        const cartKey = `cart-${loggedInEmail}`;
        const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    
        const price = Number(cars.carprice.toString().replace(/[.,]/g, '')); // Chuyển giá thành số
    
        const existingIndex = cart.findIndex((item) => item.id === cars.carid);
    
        if (existingIndex !== -1) {
            // Xe đã có, cập nhật quantity +1 và totalPrice
            cart[existingIndex].quantity += 1;
            cart[existingIndex].totalPrice = cart[existingIndex].quantity * price;
        } else {
            // Xe chưa có, thêm mới với quantity = 1
            cart.push({
                id: cars.carid,
                carname: cars.carname,
                carImage: cars.carImage,
                carDescription: cars.carDescription,
                carbrand: cars.carbrand,
                carprice: price,
                quantity: 1,
                totalPrice: price,
            });
        }
    
        localStorage.setItem(cartKey, JSON.stringify(cart));
        alert("Đã thêm vào giỏ hàng!");
    };
    
    
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
            <div className="grid grid-cols-1 md:grid md:grid-cols-2  mt-4 mx-8 gap-8">
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
                                <img src={ava} className="w-16 h-16 rounded-full border-1 border-gray-800 shadow-lg"/>
                                <div className="2xl:grid grid-cols-2">
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
                        <MapContainer center={center} zoom={13} style={{ height: "400px", width: "100%" }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={center}>
                                <Popup>Đây là Hồ Chí Minh.</Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                    
                </div>
                <div className="mx-2 xl:mx-20 bg-sky-950 py-10">
                    <div className="">
                        <label className="mx-4 text-center md:text-lg text-cyan-400 border-2 border-cyan-400 mx-40 py-4 grid justu=ify-center">{cars?.carprice ? `${cars.carprice} VND` : "Hiện chưa có giá niêm yết"}</label>
                    </div>
                    <div className="mx-16 text-cyan-400">
                        <h1 className="text-xl font-bold my-6">Chi tiết xe</h1>
                        <p className="flex justify-between">
                            Name <span>{cars?.carname ? `${cars.carname}` : ""}</span>
                        </p>
                        <p className="flex justify-between">
                            Model <span>{cars?.carmodel ? `${cars.carmodel}` : ""}</span>
                        </p>
                        <p className="flex justify-between">
                            Seats <span>{cars?.carseats ? `${cars.carseats}` : ""}</span>
                        </p>
                        <p className="flex justify-between">
                            Brand <span>{cars?.carbrand ? `${cars.carbrand}` : ""}</span>
                        </p>
                    </div>
                    <div className="w-full flex justify-center">
                        <button className="bg-red-600 border rounded-lg h-10 text-white font-bold w-1/2 my-8" onClick={() => handleAddToCart(cars)}>
                            Thêm Vao Giỏ Hàng
                        </button>
                    </div>
                </div>       
            </div>
            <div className="col-span-2 mb-10 p-4 text-white ">
                <h1 className="text-black text-2xl font-bold my-8">Dự Đoán Trả Góp</h1>
                    <div className="flex flex-col md:grid grid-cols-5 grid-rows-2  bg-sky-950 p-4 gap-6">
                        <div className="grid h-20">
                            <h2>Giá xe</h2>
                            <label className="bg-cyan-800 py-3 p-4 text-white">{cars?.carprice ? `${cars.carprice} VND` : "Hiện chưa có giá niêm yết"}</label>
                        </div>
                        <div className="grid h-20">
                            <h2>Trả trong thời gian</h2>
                            <select onChange={handleChange} className="border p-2 rounded bg-cyan-800">
                                <option value="9">9 tháng</option>
                                <option value="12">12 tháng</option>
                                <option value="18">18 tháng</option>
                                <option value="24">24 tháng</option>
                                <option value="36">36 tháng</option>
                            </select>
                        </div>
                        <div className="col-span-3 row-span-2 text-center justify-center p-10 grid gap-8">
                            <h2 className="text-2xl font-bold underline">Tổng tiền / Số tiền góp hằng tháng</h2>
                            <label className="bg-cyan-800 w-full font-bold text-red-500 p-4">
                                {totalPrice.toLocaleString()} tỷ VND / {dividePrice} triệu VND
                            </label>
                        </div>
                        <div className="grid h-20">
                            <h2>Phần trăm chênh lệch(%)</h2>
                            <label className="bg-cyan-800 py-3 p-4 text-white">{percent}%</label>
                        </div>
                        <div className="grid h-20">
                            <h2>Số tiền chênh lệch</h2>
                            <label className="bg-cyan-800 py-3 p-4 text-white">
                                {difference.toLocaleString()} tỷ VNĐ
                            </label>
                        </div>
                        
                    </div>
                </div>                 
        </div>
    );
};

export default CarDetails;
