import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../img/logo.png';

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [message, setMessage] = useState('');
    const [msgColor, setMsgColor] = useState('red');
    const navigate = useNavigate(); // Dùng để chuyển trang sau khi đăng nhập

    const handleSubmit = (e) => {
        e.preventDefault();

        let users = JSON.parse(localStorage.getItem('users')) || []; // Đọc danh sách users từ localStorage

        if (!email || !pass) {
            setMessage('Vui lòng điền đầy đủ thông tin.');
            setMsgColor('red');
            return;
        }

        // Tìm user có email & pass trùng khớp
        let foundUser = users.find(user => user.email === email && user.pass === pass);

        if (foundUser) {
            setMessage('Đăng nhập thành công!');
            setMsgColor('green');
            localStorage.setItem('islogin', true); // Lưu trạng thái đăng nhập

            setTimeout(() => {
                navigate('/home'); // Chuyển hướng về trang chủ sau 1s
            }, 1000);
        } else {
            setMessage('Email hoặc mật khẩu không đúng.');
            setMsgColor('red');
        }
    };

    return (
        <div className="w-full flex justify-center  h-screen">
            <div className="flex my-auto w-full max-w-2xl overflow-hidden rounded-xl shadow-lg h-1/2">
                <div className="bg-red-600 w-full h-full flex flex-col align-center justify-center rounded-l-xl  gap-6">
                    <h1 className="font-mono text-3xl font-bold text-center  text-cyan-300">Đăng Nhập</h1>
                    <img src={logo} className="w-20 mx-auto rounded-xl"/>
                    <h3>MD AUTOHUNT</h3>
                    <h5>Nơi giấc mơ bốn bánh khởi đầu!</h5>
                </div>

                <div  className=" flex flex-col w-full h-full align-center justify-center border border-gray-300 rounded-r-xl">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mx-6 ">
                        <label>Email</label>
                        <input className="bg-white-500 h-10"
                            type="email"
                            placeholder="Nhập email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label>Mật khẩu</label>
                        <input className="bg-white-500 h-10"
                            type="password"
                            placeholder="Nhập mật khẩu"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                        />

                        <button type="submit" className="bg-red-600 border rounded-lg h-10 text-white font-bold">Đăng Nhập</button>
                        <p style={{ color: msgColor }}>{message}</p>

                        <p>Chưa có tài khoản? <Link to="/register" className="text-cyan-300">Đăng ký</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
