import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import logo from '../../img/logo.png';

function Register() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confPass, setConfPass] = useState('');
    const [message, setMessage] = useState('');
    const [msgColor, setMsgColor] = useState('red');
    const navigate = useNavigate(); 

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

        let users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.find(user => user.email === email)) {
            setMessage("Email đã tồn tại.");
            setMsgColor('red');
            return;
        }

        users.push({ fullname, email, pass }); // Lưu thông tin người dùng
        localStorage.setItem("users", JSON.stringify(users));

        setMessage("Đăng ký thành công!");
        setMsgColor('green');

        // Reset form sau khi đăng ký thành công
        setFullname('');
        setEmail('');
        setPass('');
        setConfPass('');

        // Chuyển hướng sang trang đăng nhập sau 1.5 giây
        setTimeout(() => {
            navigate('/login');
        }, 1500);
    };

    return (
        <div className=" w-full flex justify-center  h-screen">
            <div className="flex my-auto w-full max-w-2xl overflow-hidden rounded-xl shadow-lg h-2/3">
                <div className="flex flex-col w-full h-full align-center justify-center border border-gray-300 rounded-l-xl">
                    
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-6">
                        <h2 className="font-mono text-3xl font-bold text-center mt-6 text-red-500">Đăng ký</h2>
                        <label>Họ và tên</label>
                        <input className="bg-white-500 h-8 border rounded-lg" 
                            type="text" 
                            placeholder="Nhập họ và tên"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />

                        <label>Email</label>
                        <input className="bg-white-500 h-8 border rounded-lg" 
                            type="email" 
                            placeholder="Nhập email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label>Mật khẩu</label>
                        <input className="bg-white-500 h-8 border rounded-lg" 
                            type="password" 
                            placeholder="Nhập mật khẩu"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                        />

                        <label>Nhập lại mật khẩu</label>
                        <input className="bg-white-500 h-8 border rounded-lg" 
                            type="password" 
                            placeholder="Nhập lại mật khẩu"
                            value={confPass}
                            onChange={(e) => setConfPass(e.target.value)}
                        />

                        <button type="submit" className="bg-red-600 border rounded-lg h-10 text-white font-bold">Đăng ký</button>
                        <p style={{ color: msgColor }}>{message}</p>
                        <p>Bạn đã có tài khoản? <Link to="/login" className="text-cyan-300">Đăng nhập</Link></p>
                    </form>
                </div>

                <div className="bg-red-600 w-full h-full flex flex-col align-center justify-center rounded-r-xl  gap-6">
                    <img src={logo} className="w-20 mx-auto rounded-xl" alt="Logo" />
                    <h3 className="text-xl text-center">AUTOHUNT</h3>
                    <h5 className="text-center">Nơi giấc mơ bốn bánh khởi đầu!</h5>
                </div>
            </div>
        </div>
    );
}

export default Register;
