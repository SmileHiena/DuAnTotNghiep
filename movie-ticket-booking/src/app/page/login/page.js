"use client"; // Đảm bảo sử dụng "use client" cho component client

import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

const Login = () => {
    const formik = useFormik({
        initialValues: {
            usernameOrEmail: '', // Tên đăng nhập hoặc email
            Matkhau: '', // Mật khẩu
        },
        validationSchema: Yup.object({
            usernameOrEmail: Yup.string().required('Bắt buộc'), // Yêu cầu trường này
            Matkhau: Yup.string().required('Bắt buộc'), // Yêu cầu trường mật khẩu
        }),
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                const res = await fetch('http://localhost:3000/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        usernameOrEmail: values.usernameOrEmail, // Gửi username hoặc email
                        MatKhau: values.Matkhau // Gửi mật khẩu
                    }),
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || 'Đăng nhập thất bại');
                }

                // Lưu token vào cookie
                const data = await res.json();
                document.cookie = `token=${data.token}; path=/; max-age=${60 * 60}`;

                // Chuyển trang theo vai trò
                const token = data.token;
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.isAdmin) { // Kiểm tra vai trò admin
                    window.location.href = 'http://localhost:3002'; // Chuyển đến trang admin
                } else {
                    window.location.href = '/'; // Chuyển đến trang người dùng
                }
            } catch (error) {
                setFieldError('general', error.message); // Hiển thị lỗi chung
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="flex justify-center items-center bg-cover bg-center w-full min-h-screen bg-[url('../../public/images/background.png')]">
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col justify-center items-center p-6 sm:p-8 md:p-10 rounded-lg text-white w-[90%] sm:w-[85%] md:w-[750px] lg:w-[900px] h-auto"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
            >
                <h1 className="text-center text-2xl sm:text-3xl md:text-4xl mb-5">Đăng nhập</h1>

                {formik.errors.general && <p className="text-red-500 mb-3">{formik.errors.general}</p>}

                <label htmlFor="usernameOrEmail" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">
                    Tên đăng nhập hoặc email*
                </label>
                <input
                    type="text"
                    id="usernameOrEmail"
                    name="usernameOrEmail"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.usernameOrEmail}
                    placeholder="Tên đăng nhập hoặc email"
                    required
                    className={`w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 rounded-md text-sm sm:text-base ${formik.touched.usernameOrEmail && formik.errors.usernameOrEmail ? 'border-red-500' : 'border-white'} bg-[#212529] placeholder-white placeholder-opacity-50`}
                />
                {formik.touched.usernameOrEmail && formik.errors.usernameOrEmail && <p className="text-red-500">{formik.errors.usernameOrEmail}</p>}

                <label htmlFor="MatKhau" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">
                    Mật khẩu*
                </label>
                <input
                    type="password"
                    id="MatKhau"
                    name="Matkhau"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Matkhau}
                    placeholder="Mật khẩu"
                    required
                    className={`w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 rounded-md text-sm sm:text-base ${formik.touched.Matkhau && formik.errors.Matkhau ? 'border-red-500' : 'border-white'} bg-[#212529] placeholder-white placeholder-opacity-50`}
                />
                {formik.touched.MatKhau && formik.errors.Matkhau && <p className="text-red-500">{formik.errors.Matkhau}</p>}

                <div className="flex justify-between mb-3 text-xs sm:text-sm w-full md:w-[520px]">
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Nhớ tài khoản
                    </label>
                    <Link href="#" className="text-[#F5CF49]">Quên mật khẩu?</Link>
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
                    <Link href="/page/register" className="text-[#F5CF49] ml-1">Đăng ký ngay!</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;