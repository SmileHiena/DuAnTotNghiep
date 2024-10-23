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
    birthday: "",
    address: "",
    email: "",
    gender: "",
    password: "",
    username: "",
    confirmPassword: "",
    image: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
    if (success) {
      alert("Bạn đã đăng ký thành công!");
      window.location.href = "/page/login";
      dispatch(clearMessages());
    }

    if (error) {
      alert(error);
      dispatch(clearMessages());
    }
  }, [success, error, dispatch]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      return dispatch(registerFailure("Bạn cần đồng ý với điều khoản."));
    }
    // Password validation
    if (formData.password.length < 6) {
      return dispatch(registerFailure("Mật khẩu phải có ít nhất 6 ký tự."));
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/;
    if (!passwordRegex.test(formData.password)) {
      return dispatch(
        registerFailure(
          "Mật khẩu phải chứa ít nhất một ký tự số, một ký tự chữ hoa và một ký tự đặc biệt."
        )
      );
    }

    if (formData.password !== formData.confirmPassword) {
      return dispatch(
        registerFailure("Mật khẩu và xác nhận mật khẩu không khớp!")
      );
    }

    const data = new FormData();
    data.append("fullname", formData.fullname);
    data.append("phone", formData.phone);
    data.append("birthday", formData.birthday);
    data.append("address", formData.address);
    data.append("gender", formData.gender);
    data.append("email", formData.email);
    data.append("username", formData.username);
    data.append("password", formData.password);
    data.append("image", formData.image);

    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
    <div className="flex justify-center items-center bg-cover bg-center w-full h-full bg-[url('../../public/images/background.png')]">
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
          htmlFor="birthday"
          className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]"
        >
          Ngày sinh *
        </label>
        <input
          type="date"
          id="birthday"
          placeholder="Ngày sinh"
          required
          value={formData.birthday}
          onChange={handleChange}
          className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#212529] placeholder-white placeholder-opacity-50"
        />

        <label
          htmlFor="address"
          className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]"
        >
          Địa chỉ *
        </label>
        <input
          type="text"
          id="address"
          placeholder="Địa chỉ"
          required
          value={formData.address}
          onChange={handleChange}
          className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#212529] placeholder-white placeholder-opacity-50"
        />

        <label
          htmlFor="gender"
          className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px]"
        >
          Giới tính *
        </label>
        <select
          id="gender"
          required
          value={formData.gender}
          onChange={handleChange}
          className="w-full md:w-[520px] h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#212529] placeholder-white placeholder-opacity-50"
        >
          <option value="">Giới tính</option>
          <option value="Nam">Nam</option>
          <option value="Nu">Nữ</option>
        </select>

        <label
          htmlFor="password"
          className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px] relative"
        >
          Mật khẩu *
        </label>
        <div className="relative w-full md:w-[520px]">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Mật khẩu"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#212529] placeholder-white placeholder-opacity-50 pr-10"
          />
          <span
            className="absolute right-3 top-[40%] transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i
              className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              aria-hidden="true"
            ></i>
          </span>
        </div>

        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-base sm:text-lg text-left w-full md:w-[520px] relative"
        >
          Nhập lại mật khẩu *
        </label>
        <div className="relative w-full md:w-[520px]">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            placeholder="Nhập lại mật khẩu"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full h-[40px] sm:h-[45px] p-2 mb-3 border-2 border-white rounded-md text-sm sm:text-base bg-[#212529] placeholder-white placeholder-opacity-50 pr-10"
          />
          <span
            className="absolute right-3 top-[40%] transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <i
              className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
              aria-hidden="true"
            ></i>
          </span>
        </div>

          {/* Checkbox đồng ý điều khoản */}
          <div className="flex items-center mb-4 w-full md:w-[520px]">
          <input
            type="checkbox"
            id="agreeTerms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="agreeTerms" className="text-base sm:text-lg">
            Tôi đồng ý với{" "}
            <Link href="/terms" className="text-blue-500 hover:underline">
              điều khoản sử dụng
            </Link>
          </label>
        </div>

        <button
          type="submit"
          className="w-full md:w-[520px] h-[40px] sm:h-[45px] bg-[#F5CF49] rounded-full text-sm sm:text-lg font-bold hover:bg-yellow-300 cursor-pointer"
        >
          Đăng ký
        </button>

        <div className="mt-4">
          <span className="text-sm">
            Bạn đã có tài khoản?{" "}
            <Link href="/page/login" className="text-blue-500 hover:underline">
              Đăng nhập
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
