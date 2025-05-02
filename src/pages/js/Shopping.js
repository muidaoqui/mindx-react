import React, { useState, useEffect } from "react";
import logo from '../../img/logo.png';
import { useNavigate } from "react-router-dom"; 

function Shopping() {
    const [cart, setCart] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const navigate = useNavigate(); 

    const currentUserEmail = localStorage.getItem("loggedInUser");

    // Đọc giỏ hàng riêng cho từng user
    useEffect(() => {
        if (!currentUserEmail) return;
        const storedCart = JSON.parse(localStorage.getItem(`cart-${currentUserEmail}`)) || [];
        setCart(storedCart);
    }, [currentUserEmail]);

    // Ghi giỏ hàng vào localStorage riêng
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
        <div className="mb-10 m-4">
            <div className="sticky top-0 z-10 flex justify-between items-center w-full h-20 bg-white shadow-md px-4 my-4">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="Logo" className="w-20 border-1 rounded-3xl" />
                    <h1 className="text-xl font-bold text-cyan-400">Giỏ Hàng</h1>
                </div>
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold text-cyan-400">Tổng cộng: {totalSelectedPrice.toLocaleString()} VND</h2>
                    <button
                        onClick={handlePay}
                        className={`bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700 ${selectedItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={selectedItems.length === 0}
                    >
                        Thanh Toán
                    </button>
                </div>
            </div>
            <div className="relative flex items-center bg-gray-100 justify-between px-4 py-2">
                <div>
                    <input
                        type="checkbox"
                        className="w-4 h-4 m-2"
                        checked={selectAll}
                        onChange={handleSelectAll}
                    />
                    <span className="text-lg text-black">Chọn tất cả</span>
                </div>
                <div className="flex justify-around items-center w-1/2 h-8">
                    <h2>Đơn Giá</h2>
                    <h2>Số Lượng</h2>
                    <h2>Thành Tiền</h2>
                    <h2>Thao Tác</h2>
                </div>
            </div>
            <ul>
                {cart.map((cars, index) => (
                    <li key={index} className="flex items-center bg-gray-100 justify-between px-4 py-4 my-2 rounded">
                        <div className="flex items-center w-1/2 gap-4">
                            <input
                                type="checkbox"
                                className="w-4 h-4"
                                checked={selectedItems.includes(cars.id)}
                                onChange={() => handleSelectItem(cars.id)}
                            />
                            <img src={cars.carImage} alt={cars.carname} className="w-40 border rounded-2xl" />
                            <div>
                                <h3 className="text-xl font-bold">{cars.carname}</h3>
                                <h4>{cars.carDescription}</h4>
                            </div>
                        </div>
                        <div className="flex justify-around items-center w-1/2 text-center">
                            <h2>{parsePriceDotFormat(cars.carprice).toLocaleString()} VND</h2>
                            <div className="flex items-center space-x-2">
                                <button onClick={() => updateQuantity(cars.id, -1)} className="bg-gray-300 px-2 rounded hover:bg-gray-400">-</button>
                                <span>{cars.quantity}</span>
                                <button onClick={() => updateQuantity(cars.id, 1)} className="bg-gray-300 px-2 rounded hover:bg-gray-400">+</button>
                            </div>
                            <h2>{(cars.quantity * parsePriceDotFormat(cars.carprice)).toLocaleString()} VND</h2>
                            <button onClick={() => handleDeleteItem(cars.id)} className="bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700">Xóa</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Shopping;
