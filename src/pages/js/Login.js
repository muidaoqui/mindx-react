import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css';
import logo from '../../img/logo.png';
import './Register';
import './Home';
function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [message, setMessage] = useState('');
    const [msgColor, setMsgColor] = useState('red');
    const navigate = useNavigate(); // Dùng để chuyển trang sau khi đăng nhập

    const handleSubmit = (e) => {
        e.preventDefault();

        const localUser = JSON.parse(localStorage.getItem('user'));

        if (!email || !pass) {
            setMessage('Vui lòng điền đầy đủ thông tin.');
            setMsgColor('red');
            return;
        }

        if (!localUser) {
            setMessage('Tài khoản không tồn tại.');
            setMsgColor('red');
            return;
        }

        if (localUser.email === email && localUser.pass === pass) {
            setMessage('Đăng nhập thành công!');
            setMsgColor('green');
            localStorage.setItem('islogin', true);
            
            // Chuyển hướng sau khi đăng nhập thành công
            setTimeout(() => {
                navigate('/home'); // Chuyển về trang chủ hoặc bất kỳ trang nào bạn muốn
            }, 1000);
        } else {
            setMessage('Email hoặc mật khẩu không đúng.');
            setMsgColor('red');
        }
    }

    return (
        <div className="login">
            <div className="login-form">
                <div className="login-link">
                    <img src={logo} className="logo" alt="Logo" />
                    <h3>AUTOHUNT</h3>
                    <h5>Nơi giấc mơ bốn bánh khởi đầu!</h5>
                </div>

                <div className="login-title">
                    <h2>Đăng nhập</h2>
                    <form onSubmit={handleSubmit}>
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

                        <button type="submit" className="bt">Login</button>
                        <p style={{ color: msgColor }}>{message}</p>

                        <p>Chưa có tài khoản? <Link to="/Register">Đăng ký</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
