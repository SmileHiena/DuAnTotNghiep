// src/app/login/page.js
"use client"; // Đảm bảo sử dụng "use client" cho component client

import React, { useState } from "react";
import axios from "axios";
import Link from 'next/link';
// import { useRouter } from 'next/navigation'; // Dùng useRouter từ next/navigation

const Login = () => {
    // const router = useRouter(); // Khởi tạo router
    const [formData, setFormData] = useState({
        usernameOrEmail: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            const response = await axios.post('http://localhost:3000/users/login', formData);
            if (response.data && response.data.token) {
                setSuccess("Đăng nhập thành công!");
                setError("");
                localStorage.setItem('token', response.data.token);
    
                // Kiểm tra quyền truy cập
                if (response.data.isAdmin === 1) {
                    window.location.href = ' http://localhost:3002/'; // Chuyển hướng đến trang admin
                } else {
                    window.location.href = '/'; // Chuyển hướng đến trang chủ
                }
            }
        } catch (error) {
            setError(error.response?.data?.message || "Có lỗi xảy ra trong quá trình đăng nhập");
        }
    };
    
    return (
        <div className="flex justify-center items-center bg-cover bg-center w-full min-h-screen bg-[url('../../public/images/background.png')]">
            <form
                onSubmit={handleLogin}
                className="flex flex-col justify-center items-center p-6 sm:p-8 md:p-10 rounded-lg text-white w-[90%] sm:w-[85%] md:w-[750px] lg:w-[900px] h-auto"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
            >
                <h1 className="text-center text-2xl sm:text-3xl md:text-4xl mb-5">Đăng nhập</h1>

                {error && <p className="text-red-500 mb-3">{error}</p>}
                {success && <p className="text-green-500 mb-3">{success}</p>}

                <label htmlFor="usernameOrEmail" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">
                    Tên đăng nhập, email hoặc số điện thoại*
                </label>
                <input
                    type="text"
                    id="usernameOrEmail"
                    name="usernameOrEmail"
                    value={formData.usernameOrEmail}
                    onChange={handleInputChange}
                    placeholder="Tên đăng nhập"
                    required
                    className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#212529] placeholder-white placeholder-opacity-50"
                />

                <label htmlFor="password" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">
                    Mật khẩu*
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Mật khẩu"
                    required
                    className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#212529] placeholder-white placeholder-opacity-50"
                />

                <div className="flex justify-between mb-3 text-xs sm:text-sm w-full md:w-[520px]">
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Nhớ tài khoản
                    </label>
                    <a href="#" className="text-[#F5CF49]">Quên mật khẩu?</a>
                </div>

                <button
                    type="submit"
                    className="w-full md:w-[520px] h-[40px] sm:h-[45px] bg-[#F5CF49] rounded-full text-sm sm:text-lg font-bold hover:bg-yellow-300 cursor-pointer"
                >
                    Đăng nhập
                </button>

                <hr className="my-5 w-full" />

                <div className="flex justify-center items-center text-xs sm:text-sm">
                    <p>Bạn chưa có tài khoản?</p>
                    <Link href="./register" className="text-[#F5CF49] ml-1">Đăng ký ngay!</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
