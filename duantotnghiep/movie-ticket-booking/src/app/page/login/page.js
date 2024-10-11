import React from "react";
import '../../../../public/styles/login.css';
import Link from 'next/link';
const Login = () => {
    return (
        <div className="login-container">
           <div className="box-login">
            <form className="login-form">
                <h1 className="login-header">Đăng nhập</h1>

                <label htmlFor="username" className="login-text">Tên đăng nhập, email hoặc số điện thoại*</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Tên đăng nhập"
                    required
                />

                <label htmlFor="password" className="login-text">Mật khẩu*</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Mật khẩu"
                    required
                />

                <div className="remember-forgot">
                    <label>
                        <input type="checkbox" />
                        Nhớ tài khoản
                    </label>
                    <a href="#" className="forget-pass">Quên mật khẩu?</a>
                </div>

                <button type="submit" className="login-btn">Đăng nhập</button>
                <hr className="login-hr" />
                <div className="next-regiter">
                    <p className="acount">Bạn chưa có tài khoản? </p>
                    <Link href="register">Đăng ký ngay!</Link>
                </div>
            </form>
        </div>
        </div>
    );
};

export default Login;