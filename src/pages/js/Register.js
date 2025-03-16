import React from "react";
import '../css/Register.css';
import logo from '../../img/logo.png';
function Register() {
    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const fullname = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const pass = document.getElementById('pass').value.trim();
        const conf = document.getElementById('confpass').value.trim();

        if(!fullname||!email||!pass||!conf){
            message.textContent = "Vui lòng điền đầy đủ thông tin.";
            message.style.color = "red";
        }
    })

    return(
        <div className="register">
            <div class="register-form">
                <div class="register-title">
                    <h2>Đăng ký</h2>
                    <form>
                    <label>Họ và tên</label>
                    <input type="text" id='fullname' placeholder="Nhập họ và tên" />
                    
                    <label>Email</label>
                    <input type="email" id='email' placeholder="Nhập email" />
                    
                    <label>Mật khẩu</label>
                    <input type="password" id='pass' placeholder="Nhập mật khẩu" />
                    
                    <label>Nhập lại mật khẩu</label>
                    <input type="password" id='confpasss' placeholder="Nhập lại mật khẩu" />
                    
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