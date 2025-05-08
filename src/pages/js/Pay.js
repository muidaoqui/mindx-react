import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from '../../img/logo.png';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Pay() {
    const [selectedItems, setSelectedItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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

    const generateInvoice = (cartItems, userEmail, customerName, customerPhone, customerAddress, paymentMethod, total) => {
        const doc = new jsPDF();
        const currentDate = new Date().toLocaleDateString("vi-VN");
        const img = new Image();
        img.src = logo;

        img.onload = () => {
            doc.addImage(img, "PNG", 10, 10, 30, 30);
            doc.setFontSize(22);
            doc.setFont("helvetica", "bold");
            doc.text("INVOICE", 105, 20, { align: "center" });

            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            doc.text("MD Auto", 10, 50);
            doc.text("Address: 39 HTLO, Quan 5, TP.HCM", 10, 58);
            doc.text("Phone: 0773.153.xxx", 10, 66);

            doc.text(`Customer name: ${customerName}`, 120, 50);
            doc.text(`Phone: ${customerPhone}`, 120, 58);
            doc.text(`Address: ${customerAddress}`, 120, 66);
            doc.text(`Email: ${userEmail}`, 120, 74);
            doc.text(`Invoice date: ${currentDate}`, 120, 82);

            const tableStartY = 100;

            const tableColumn = ["Car name", "Quantity", "Unit price", "Total amount"];
            const tableRows = cartItems.map(item => [
                item.carname,
                item.quantity,
                `${item.carprice.toLocaleString("vi-VN")} đ`,
                `${item.totalPrice.toLocaleString("vi-VN")} đ`
            ]);

            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: tableStartY,
                styles: {
                    font: "helvetica",
                    fontSize: 11,
                    valign: 'middle',
                    halign: 'center'
                },
                headStyles: {
                    fillColor: [230, 230, 230],
                    textColor: 0,
                    fontStyle: 'bold',
                },
                bodyStyles: {
                    textColor: 50,
                },
                theme: 'grid',
                margin: { left: 10, right: 10 },
            });

            const finalY = doc.lastAutoTable.finalY + 10;

            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.text(`TOTAL: ${total.toLocaleString("vi-VN")} đ`, 170, finalY, { align: "right" });

            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);

            doc.text("Buyer", 60, finalY + 30);
            doc.text("(Customer signature)", 55, finalY + 40);

            doc.text("Seller", 140, finalY + 30);
            doc.text("(Specimen signature)", 135, finalY + 40);

            doc.save(`HoaDon_${currentDate}.pdf`);
        };
    };

    const handlePayment = () => {
        if (loading) return;

        if (!customerName || !customerPhone || !customerAddress) {
            toast.error("Vui lòng điền đầy đủ thông tin khách hàng!", { position: "top-center" });
            return;
        }

        setLoading(true);
        const loggedInEmail = localStorage.getItem("loggedInUser") || "Không xác định";

        if (!loggedInEmail || loggedInEmail === "Không xác định") {
            toast.error("Không tìm thấy tài khoản người dùng!", { position: "top-center" });
            setLoading(false);
            return;
        }

        generateInvoice(
            selectedItems,
            loggedInEmail,
            customerName,
            customerPhone,
            customerAddress,
            paymentMethod,
            total
        );

        localStorage.removeItem("pay");

        toast.success("Thanh toán thành công! Bạn sẽ được chuyển hướng...", {
            position: "top-center",
            autoClose: 2000,
        });

        setTimeout(() => navigate("/home"), 2500);
    };

    return (
        <div className="m-4 max-w-6xl mx-auto px-2">
            <div className="sticky top-0 z-10 flex justify-between items-center w-full h-20 bg-white shadow-md px-4 my-4">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="Logo" className="w-20 border-1 rounded-3xl" />
                    <h1 className="text-xl font-bold text-cyan-400">Thanh Toán</h1>
                </div>
            </div>

            <div className="text-xl text-black rounded shadow-xl p-4 bg-gray-100">
                <div className="flex flex-col sm:flex-row justify-around text-center gap-4">
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
                    {[["Tên khách hàng", customerName, setCustomerName], ["Số điện thoại", customerPhone, setCustomerPhone], ["Địa chỉ", customerAddress, setCustomerAddress]].map(([label, value, setter], idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <label className="font-bold whitespace-nowrap">{label}:</label>
                            <input type="text" value={value} onChange={(e) => setter(e.target.value)} className="border rounded px-2 py-1 w-full sm:w-5/6" placeholder={`Nhập ${label.toLowerCase()}`} />
                        </div>
                    ))}
                </div>

                <div className="overflow-x-auto mt-4">
                    {selectedItems.length === 0 ? (
                        <p className="text-center text-gray-500 italic">Không có sản phẩm nào để thanh toán.</p>
                    ) : (
                        <table className="min-w-[600px] w-full border-collapse border border-gray-300 text-right">
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
                    )}
                </div>
                <p className="text-right my-4">Tổng cộng: {total.toLocaleString()} VND</p>
            </div>

            <div className="p-4">
                <h1 className="text-2xl my-4">Phương thức thanh toán</h1>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    {[{ value: "cod", label: "💵 Thanh toán khi nhận xe" }, { value: "card", label: "💳 Thanh toán bằng thẻ" }, { value: "installment", label: "🏦 Trả góp qua ngân hàng" }].map(method => (
                        <button
                            key={method.value}
                            onClick={() => setPaymentMethod(method.value)}
                            className={`px-4 py-2 rounded-lg font-medium hover:bg-red-700 ${paymentMethod === method.value ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"}`}
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
                    onClick={handlePayment}
                    disabled={loading}
                    className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 mt-6 disabled:opacity-50"
                >
                    {loading ? "Đang xử lý..." : "✅ Thanh toán"}
                </button>
            </div>

            <ToastContainer />
        </div>
    );
}

export default Pay;
