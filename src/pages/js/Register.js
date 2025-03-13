import React from "react";
import '../css/Register.css';
import logo from '../../img/logo.png';
function Register() {


    return(
        <div className="register">
            <div class="register-form">
                <div class="register-title">
                    <h2>Đăng ký</h2>
                    <form>
                    <label>Họ và tên</label>
                    <input type="text" placeholder="Nhập họ và tên" />
                    
                    <label>Email</label>
                    <input type="email" placeholder="Nhập email" />
                    
                    <label>Mật khẩu</label>
                    <input type="password" placeholder="Nhập mật khẩu" />
                    
                    <label>Nhập lại mật khẩu</label>
                    <input type="password" placeholder="Nhập lại mật khẩu" />
                    
                    <button type="submit" className="bt">Đăng ký</button>
                    <p>Đã có tài khoản?<a href="#">Đăng nhập</a></p>
                    </form>
                </div>

                <div class="register-link">
                    <img src={logo} className="logo" alt="Logo"/>
                    <h3>AUTOHUNT</h3>
                    <h5>Nơi giấc mơ bốn bánh khởi đầu!</h5>
                </div>
            </div>

        </div>
    )
}

export default Register;    