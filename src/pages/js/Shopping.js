import React, { useState, useEffect } from "react";
import logo from '../../img/logo.png';
import { useNavigate } from "react-router-dom";

function Shopping() {
    const [cart, setCart] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const navigate = useNavigate();

    const currentUserEmail = localStorage.getItem("loggedInUser");

    useEffect(() => {
        if (!currentUserEmail) return;
        const storedCart = JSON.parse(localStorage.getItem(`cart-${currentUserEmail}`)) || [];
        setCart(storedCart);
    }, [currentUserEmail]);

    const updateCartStorage = (updatedCart) => {
        if (!currentUserEmail) return;
        localStorage.setItem(`cart-${currentUserEmail}`, JSON.stringify(updatedCart));
    };

    const parsePriceDotFormat = (priceString) => {
        if (typeof priceString === "string") {
            return Number(priceString.replace(/\./g, "").replace(/,/g, ""));
        }
        return Number(priceString);
    };

    const updateQuantity = (id, delta) => {
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCart(updatedCart);
        updateCartStorage(updatedCart);
    };

    const handleDeleteItem = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        updateCartStorage(updatedCart);
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cart.map(item => item.id));
        }
        setSelectAll(!selectAll);
    };

    const handleSelectItem = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
            setSelectAll(false);
        } else {
            const newSelected = [...selectedItems, id];
            setSelectedItems(newSelected);
            if (newSelected.length === cart.length) {
                setSelectAll(true);
            }
        }
    };

    const totalSelectedPrice = cart.reduce((acc, item) => {
        if (selectedItems.includes(item.id)) {
            return acc + item.quantity * parsePriceDotFormat(item.carprice);
        }
        return acc;
    }, 0);

    const handlePay = () => {
        if (selectedItems.length === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
            return;
        }

        const selectedCars = cart.filter(item => selectedItems.includes(item.id));
        localStorage.setItem("pay", JSON.stringify(selectedCars));
        navigate("/pay");
    };

    return (
        <div className="mb-10 mx-2 sm:mx-4">
            <div className="sticky top-0 z-10 flex flex-col sm:flex-row justify-between items-center w-full h-auto bg-white shadow-md px-4 py-3 mb-4 gap-2">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="Logo" className="w-16 sm:w-20 border-1 rounded-3xl" />
                    <h1 className="text-lg sm:text-xl font-bold text-cyan-400">Giỏ Hàng</h1>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                    <h2 className="text-base sm:text-xl font-bold text-cyan-400 text-center">
                        Tổng cộng: {totalSelectedPrice.toLocaleString()} VND
                    </h2>
                    <button
                        onClick={handlePay}
                        className={`bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700 ${selectedItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={selectedItems.length === 0}
                    >
                        Thanh Toán
                    </button>
                </div>
            </div>

            <div className="bg-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-2 rounded">
                <div>
                    <input
                        type="checkbox"
                        className="w-4 h-4 m-2"
                        checked={selectAll}
                        onChange={handleSelectAll}
                    />
                    <span className="text-sm sm:text-lg text-black">Chọn tất cả</span>
                </div>
                <div className="hidden sm:flex justify-around items-center w-1/2 h-8">
                    <h2 className="w-1/4 text-center">Đơn Giá</h2>
                    <h2 className="w-1/4 text-center">Số Lượng</h2>
                    <h2 className="w-1/4 text-center">Thành Tiền</h2>
                    <h2 className="w-1/4 text-center">Thao Tác</h2>
                </div>
            </div>

            <ul>
                {cart.map((cars, index) => (
                    <li key={index} className="flex flex-col sm:flex-row items-center bg-gray-100 justify-between px-4 py-4 my-2 rounded">
                        <div className="flex flex-col sm:flex-row items-center w-full sm:w-1/2 gap-4 mb-2 sm:mb-0">
                            <div className="flex items-center gap-4">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4"
                                    checked={selectedItems.includes(cars.id)}
                                    onChange={() => handleSelectItem(cars.id)}
                                />
                                <img src={cars.carImage} alt={cars.carname} className="w-32 sm:w-40 border rounded-2xl" />
                            </div>
                            <div>
                                <h3 className="text-base sm:text-xl font-bold">{cars.carname}</h3>
                                <p className="text-sm sm:text-base">{cars.carDescription}</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-around items-center w-full sm:w-1/2 text-center gap-2 sm:gap-0">
                            <h2 className="w-full sm:w-1/4">{parsePriceDotFormat(cars.carprice).toLocaleString()} VND</h2>
                            <div className="flex items-center justify-center w-full sm:w-1/4 space-x-2">
                                <button onClick={() => updateQuantity(cars.id, -1)} className="bg-gray-300 px-2 rounded hover:bg-gray-400">-</button>
                                <span>{cars.quantity}</span>
                                <button onClick={() => updateQuantity(cars.id, 1)} className="bg-gray-300 px-2 rounded hover:bg-gray-400">+</button>
                            </div>
                            <h2 className="w-full sm:w-1/4">{(cars.quantity * parsePriceDotFormat(cars.carprice)).toLocaleString()} VND</h2>
                            <button
                                onClick={() => handleDeleteItem(cars.id)}
                                className="bg-red-600 text-white rounded-lg px-3 py-1 hover:bg-red-700 w-full sm:w-1/4"
                            >
                                Xóa
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Shopping;
