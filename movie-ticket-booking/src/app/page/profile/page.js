"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Profile = () => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const toggleOrderDetails = () => {
    setShowOrderDetails(!showOrderDetails);
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-[1410px]">
        <div className="relative h-[300px] bg-cover bg-center rounded-lg border-3 border-wheat mb-4" style={{ backgroundImage: "url('../images/background.png')" }}>
          <div className="absolute bottom-5 left-5 text-white text-4xl shadow-lg">Profile</div>
        </div>
        
        <div className="relative -mt-20 flex flex-col items-center">
          <img src="images/frofile/ava.jpg" alt="Profile" className="rounded-full w-36 h-36 border-5 border-white object-cover" />
          <h2 className="text-2xl mt-2">Phạm Ngọc Trân</h2>
        </div>

        <div className="flex justify-between mt-5 mb-8">
          <div className="w-1/3 bg-gray-800 rounded-lg p-5">
            <h2 className="text-xl text-center">THÔNG TIN KHÁCH HÀNG</h2>
            <div className="flex items-center mt-2">
              <span className="mr-2">👤</span>
              <p>Họ tên: Phạm Ngọc Trân</p>
            </div>
            <div className="flex items-center mt-2">
              <span className="mr-2">📞</span>
              <p>Số ĐT: 0336870210</p>
            </div>
            <div className="flex items-center mt-2">
              <span className="mr-2">📍</span>
              <p>Email: example@email.com</p>
            </div>
            <div className="flex justify-between mt-4">
              <button className="bg-yellow-400 text-black py-2 px-4 rounded-lg">Sửa thông tin</button>
              <button className="bg-yellow-400 text-black py-2 px-4 rounded-lg">Đăng xuất</button>
            </div>

            {showOrderDetails && (
              <div className="bg-gray-700 border border-gray-300 p-4 rounded-lg mt-4">
                <h2 className='text-lg font-bold text-center text-yellow-400'>Thông Tin Đơn Hàng</h2>
                <p><strong>Mã Đơn Hàng:</strong> ORD-20241015-12345</p>
                <p><strong>Ngày Đặt Hàng:</strong> 15/10/2024</p>
                <h3 className="font-bold mt-2">Thông Tin Vé Xem Phim</h3>
                <p><strong>Tên Phim:</strong> Avengers: Endgame</p>
                <p><strong>Thời Gian Chiếu:</strong> 15/10/2024 - 19:00</p>
                <p><strong>Địa Điểm Chiếu:</strong> Ticket Quận 12, 271 Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, TP Hồ Chí Minh</p>
                <p><strong>Loại Vé:</strong> Vé VIP 3D</p>
                <p><strong>Số Ghế:</strong> A5, A6</p>
                <p><strong>Giá Vé:</strong> 100.000 VNĐ</p>
                <p><strong>Tổng Tiền:</strong> 200.000 VNĐ</p>
                <p><strong>Mã Vé:</strong> #VQ123456</p>
              </div>
            )}
          </div>

          <div className="w-2/3">
            <h2 className="text-xl mb-2">ĐƠN HÀNG CỦA BẠN</h2>
            <table className="w-full border-collapse bg-gray-800 text-white">
              <thead>
                <tr>
                  <th className="bg-yellow-400 text-black px-4 py-2">Mã đơn hàng</th>
                  <th className="bg-yellow-400 text-black px-4 py-2">Ngày mua</th>
                  <th className="bg-yellow-400 text-black px-4 py-2">Địa chỉ</th>
                  <th className="bg-yellow-400 text-black px-4 py-2">Trạng thái</th>
                  <th className="bg-yellow-400 text-black px-4 py-2">Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-700">
                  <td className="text-center px-4 py-2">MD12345678</td>
                  <td className="text-center px-4 py-2">10-09-2024</td>
                  <td className="text-center px-4 py-2">Ticket Quận 12, 271 Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, TP Hồ Chí Minh</td>
                  <td className="text-center px-4 py-2">Đã duyệt</td>
                  <td className="text-center px-4 py-2">
                    <p onClick={toggleOrderDetails} className="cursor-pointer bg-yellow-400 text-gray-800 rounded-lg px-2">xem chi tiết</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
