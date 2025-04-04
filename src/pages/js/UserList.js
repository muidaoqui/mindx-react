import React, { useState, useEffect } from "react";
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
        } else if (usersList.find(user => user.email === email)) {
            setMessage("Email đã tồn tại.");
            setMsgColor('red');
            return;
        }
        usersList.push({ fullname, email, pass });
        setMessage("Thêm người dùng thành công!");
        setMsgColor('green');
        
        setUsers(usersList);
        localStorage.setItem("users", JSON.stringify(usersList));

        setFullname('');
        setEmail('');
        setPass('');
        setConfPass('');
        setEditingIndex(null);
    };

    const handleDelete = (index) => {
        const updatedUsers = users.filter((_, i) => i !== index);
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        if (editingIndex === index) {
            setFullname('');
            setEmail('');
            setPass('');
            setConfPass('');
            setEditingIndex(null);
        }
    };

    return (
        <div className="all">
            <div className="w-full h-full mb-10">
                <h2 className="text-center font-bold text-2xl my-10 text-cyan-500">Quản Lý Người Dùng</h2>

                <form onSubmit={handleSubmit} className="flex gap-10 justify-center items-center">
                    <input className="border-2 border-black rounded-xl h-10 p-2" type="text" placeholder="Họ và tên" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                    <input className="border-2 border-black rounded-xl h-10 p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={editingIndex !== null} />
                    <input className="border-2 border-black rounded-xl h-10 p-2" type="password" placeholder="Mật khẩu" value={pass} onChange={(e) => setPass(e.target.value)} />
                    <input className="border-2 border-black rounded-xl h-10 p-2" type="password" placeholder="Xác nhận mật khẩu" value={confPass} onChange={(e) => setConfPass(e.target.value)} />
                    <button type="submit" className="border-2 border-black rounded-xl h-10 py-2 w-20 bg-green-500 font-bold">{editingIndex !== null ? "Cập nhật" : "Thêm" }</button>
                    {editingIndex !== null && <button type="button" className="border-2 border-black rounded-xl h-10 py-2 w-20" onClick={() => setEditingIndex(null)}>Hủy</button>}
                </form>
                {message && <p style={{ color: msgColor }}>{message}</p>}

                <table className="w-full border-2 border-black my-8 h-40 overflow-y-scroll">
                    <thead className="bg-red-500 border-2 border-black">
                        <tr >
                            <th>Họ và Tên</th>
                            <th>Email</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="text-center my-4 ">
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr className="border-2 border-black" key={index} onClick={() => handleEdit(index)}> 
                                    <td className="border-2 border-black">{user.fullname}</td>
                                    <td className="border-2 border-black">{user.email}</td>
                                    <td className="border-2 border-black bg-red-500">
                                        <button className="w-full h-full " onClick={(e) => { e.stopPropagation(); handleDelete(index); }}>Xóa</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">Không có người dùng nào</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
        
}

export default UserList;
