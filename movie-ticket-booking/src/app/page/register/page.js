import React from "react";
import Link from 'next/link';

const Register = () => {
    return (
        <div className="flex justify-center items-center bg-cover bg-center w-full h-[950px] bg-[url('../../public/images/background.png')]">
            <form
                className="flex flex-col justify-center items-center p-6 sm:p-8 md:p-10 rounded-lg text-white w-[90%] sm:w-[85%] md:w-[750px] lg:w-[900px] h-auto"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
            >
                <h1 className="text-center text-2xl sm:text-3xl md:text-4xl mb-4">Đăng ký</h1>

                {/* Label căn trái */}
                <label htmlFor="fullname" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">
                    Họ và tên *
                </label>
                <input
                    type="text"
                    id="fullname"
                    placeholder="Họ và tên"
                    required
                    className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#212529] placeholder-white placeholder-opacity-50"
                />

                {/* Label căn trái */}
                <label htmlFor="phone" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">
                    Số điện thoại *
                </label>
                <input
                    type="text"
                    id="phone"
                    placeholder="Số điện thoại"
                    required
                    className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#212529] placeholder-white placeholder-opacity-50"
                />

                {/* Label căn trái */}
                <label htmlFor="username" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">
                    Tên đăng nhập *
                </label>
                <input
                    type="text"
                    id="username"
                    placeholder="Tên đăng nhập"
                    required
                    className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#212529] placeholder-white placeholder-opacity-50"
                />

                {/* Label căn trái */}
                <label htmlFor="email" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">
                    Email *
                </label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    required
                    className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#212529] placeholder-white placeholder-opacity-50"
                />

                {/* Label căn trái */}
                <label htmlFor="password" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">
                    Mật khẩu *
                </label>
                <input
                    type="password"
                    id="password"
                    placeholder="Mật khẩu"
                    required
                    className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#212529] placeholder-white placeholder-opacity-50"
                />

                {/* Label căn trái */}
                <label htmlFor="confirm-password" className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]">
                    Nhập lại mật khẩu *
                </label>
                <input
                    type="password"
                    id="confirm-password"
                    placeholder="Nhập lại mật khẩu"
                    required
                    className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#212529] placeholder-white placeholder-opacity-50"
                />

                <div className="flex items-center mb-3 text-xs sm:text-sm w-full md:w-[520px]">
            
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Tôi đồng ý các điều khoản
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full md:w-[520px] h-[40px] sm:h-[45px] bg-[#F5CF49] rounded-full text-sm sm:text-lg font-bold hover:bg-yellow-300 cursor-pointer"
                >
                    Đăng ký
                </button>

                <hr className="my-5 w-full" />

                <div className="flex justify-center items-center text-xs sm:text-sm">
                    <p>Bạn đã có tài khoản?</p>
                    <Link href="./login" className="text-[#F5CF49] ml-1">Đăng nhập ngay!</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
