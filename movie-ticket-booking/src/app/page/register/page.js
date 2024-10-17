"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios"; // Hoặc bạn có thể sử dụng fetch

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const userData = {
      fullname: formData.fullname,
      phone: formData.phone,
      email: formData.email,
      username: formData.username,
      password: formData.password,
    };

    try {
      const response = await axios.post('http://localhost:3000/users/register', userData);
      if (response && response.data) {
        setSuccess(response.data.message + ": " + JSON.stringify(response.data.user)); // Hiển thị thông tin người dùng đã đăng ký
        setError(""); // Xóa thông báo lỗi
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Có lỗi xảy ra trong quá trình đăng ký');
    }
};


  return (
    <div className="flex justify-center items-center bg-cover bg-center w-full h-[950px] bg-[url('../../public/images/background.png')]">
      <form
        className="flex flex-col justify-center items-center p-6 sm:p-8 md:p-10 rounded-lg text-white w-[90%] sm:w-[85%] md:w-[750px] lg:w-[900px] h-auto"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        onSubmit={handleRegister} // Thêm sự kiện submit
      >
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl mb-4">
          Đăng ký
        </h1>

        {/* Hiển thị thông báo lỗi hoặc thành công */}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <label
          htmlFor="fullname"
          className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]"
        >
          Họ và tên *
        </label>
        <input
          type="text"
          id="fullname"
          placeholder="Họ và tên"
          required
          value={formData.fullname}
          onChange={handleChange}
          className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#212529] placeholder-white placeholder-opacity-50"
        />

        <label
          htmlFor="phone"
          className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]"
        >
          Số điện thoại *
        </label>
        <input
          type="text"
          id="phone"
          placeholder="Số điện thoại"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#212529] placeholder-white placeholder-opacity-50"
        />

        <label
          htmlFor="username"
          className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]"
        >
          Tên đăng nhập *
        </label>
        <input
          type="text"
          id="username"
          placeholder="Tên đăng nhập"
          required
          value={formData.username}
          onChange={handleChange}
          className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#212529] placeholder-white placeholder-opacity-50"
        />

        <label
          htmlFor="email"
          className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]"
        >
          Email *
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#212529] placeholder-white placeholder-opacity-50"
        />

        <label
          htmlFor="password"
          className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]"
        >
          Mật khẩu *
        </label>
        <input
          type="password"
          id="password"
          placeholder="Mật khẩu"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#212529] placeholder-white placeholder-opacity-50"
        />

        <label
          htmlFor="confirm-password"
          className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]"
        >
          Nhập lại mật khẩu *
        </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Nhập lại mật khẩu"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#212529] placeholder-white placeholder-opacity-50"
        />

        <div className="flex items-center mb-3 text-xs sm:text-sm w-full md:w-[520px]">
          <label className="flex items-center">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={formData.agreeTerms}
              onChange={(e) =>
                setFormData({ ...formData, agreeTerms: e.target.checked })
              }
            />
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
          <Link href="./login" className="text-[#F5CF49] ml-1">
            Đăng nhập ngay!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
