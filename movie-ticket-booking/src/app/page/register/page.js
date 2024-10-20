"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  registerSuccess,
  registerFailure,
  clearMessages,
} from "../store/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    image: null, // Thêm trường image
  });

  useEffect(() => {
    if (success) {
      alert("Bạn đã đăng ký thành công!"); // Hiển thị thông báo thành công
      dispatch(clearMessages());
    }

    if (error) {
      alert(error); // Hiển thị thông báo lỗi
      dispatch(clearMessages());
    }
  }, [success, error, dispatch]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] }); // Xử lý file ảnh
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Tạo đối tượng FormData để chứa dữ liệu
    const data = new FormData();
    data.append("fullname", formData.fullname);
    data.append("phone", formData.phone);
    data.append("email", formData.email);
    data.append("username", formData.username);
    data.append("password", formData.password);
    data.append("image", formData.image); // Đính kèm file ảnh

    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Đảm bảo gửi dạng multipart
          },
        }
      );

      if (response && response.data) {
        dispatch(registerSuccess(response.data.user));
      }
    } catch (error) {
      dispatch(
        registerFailure(
          error.response?.data?.message ||
            "Có lỗi xảy ra trong quá trình đăng ký"
        )
      );
    }
  };

  return (
    <div className="flex justify-center items-center bg-cover bg-center w-full h-[950px] bg-[url('../../public/images/background.png')]">
      <form
        className="flex flex-col justify-center items-center p-6 sm:p-8 md:p-10 rounded-lg text-white w-[90%] sm:w-[85%] md:w-[750px] lg:w-[900px] h-auto"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        onSubmit={handleRegister}
      >
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl mb-4">
          Đăng ký
        </h1>

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

        {/* Trường input để chọn hình ảnh */}
        <label
          htmlFor="image"
          className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]"
        >
          Chọn hình ảnh đại diện *
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#212529] text-white"
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
          htmlFor="username"
          className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]"
        >
          Tên người dùng *
        </label>
        <input
          type="text"
          id="username"
          placeholder="-leaning"
          required
          value={formData.username}
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
          htmlFor="confirmPassword"
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

        <button
          type="submit"
          className="w-full md:w-[520px] h-[40px] sm:h-[45px] bg-[#F5CF49] rounded-full text-sm sm:text-lg font-bold hover:bg-yellow-300 cursor-pointer"
        >
          Đăng ký
        </button>

        <hr className="my-5 w-full" />

        <div className="flex justify-center items-center text-xs sm:text-sm">
          <p>Bạn đã có tài khoản?</p>
          <Link href="/page/login" className="text-[#F5CF49] ml-1">
            Đăng nhập ngay!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;