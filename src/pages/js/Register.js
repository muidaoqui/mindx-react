import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Thêm useNavigate để chuyển trang
import '../css/Register.css';
import logo from '../../img/logo.png';

function Register() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confPass, setConfPass] = useState('');
    const [message, setMessage] = useState('');
    const [msgColor, setMsgColor] = useState('red');
    const navigate = useNavigate(); // Dùng để chuyển hướng sau khi đăng ký thành công

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
            navigate('/Login');
        }, 1500);
    };

    return (
        <div className="register">
            <div className="register-form">
                <div className="register-title">
                    <h2>Đăng ký</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Họ và tên</label>
                        <input 
                            type="text" 
                            placeholder="Nhập họ và tên"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />

                        <label>Email</label>
                        <input 
                            type="email" 
                            placeholder="Nhập email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label>Mật khẩu</label>
                        <input 
                            type="password" 
                            placeholder="Nhập mật khẩu"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                        />

                        <label>Nhập lại mật khẩu</label>
                        <input 
                            type="password" 
                            placeholder="Nhập lại mật khẩu"
                            value={confPass}
                            onChange={(e) => setConfPass(e.target.value)}
                        />

                        <button type="submit" className="bt">Đăng ký</button>
                        <p style={{ color: msgColor }}>{message}</p>
                        <p>Bạn đã có tài khoản? <Link to="/Login">Đăng nhập</Link></p>
                    </form>
                </div>

                <div className="register-link">
                    <img src={logo} className="logo" alt="Logo" />
                    <h3>AUTOHUNT</h3>
                    <h5>Nơi giấc mơ bốn bánh khởi đầu!</h5>
                </div>
            </div>
        </div>
    );
}

export default Register;
