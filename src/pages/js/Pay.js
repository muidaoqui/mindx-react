import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
//import "./Roboto-normal.js";
import logo from '../../img/logo.png';

function Pay() {
    const [selectedItems, setSelectedItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem("pay")) || [];

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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const user = JSON.parse(localStorage.getItem("users"));
    const payList = JSON.parse(localStorage.getItem("pay")) || [];

    const generateInvoice = (cartItems, userEmail, customerName, customerPhone, customerAddress, paymentMethod) => {
        const doc = new jsPDF();
        
        //doc.addFont("Roboto-Regular-normal.ttf", "Roboto", "normal");
        //doc.addFont("Roboto-Bold-normal.ttf", "Roboto", "bold");
        //doc.setFont("Roboto"); 
    
        const currentDate = new Date().toLocaleDateString("vi-VN");
        const img = new Image();
        img.src = logo;
    
        img.onload = () => {
            doc.addImage(img, "PNG", 10, 10, 30, 30);
            doc.setFontSize(18);
            doc.text("HÓA ĐƠN THANH TOÁN", 70, 50);
    
            doc.setFontSize(12);
            doc.text("MD Auto", 10, 70);
            doc.text("Địa chỉ: 39 HTLO, Quận 5, TP.HCM", 10, 78);
            doc.text("Số điện thoại: 0773.153.xxx", 10, 86);
    
            doc.text(`Khách hàng: ${customerName}`, 10, 94);
            doc.text(`Số điện thoại: ${customerPhone}`, 10, 102);
            doc.text(`Địa chỉ: ${customerAddress}`, 10, 110);
            doc.text(`Email: ${userEmail}`, 10, 118);
    
            doc.text(`Ngày lập hóa đơn: ${currentDate}`, 150, 94);
    
            // Bảng sản phẩm
            const tableColumn = ["Tên xe", "Số lượng", "Đơn giá", "Thành tiền"];
            const tableRows = cartItems.map(item => [
                item.carname,
                item.quantity,
                `${item.carprice.toLocaleString("vi-VN")} đ`,
                `${item.totalPrice.toLocaleString("vi-VN")} đ`
            ]);
    
            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 130,
                styles: { font: "Roboto" }, // Đảm bảo font hỗ trợ tiếng Việt
                headStyles: { fontStyle: "bold" }
            });
    
            const finalY = doc.lastAutoTable.finalY + 10;
            doc.text(`TỔNG TIỀN: ${total.toLocaleString("vi-VN")} đ`, 150, finalY, { align: "right" });
    
            doc.text("BÊN MUA", 30, finalY + 30);
            doc.text("BÊN BÁN", 150, finalY + 30);
            doc.text("(Chữ ký khách hàng)", 30, finalY + 50);
            doc.text("(Chữ ký đại diện công ty)", 150, finalY + 50);
    
            doc.save(`HoaDon_${currentDate}.pdf`);
        };
    };
    
    

    return (
        <div className="m-4">
            <div className="sticky top-0 z-10 flex justify-between items-center w-full h-20 bg-white shadow-md px-4 my-4">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="Logo" className="w-20 border-1 rounded-3xl" />
                    <h1 className="text-xl font-bold text-cyan-400">Thanh Toán</h1>
                </div>
            </div>

            <div className="text-xl text-black rounded shadow-xl p-4 bg-gray-100">
                <div className="flex justify-around text-center gap-4">
                    <div>
                        <h2 className="font-bold">MD Auto</h2>
                        <p>Địa chỉ: 39 HTLO, Quận 5, TP.HCM</p>
                        <p>Số điện thoại: 0773.153.xxx</p>
                    </div>
                    <div>
                        <h2 className="font-bold">HÓA ĐƠN BÁN XE</h2>
                        <p>Thời điểm xuất hóa đơn {currentTime.toLocaleString("vi-VN")}</p>
                    </div>
                </div>

                <div className="my-10 flex flex-col justify-around text-left space-y-4">
                    <div className="flex justify-between gap-2">
                        <label className="font-bold">Tên khách hàng:</label>
                        <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="border rounded px-2 py-1 w-5/6" placeholder="Nhập tên khách hàng" />
                    </div>
                    <div className="flex justify-between gap-2">
                        <label className="font-bold">Số điện thoại:</label>
                        <input type="text" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="border rounded px-2 py-1 w-5/6" placeholder="Nhập số điện thoại" />
                    </div>
                    <div className="flex justify-between gap-2">
                        <label className="font-bold">Địa chỉ:</label>
                        <input type="text" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} className="border rounded px-2 py-1 w-5/6" placeholder="Nhập địa chỉ" />
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

            <div className="p-4">
                <h1 className="text-2xl my-4">Phương thức thanh toán</h1>

                <div className="flex gap-4 mt-4">
                    {[
                        { value: "cod", label: "💵 Thanh toán khi nhận xe" },
                        { value: "card", label: "💳 Thanh toán bằng thẻ" },
                        { value: "installment", label: "🏦 Trả góp qua ngân hàng" }
                    ].map(method => (
                        <button
                            key={method.value}
                            onClick={() => setPaymentMethod(method.value)}
                            className={`px-4 py-2 rounded-lg font-medium hover:bg-red-700 ${
                                paymentMethod === method.value
                                    ? "bg-red-600 text-white"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            {method.label}
                        </button>
                    ))}
                </div>

                <div className="mt-4">
                    <p className="italic text-gray-600">
                        Hình thức đã chọn: <span className="font-semibold">{paymentMethod}</span>
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => generateInvoice(payList, user?.email || "Không xác định", customerName, customerPhone, customerAddress, paymentMethod)}
                    className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 mt-6"
                >
                    ✅ Thanh toán
                </button>
            </div>
        </div>
    );
}

export default Pay;
