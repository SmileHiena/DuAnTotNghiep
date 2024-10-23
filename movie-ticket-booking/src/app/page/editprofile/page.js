"use client";

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faEnvelope, faArrowLeft, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const EditProfile = () => {
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
    <section className="flex justify-center items-center w-full px-4">
      <div className="w-full max-w-[1410px]">
        <div className="relative h-[300px] bg-cover bg-center border-3 border-white mb-4" style={{ backgroundImage: "url('../images/background.png')" }}>
        </div>

        <div className="relative -mt-20 flex flex-col items-center">
          <img src={accountInfo.Anh} alt="Profile" className="rounded-full w-36 h-36 border-5 border-white object-cover" />
          <h2 className="text-3xl font-semibold mt-2 text-white">{accountInfo.FullName}</h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-5 mb-8 gap-4">
          <div className="w-full md:w-1/3 h-auto p-6 bg-gray-700">
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
            <div className="flex justify-between mt-4 flex-col md:flex-row">
              <Link href="/page/profile">
                <button className="bg-[#F5CF49] text-[#000000] py-2 px-4 rounded-lg mb-2 md:mb-0 md:mr-2 w-full md:w-auto">
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-1" style={{ width: '20px', height: '20px' }} /> Quay lại
                </button>
              </Link>
              <button className="bg-[#F5CF49] text-[#000000] py-2 px-4 rounded-lg w-full md:w-auto">
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" style={{ width: '20px', height: '20px' }} /> Đăng xuất
              </button>
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <h2 className="text-2xl mb-2 text-white font-semibold">CHỈNH SỬA THÔNG TIN CÁ NHÂN</h2>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Họ và tên */}
                <div className="form-group">
                  <label className="text-white">Họ và tên</label>
                  <input
                    type="text"
                    defaultValue={accountInfo.FullName}
                    className='input-info mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                    placeholder="Nhập họ và tên"
                  />
                </div>
                {/* Ngày sinh */}
                <div className="form-group">
                  <label className="text-white">Ngày sinh</label>
                  <input
                    type="date"
                    defaultValue={accountInfo.NgaySinh}
                    className='input-info mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                    placeholder="Nhập ngày sinh"
                  />
                </div>
                {/* Số điện thoại */}
                <div className="form-group">
                  <label className="text-white">Số điện thoại</label>
                  <input
                    type="text"
                    defaultValue={accountInfo.SDT}
                    className='input-info mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                {/* Email */}
                <div className="form-group">
                  <label className="text-white">Email</label>
                  <input
                    type="email"
                    defaultValue={accountInfo.Email}
                    className='input-info mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                    placeholder="Nhập email"
                  />
                </div>
                {/* Địa chỉ */}
                <div className="form-group">
                  <label className="text-white">Địa chỉ</label>
                  <input
                    type="text"
                    defaultValue={accountInfo.DiaChi}
                    className='input-info mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                    placeholder="Nhập địa chỉ"
                  />
                </div>
                {/* Tên đăng nhập - không cho phép chỉnh sửa */}
                <div className="form-group">
                  <label className="text-white">Tên đăng nhập</label>
                  <input
                    type="text"
                    defaultValue={accountInfo.TenDangNhap}
                    readOnly // Thêm thuộc tính này để không cho phép chỉnh sửa
                    className='input-info mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                    placeholder="Nhập tên đăng nhập"
                  />
                </div>
              </div>
              <button className="mt-4 bg-[#F5CF49] text-[#000000] py-2 px-4 rounded-lg w-full">Lưu lại</button>
            </form>

            {/* Đổi mật khẩu */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-white">ĐỔI MẬT KHẨU</h2>
              <form>
                {/* Mật khẩu cũ */}
                <div className="form-group">
                  <label className="text-white">Mật khẩu cũ</label>
                  <input
                    type="password"
                    className='input-info mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                    placeholder="Nhập mật khẩu cũ"
                  />
                </div>
                {/* Mật khẩu mới */}
                <div className="form-group">
                  <label className="text-white">Mật khẩu mới</label>
                  <input
                    type="password"
                    className='input-info mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                    placeholder="Nhập mật khẩu mới"
                  />
                </div>
                {/* Xác thực mật khẩu */}
                <div className="form-group">
                  <label className="text-white">Xác thực mật khẩu</label>
                  <input
                    type="password"
                    className='input-info mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                    placeholder="Xác thực mật khẩu"
                  />
                </div>
                <button className="mt-4 bg-[#F5CF49] text-[#000000] py-2 px-4 rounded-lg w-full">Lưu lại</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
