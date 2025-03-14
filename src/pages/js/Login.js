import logo from '../../img/logo.png';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Login.css';

function Login() {

    return(
        <div className="login">
            <div class="login-form">
                <div class="login-link">
                    <img src={logo} className="logo" alt="Logo"/>
                    <h3>AUTOHUNT</h3>
                    <h5>Nơi giấc mơ bốn bánh khởi đầu!</h5>
                </div>
                <div class="login-title">
                    <h2>Đăng nhập</h2>
                    <form>
                        <label>Email</label>
                        <input type="email" placeholder="Nhập email" />
                        
                        <label>Mật khẩu</label>
                        <input type="password" placeholder="Nhập mật khẩu" />
                        <button type="submit" className="bt">Login</button>
                        <p>Đã có tài khoản?<a href="#">Đăng ký</a></p>
                    </form>
                </div>
            </div>

        </div>
    )
}
export default Login;