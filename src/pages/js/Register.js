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

        users.push({ fullname, email, pass });
        localStorage.setItem("users", JSON.stringify(users));

        setMessage("Đăng ký thành công!");
        setMsgColor('green');

        setFullname('');
        setEmail('');
        setPass('');
        setConfPass('');

        setTimeout(() => {
            navigate('/login');
        }, 1500);
    };

    return (
        <div className="w-full flex justify-center items-center min-h-screen bg-gray-50 px-4">
            <div className="flex flex-col md:flex-row w-full max-w-2xl overflow-hidden rounded-xl shadow-lg bg-white">
                
                <div className="flex flex-col justify-center w-full p-6 md:p-10">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <h2 className="text-3xl font-bold text-center text-red-600">Đăng ký</h2>

                        <div>
                            <label className="block mb-1">Họ và tên</label>
                            <input
                                type="text"
                                className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Nhập họ và tên"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Nhập email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block mb-1">Mật khẩu</label>
                            <input
                                type="password"
                                className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Nhập mật khẩu"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block mb-1">Nhập lại mật khẩu</label>
                            <input
                                type="password"
                                className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Nhập lại mật khẩu"
                                value={confPass}
                                onChange={(e) => setConfPass(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="bg-red-600 hover:bg-red-700 text-white h-10 rounded-lg font-semibold">
                            Đăng ký
                        </button>

                        {message && (
                            <p className={`text-sm text-${msgColor}-600 text-center`}>{message}</p>
                        )}

                        <p className="text-center text-sm">
                            Bạn đã có tài khoản? <Link to="/login" className="text-cyan-600 hover:underline">Đăng nhập</Link>
                        </p>
                    </form>
                </div>

                <div className="bg-red-600 flex flex-col justify-center items-center p-6 md:p-10 text-white md:rounded-r-xl">
                    <img src={logo} alt="Logo" className="w-20 rounded-xl mb-4" />
                    <h3 className="text-2xl font-bold">AUTOHUNT</h3>
                    <p className="text-center mt-2">Nơi giấc mơ bốn bánh khởi đầu!</p>
                </div>
            </div>
        </div>
    );
}

export default Register;
