"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEdit,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Profile = () => {
  const [accountInfo, setAccountInfo] = useState({});
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const toggleOrderDetails = () => {
    setShowOrderDetails(!showOrderDetails);
  };

  useEffect(() => {
    const token = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("token="));
    const tokenValue = token?.split("=")[1];

    if (tokenValue) {
      const getUserInfo = async () => {
        try {
          const response = await fetch(
            "http://localhost:3000/users/detailuser",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${tokenValue}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setAccountInfo(data);
          } else {
            console.error("Failed to fetch user data");
            alert("Vui lòng đăng nhập lại.");
          }
        } catch (error) {
          console.error("An error occurred while fetching user data:", error);
          alert("Có lỗi xảy ra, vui lòng thử lại.");
        }
      };

      getUserInfo();
    }
  }, []);

  return (
    <section className="flex flex-col justify-center items-center w-full px-4">
      <div className="w-full max-w-[1410px]">
        <div
          className="relative h-[300px] bg-cover bg-center border-3 border-white mb-4"
          style={{ backgroundImage: "url('../images/background.png')" }}
        ></div>
        <div className="relative -mt-20 flex flex-col md:flex-row">
          <div className="flex flex-col items-center w-full md:w-1/4">
            <img
              src={`http://localhost:3000/images/${accountInfo.Anh}`} // Đường dẫn tới hình ảnh
              alt="Profile"
              className="rounded-full w-36 h-36 border-5 border-white object-cover"
            />
            <div className="flex justify-center mt-1">
              <h2 className="text-3xl text-center font-semibold text-white">
                {accountInfo.Ten}
              </h2>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-5 mb-8 gap-4">
          <div className="w-full md:w-1/4 p-6 bg-gray-700 text-white">
            <nav className="space-y-4">
              <Link
                href="/page/profile"
                className="flex items-center text-lg text-white no-underline"
              >
                <FontAwesomeIcon icon={faUser} className="mr-2 w-4" /> Thông tin
                khách hàng
              </Link>
              <Link
                href="/page/comment"
                className="flex items-center text-lg text-white no-underline"
              >
                <FontAwesomeIcon icon={faEdit} className="mr-2 w-4" /> Lịch sử
                bình luận
              </Link>
              <Link
                href="/page/hoadon"
                className="flex items-center text-lg text-white no-underline"
              >
                <FontAwesomeIcon icon={faEdit} className="mr-2 w-4" /> Lịch sử
                mua hàng
              </Link>
            </nav>
          </div>

          <div className="w-full md:w-3/4 p-6 text-white">
            <h1 className="text-3xl font-bold mb-6">THÔNG TIN KHÁCH HÀNG</h1>
            <div className="bg-black bg-opacity-50 p-6 rounded-lg mb-6">
              <h2 className="text-2xl font-semibold mb-4">Thông tin cá nhân</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2">Họ và tên</label>
                  <input
                    type="text"
                    defaultValue={accountInfo.Ten}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-2">Ngày sinh</label>
                  <input
                    type="text"
                    defaultValue={
                      accountInfo.NgaySinh
                        ? new Date(accountInfo.NgaySinh).toLocaleDateString(
                            "vi-VN",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )
                        : ""
                    }
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-2">Số điện thoại</label>
                  <input
                    type="text"
                    defaultValue={accountInfo.SDT}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-2">Email</label>
                  <input
                    type="text"
                    defaultValue={accountInfo.Email}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                  />
                </div>
              </div>
              <button className=" w-[117px] h-[35px] bg-[#F5CF49] text-[#000000] rounded hover:bg-[#212529] hover:text-[#ffffff] hover:border-2 hover:border-[#F5CF49] hover:border-solid">
                Lưu
              </button>
            </div>
            <div className="bg-black bg-opacity-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Đổi mật khẩu</h2>
              <div className="mb-4">
                <label className="block mb-2">
                  Mật khẩu cũ <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">
                  Mật khẩu mới <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">
                  Xác thực mật khẩu <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                />
              </div>
              <button className=" w-[117px] h-[35px] bg-[#F5CF49] text-[#000000] rounded hover:bg-[#212529] hover:text-[#ffffff] hover:border-2 hover:border-[#F5CF49] hover:border-solid">
                Lưu
              </button>
            </div>
          </div>
        </div>

        {/* Uncomment if you want to show order details */}
        {/* {showOrderDetails && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-center text-[#F5CF49]">Thông Tin Đơn Hàng</h2>
              <p><strong>Mã Đơn Hàng:</strong> ORD-20241015-12345</p>
              <p><strong>Ngày Đặt Hàng:</strong> 15/10/2024</p>
              <h3 className="text-xl font-bold mt-2 text-[#F5CF49]">Thông Tin Vé Xem Phim</h3>
              <p><strong>Tên Phim:</strong> Avengers: Endgame</p>
              <p><strong>Thời Gian Chiếu:</strong> 15/10/2024 - 19:00</p>
              <p><strong>Địa Điểm Chiếu:</strong> Ticket Quận 12, 271 Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, TP Hồ Chí Minh</p>
              <p><strong>Loại Vé:</strong> Vé VIP 3D</p>
              <p><strong>Số Ghế:</strong> A5, A6</p>
              <p><strong>Giá Vé:</strong> 100.000 VNĐ</p>
              <p><strong>Tổng Tiền:</strong> 200.000 VNĐ</p>
              <p><strong>Mã Vé:</strong> #VQ123456</p>
              <button onClick={toggleOrderDetails} className="mt-4 bg-[#F5CF49] text-[#000000] py-2 px-4 rounded-lg">Đóng</button>
            </div>
          </div>
        )} */}
      </div>
    </section>
  );
};

export default Profile;
