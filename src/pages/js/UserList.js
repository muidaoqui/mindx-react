import React, { useState, useEffect, useRef } from "react";
import Poster from "../../img/poster.png"

function UserList() {
    const [users, setUsers] = useState([]);
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confPass, setConfPass] = useState('');
    const [editingIndex, setEditingIndex] = useState(null); 
    const [message, setMessage] = useState('');
    const [msgColor, setMsgColor] = useState('red');

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers(storedUsers);
    }, []);

    const handleEdit = (index) => {
        const user = users[index];
        setFullname(user.fullname);
        setEmail(user.email);
        setPass(user.pass);
        setConfPass(user.pass);
        setEditingIndex(index);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!fullname || !email || !pass || !confPass) {
            setMessage("Vui lòng điền đầy đủ thông tin.");
            setMsgColor('red');
            return;
        }
    
        if (pass !== confPass) {
            setMessage("Mật khẩu không khớp.");
            setMsgColor('red');
            return;
        }
    
        let usersList = [...users];
    
        if (editingIndex !== null) {
            usersList[editingIndex] = { fullname, email, pass };
            setMessage("Cập nhật thành công!");
        } else {
            if (usersList.some(user => user.email === email)) {
                setMessage("Email đã tồn tại.");
                setMsgColor('red');
                return;
            }
            usersList.push({ fullname, email, pass });
            setMessage("Thêm người dùng thành công!");
        }

        setMsgColor('green');
        setUsers(usersList);
        localStorage.setItem("users", JSON.stringify(usersList));
        resetForm();
    };

    const handleDelete = (index) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa người dùng này?");
        if (!confirmDelete) return;

        const updatedUsers = users.filter((_, i) => i !== index);
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        if (editingIndex === index) resetForm();
    };

    const resetForm = () => {
        setFullname('');
        setEmail('');
        setPass('');
        setConfPass('');
        setEditingIndex(null);
    };

    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const filteredUsers = users.filter(user => 
        user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const fileInputRef = useRef(null);
    const handleImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        const fileExtension = file.name.split(".").pop().toLowerCase();

        reader.onload = (event) => {
            const content = event.target.result;

            try {
                if (fileExtension === "json") {
                    const newData = JSON.parse(content);
                    if (!Array.isArray(newData)) {
                        console.error("Dữ liệu JSON không hợp lệ");
                        return;
                    }
                    const nonDuplicate = newData.filter(user => !users.some(u => u.email === user.email));
                    const updatedUsers = [...users, ...nonDuplicate];
                    setUsers(updatedUsers);
                    localStorage.setItem("users", JSON.stringify(updatedUsers));
                    setMessage("Đã nhập dữ liệu JSON thành công");
                    setMsgColor("green");

                } else if (fileExtension === "csv") {
                    const lines = content.split("\n").filter(line => line.trim() !== "");
                    const headers = lines[0].split(",").map(h => h.trim());
                    const validData = [];

                    for (let i = 1; i < lines.length; i++) {
                        const values = lines[i].split(",").map(v => v.trim());
                        if (values.length === headers.length) {
                            const user = {};
                            headers.forEach((header, index) => {
                                user[header] = values[index];
                            });
                            if (user.fullname && user.email && user.pass && !users.some(u => u.email === user.email)) {
                                validData.push(user);
                            }
                        }
                    }

                    const updatedUsers = [...users, ...validData];
                    setUsers(updatedUsers);
                    localStorage.setItem("users", JSON.stringify(updatedUsers));
                    setMessage("Đã nhập dữ liệu CSV thành công");
                    setMsgColor("green");

                } else {
                    setMessage("Chỉ hỗ trợ file JSON và CSV");
                    setMsgColor("red");
                }
            } catch (error) {
                console.error("Lỗi khi đọc file:", error);
                setMessage("Lỗi khi đọc file");
                setMsgColor("red");
            }
        };

        reader.readAsText(file);
    };

    const handleExportCSV = () => {
        if (users.length === 0) {
            setMessage("Không có dữ liệu để xuất.");
            setMsgColor("red");
            return;
        }
    
        // Lấy danh sách các headers từ key của object đầu tiên
        const headers = Object.keys(users[0]).filter(key => key !== 'ratings'); // loại ratings nếu không cần
        const csvRows = [];
    
        // Tạo dòng header
        csvRows.push(headers.join(","));
    
        // Tạo dòng dữ liệu
        users.forEach(car => {
            const row = headers.map(header => {
                // Escape dấu phẩy và dấu xuống dòng
                let value = car[header] ?? "";
                if (typeof value === "string") {
                    value = `"${value.replace(/"/g, '""')}"`; // escape dấu "
                }
                return value;
            });
            csvRows.push(row.join(","));
        });
    
        const csvContent = csvRows.join("\n");
    
        // Tạo file và tự động tải về
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
    
        const link = document.createElement("a");
        link.href = url;
        link.download = "users_export.csv";
        link.click();
        URL.revokeObjectURL(url);
        
        setMessage("Xuất CSV thành công!");
        setMsgColor("green");
    };
    

    return (
        <div className="all">
            <div className="w-full h-full mb-10">
                <h2 className="text-center font-bold text-2xl my-10 text-cyan-500">Quản Lý Người Dùng</h2>
                <div className="relative flex mb-4 gap-4 justify-between mx-4">
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center gap-4">
                            {!showForm && (
                                <button 
                                    className="border-2 border-black rounded-xl h-10 px-4 bg-blue-500 text-white font-bold" 
                                    onClick={() => setShowForm(true)}
                                >
                                    Add User
                                </button>
                            )}
                        </div>

                        {showForm && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center bg-white p-6 rounded-xl shadow-lg z-50 w-96">
                                    <input className="border-2 border-black rounded-xl h-10 p-2 w-full" type="text" placeholder="Họ và tên" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                                    <input className="border-2 border-black rounded-xl h-10 p-2 w-full" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={editingIndex !== null} />
                                    <input className="border-2 border-black rounded-xl h-10 p-2 w-full" type="password" placeholder="Mật khẩu" value={pass} onChange={(e) => setPass(e.target.value)} />
                                    <input className="border-2 border-black rounded-xl h-10 p-2 w-full" type="password" placeholder="Xác nhận mật khẩu" value={confPass} onChange={(e) => setConfPass(e.target.value)} />

                                    <div className="flex gap-4">
                                        <button type="submit" className="border-2 border-black rounded-xl h-10 px-4 bg-green-500 font-bold">
                                            {editingIndex !== null ? "Cập nhật" : "Thêm"}
                                        </button>
                                        <button 
                                            type="button" 
                                            className="border-2 border-black rounded-xl h-10 px-4 bg-red-500 text-white font-bold"
                                            onClick={() => {resetForm(); setShowForm(false)}}
                                        >
                                            Hủy
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <div className="flex flex-col items-center gap-4">
                            <input
                                type="search"
                                placeholder="Tìm kiếm người dùng..."
                                className="border-2 border-gray-300 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div>
                            <input 
                                type="file" 
                                accept=".json, .csv" 
                                ref={fileInputRef} 
                                style={{ display: "none" }} 
                                onChange={handleImport} 
                            />
                            <button 
                                className="border-2 border-black rounded-xl h-10 px-4 bg-blue-500 text-white font-bold" 
                                onClick={() => fileInputRef.current.click()}
                            >
                                Import
                            </button>
                        </div>
                        <div>
                            <button 
                                className="border-2 border-black rounded-xl h-10 px-4 bg-blue-500 text-white font-bold" 
                                onClick={handleExportCSV}
                            >
                                Export
                            </button>
                        </div>
                    </div>
                </div>

                {message && <p style={{ color: msgColor }}>{message}</p>}

                <div className="w-full border-2 border-black my-8 max-h-80 overflow-y-auto">
                    <table className="w-full border-collapse">
                        <thead className="bg-red-500 border-2 border-black sticky top-0 z-10">
                            <tr>
                                <th className=" border-2 border-black">STT</th>
                                <th className="p-2 border-2 border-black">Họ và Tên</th>
                                <th className="p-2 border-2 border-black">Email</th>
                                <th className="p-2 border-2 border-black">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="text-center bg-white" onClick={() => setShowForm(true)}>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user, index) => (
                                    <tr className="border-2 border-black" key={index} onClick={() => handleEdit(index)}> 
                                        <td className="p-2 border-2 border-black">{index + 1}</td>
                                        <td className="p-2 border-2 border-black">{user.fullname}</td>
                                        <td className="p-2 border-2 border-black">{user.email}</td>
                                        <td className="p-2 border-2 border-black bg-red-500">
                                            <button className="w-full h-full" onClick={(e) => { e.stopPropagation(); handleDelete(index); }}>Xóa</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-2">Không có người dùng nào</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserList;
