import React, { useEffect, useState } from "react";
import logo from '../../img/logo.png';
function Pay() {
    const [selectedItems, setSelectedItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem("pay")) || [];

        // Làm sạch dữ liệu, xử lý giá có dấu và bỏ item nếu thiếu giá
        const cleanedItems = storedItems
            .filter(item => item.carprice !== undefined && item.quantity !== undefined)
            .map(item => {
                const cleanPrice = Number(item.carprice.toString().replace(/[.,]/g, '')) || 0;
                return {
                    ...item,
                    carprice: cleanPrice,
                    totalPrice: cleanPrice * item.quantity,
                };
            });

        setSelectedItems(cleanedItems);

        const computedTotal = cleanedItems.reduce((acc, item) => acc + item.totalPrice, 0);
        setTotal(computedTotal);
    }, []);

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); 
        return () => clearInterval(interval);
    }, []);

    return (
        <div className=" m-4">
            <div className="sticky top-0 z-10 flex justify-between items-center w-full h-20 bg-white shadow-md px-4 my-4">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="Logo" className="w-20 border-1 rounded-3xl" />
                    <h1 className="text-xl font-bold text-cyan-400">Thanh Toán</h1>
                </div>
            </div>
            <div className=" text-xl text-black rounded shadow-xl p-4 bg-gray-100">
                <div className="flex justify-around text-center gap-4">
                    <div>
                        <h2 className="font-bold">MD Auto</h2>
                        <p>Địa chỉ: 39 HTLO, Quận 5, TP.HCM</p>
                        <p>Số điện thoại: 0773.153.xxx</p>
                    </div>
                    <div>
                        <h2 className="font-bold">HÓA ĐƠN BÁN XE</h2>
                        <p>Thời gian mua xe {currentTime.toLocaleString("vi-VN")}</p>
                    </div>
                </div>
                <div className="my-10 flex flex-col justify-around text-left">
                    <div className="flex justify-between gap-2">
                        <label className="font-bold">Tên khách hàng:</label>
                        <input type="text" className="border rounded px-2 py-1 w-5/6" placeholder="Nhập tên khách hàng" />
                    </div>
                    <div className="flex justify-between gap-2">
                        <label className="font-bold">Số điện thoại:</label>
                        <input type="text" className="border rounded px-2 py-1 w-5/6" placeholder="Nhập số điện thoại" />
                    </div>
                    <div className="flex justify-between gap-2">
                        <label className="font-bold">Địa chỉ:</label>
                        <input type="text" className="border rounded px-2 py-1 w-5/6" placeholder="Nhập địa chỉ" />
                    </div>
                </div>
                <div>
                    <table className="w-full border-collapse border border-gray-300 mt-4 text-right">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">STT</th>
                                <th className="border border-gray-300 px-4 py-2">Tên xe</th>
                                <th className="border border-gray-300 px-4 py-2">Giá</th>
                                <th className="border border-gray-300 px-4 py-2">Số lượng</th>
                                <th className="border border-gray-300 px-4 py-2">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedItems.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.carname}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.carprice.toLocaleString()} VND</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.totalPrice.toLocaleString()} VND</td>
                                </tr>
                            ))}
                        </tbody>        
                    </table>
                </div>
                <p className="text-right my-4">Tổng cộng: {total.toLocaleString()} VND</p>
                
            </div>
            <h1 className="text-2xl mt-10">Phương thức thanh toán</h1>
            <div className="my-4 flex justify-around text-left">
                <div>
                    <input className="bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700 mt-4" type="radio" name="payment" value="cash"  />
                    <label className="ml-2">💵 Thanh toán khi nhận xe</label>
                </div>
                <div>
                    <input className="bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700 mt-4" type="radio" name="payment" value="visa"  />
                    <label className="ml-2">💳 Thanh toán bằng thẻ</label>
                </div>
            </div>
            <div>
                <form>
                    <h1 className="text-2xl">Thông tin thanh toán</h1>
                    <div className="flex flex-col gap-2 mt-4">
                        <label className="font-bold">Tên chủ thẻ:</label>
                        <input type="text" className="border rounded px-2 py-1" placeholder="Nhập tên chủ thẻ" />
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                        <label className="font-bold">Số thẻ:</label>
                        <input type="text" className="border rounded px-2 py-1" placeholder="Nhập số thẻ" />
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                        <label className="font-bold">Ngày hết hạn:</label>
                        <input type="text" className="border rounded px-2 py-1" placeholder="MM/YY" />
                    </div>
                    <button type="submit" className="bg-red-600 absolute right-10 text-white rounded-lg px-4 py-2 hover:bg-red-700 mt-4">
                        Xác nhận thanh toán
                    </button>
                </form>
            </div>
            <div className="my-10">
                <h1 className="text-2xl">Lưu ý:</h1>
                <ul className="list-disc list-inside mt-4">
                    <li>Nếu bạn chọn thanh toán khi nhận xe thì vui lòng cọc trước 20% giá trị hóa đơn.</li>
                    <li>Vui lòng kiểm tra kỹ thông tin trước khi thanh toán.</li>
                    <li>Chúng tôi sẽ liên hệ với bạn để xác nhận đơn hàng.</li>
                    <li>Cảm ơn bạn đã chọn MD Auto!</li>
                </ul>
            </div>
            <div>
                <form>
                    <div className="flex justify-between gap-2 mt-4">
                        <label className="font-bold">Tên chủ thẻ:</label>
                        <input type="text" className="border rounded px-2 py-1 w-5/6" placeholder="Nhập tên chủ thẻ" />
                    </div>
                    <div className="flex justify-between gap-2 mt-4">
                        <label className="font-bold">Số thẻ:</label>
                        <input type="text" className="border rounded px-2 py-1 w-5/6" placeholder="Nhập số thẻ" />
                    </div>
                    <div className="flex justify-between gap-2 mt-4">
                        <label className="font-bold">Ngày hết hạn:</label>
                        <input type="text" className="border rounded px-2 py-1 w-5/6" placeholder="MM/YY" />
                    </div>
                    <div className="flex justify-between gap-2 mt-4">
                        <label className="font-bold">CVV:</label>
                        <input type="text" className="border rounded px-2 py-1 w-5/6" placeholder="Nhập CVV" />
                    </div>
                    <button type="submit" className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 mt-4">
                        ✅ Thanh toán
                    </button>
                </form>
            </div>

        </div>
    );
}

export default Pay;
