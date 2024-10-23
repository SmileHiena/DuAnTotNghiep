"use client";

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faEnvelope, faEdit, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Profile = () => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const toggleOrderDetails = () => {
    setShowOrderDetails(!showOrderDetails);
  };

  // Thông tin tài khoản mẫu
  const accountInfo = {
    id: 1,
    Ten: "Nguyen Thai Son",
    SDT: "0987654321",
    NgaySinh: "1990-10-10",
    GioiTinh: "Nam",
    Anh: "/images/phim/cong-tu-bac-lieu.jpg",
    TenDangNhap: "NguyenThaiSon",
    MatKhau: "12345678",
    Email: "nguyenthaison@example.com",
    FullName: "Nguyen Thai Son",
    IsAdmin: true,
    DiaChi: "123 Đường ABC, Quận 1, TP. HCM",
  };

  return (
    <section className="flex justify-center items-center w-full">
      <div className="w-[1410px]">
        <div className="relative h-[300px] bg-cover bg-center border-3 border-white mb-4" style={{ backgroundImage: "url('../images/background.png')" }}>
        </div>

        <div className="relative -mt-20 flex flex-col items-center">
          <img src={accountInfo.Anh} alt="Profile" className="rounded-full w-36 h-36 border-5 border-white object-cover" />
          <h2 className="text-3xl font-semibold mt-2">{accountInfo.FullName}</h2>
        </div>

        <div className="flex justify-between mt-5 mb-8 gap-4">
          <div className="w-1/3 h-[250px] p-6 bg-gray-700">
            <h2 className="text-2xl text-center text-white font-semibold">THÔNG TIN KHÁCH HÀNG</h2>
            <div className="flex items-center mt-2">
              <FontAwesomeIcon icon={faUser} className="mr-2 text-white" style={{ width: '20px', height: '20px' }} />
              <p className="text-white">{accountInfo.Ten}</p>
            </div>
            <div className="flex items-center mt-2">
              <FontAwesomeIcon icon={faPhone} className="mr-2 text-white" style={{ width: '20px', height: '20px' }} />
              <p className="text-white">{accountInfo.SDT}</p>
            </div>
            <div className="flex items-center mt-2">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-white" style={{ width: '20px', height: '20px' }} />
              <p className="text-white">{accountInfo.Email}</p>
            </div>
            <div className="flex justify-between mt-4">
              <button className="bg-[#F5CF49] text-[#000000] py-2 px-4 rounded-lg">
                <Link href="/page/editprofile"> <FontAwesomeIcon icon={faEdit} className="mr-1" style={{ width: '20px', height: '20px' }} /> Sửa</Link>
              </button>
              <button className="bg-[#F5CF49] text-[#000000] py-2 px-4 rounded-lg">
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" style={{ width: '20px', height: '20px' }} /> Đăng xuất
              </button>
            </div>
          </div>

          <div className="w-2/3">
            <h2 className="text-2xl mb-2 text-white font-semibold">ĐƠN HÀNG CỦA BẠN</h2>
            <table className="w-full border-collapse bg-gray-800 text-white">
              <thead>
                <tr>
                  <th className="bg-[#F5CF49] text-[#000000] px-4 py-2">Mã đơn hàng</th>
                  <th className="bg-[#F5CF49] text-[#000000] px-4 py-2">Ngày mua</th>
                  <th className="bg-[#F5CF49] text-[#000000] px-4 py-2">Địa chỉ</th>
                  <th className="bg-[#F5CF49] text-[#000000] px-4 py-2">Trạng thái</th>
                  <th className="bg-[#F5CF49] text-[#000000] px-4 py-2">Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-700 ">
                  <td className="text-center px-4 py-2">MD12345678</td>
                  <td className="text-center px-4 py-2">10-09-2024</td>
                  <td className="text-center px-4 py-2">Ticket Quận 12, 271 Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, TP Hồ Chí Minh</td>
                  <td className="text-center px-4 py-2">Đã duyệt</td>
                  <td className="text-center px-4 py-2">
                    <button onClick={toggleOrderDetails} className="bg-[#F5CF49] text-[#000000] rounded px-2">chi tiết</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Hiển thị thông tin chi tiết đơn hàng ở giữa màn hình */}
        {showOrderDetails && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h2 className='text-2xl font-bold text-center text-[#F5CF49]'>Thông Tin Đơn Hàng</h2>
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
        )}
      </div>
    </section>
  );
};

export default Profile;
