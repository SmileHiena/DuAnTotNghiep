"use client";

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMapLocationDot, faPhone, faEnvelope, faArrowLeft, faCakeCandles, faEdit, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const EditProfile = () => {
  const [accountInfo, setAccountInfo] = useState({});
  
  useEffect(() => {
    const token = document.cookie.split(';').find(c => c.trim().startsWith('token='));
    const tokenValue = token?.split('=')[1];

    if (tokenValue) {
      const getUserInfo = async () => {
        try {
          const response = await fetch('http://localhost:3000/users/detailuser', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${tokenValue}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const data = await response.json();
            setAccountInfo(data);
          } else {
            console.error('Failed to fetch user data');
            alert('Vui lòng đăng nhập lại.');
          }
        } catch (error) {
          console.error('An error occurred while fetching user data:', error);
          alert('Có lỗi xảy ra, vui lòng thử lại.');
        }
      };

      getUserInfo();
    }
  }, []);

  return (
    <section className="flex justify-center items-center w-full px-4">
      <div className="w-full max-w-[1410px]">
        <div className="relative h-[300px] bg-cover bg-center border-3 border-white mb-4" style={{ backgroundImage: "url('../images/background.png')" }}>
        </div>
        <div className="flex flex-col ml-12" style={{ marginTop: '-100px', marginLeft: '150px' }}>
          <img 
            src={`http://localhost:3000/images/${accountInfo.image}`} 
            alt="Profile" 
            className="rounded-full w-36 h-36 border-5 border-white object-cover"  style={{zIndex:'99999'}}
          />
          <div>
            <h2 className="text-32xl mt-1 font-semibold text-white">{accountInfo.FullName}</h2>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-5 mb-8 gap-4">
          <div className="w-full md:w-1/3 h-auto p-6 bg-gray-700">
            <h2 className="text-2xl text-center text-white font-semibold">THÔNG TIN KHÁCH HÀNG</h2>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="mr-2 text-white" style={{ width: '20px', height: '20px' }} />
              <p className="text-white" style={{ marginTop: '20px' }}><strong>Họ và Tên:</strong> {accountInfo.FullName}</p>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faPhone} className="mr-2 text-white" style={{ width: '20px', height: '20px' }} />
              <p className="text-white" style={{ marginTop: '20px' }}><strong>SĐT:</strong> {accountInfo.SDT}</p>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-white" style={{ width: '20px', height: '20px' }} />
              <p className="text-white" style={{ marginTop: '20px' }}><strong>Email:</strong> {accountInfo.Email}</p>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCakeCandles} className="mr-2 text-white" style={{ width: '20px', height: '20px' }} />
              <p className="text-white" style={{ marginTop: '20px' }}>
                <strong>Ngày sinh:</strong> {accountInfo.NgaySinh ? new Date(accountInfo.NgaySinh).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faMapLocationDot} className="mr-2 text-white" style={{ width: '20px', height: '20px' }} />
              <p className="text-white" style={{ marginTop: '20px' }}><strong>Địa chỉ:</strong> {accountInfo.DiaChi}</p>
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
                <div className="form-group">
                  <label className="text-white">Họ và tên</label>
                  <input
                    type="text"
                    defaultValue={accountInfo.FullName}
                    className='input-info mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                    placeholder="Nhập họ và tên"
                  />
                </div>
                <div className="form-group">
                  <label className="text-white">Ngày sinh</label>
                  <input
                    type="date"
                    defaultValue={accountInfo.NgaySinh ? accountInfo.NgaySinh.split('T')[0] : ''}
                    className='input-info mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                    placeholder="Nhập ngày sinh"
                  />
                </div>
                <div className="form-group">
                  <label className="text-white">Số điện thoại</label>
                  <input
                    type="text"
                    defaultValue={accountInfo.SDT}
                    className='input-info mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                <div className="form-group">
                  <label className="text-white">Email</label>
                  <input
                    type="email"
                    defaultValue={accountInfo.Email}
                    className='input-info mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                    placeholder="Nhập email"
                  />
                </div>
                <div className="form-group">
                  <label className="text-white">Địa chỉ</label>
                  <input
                    type="text"
                    defaultValue={accountInfo.DiaChi}
                    className='input-info mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                    placeholder="Nhập địa chỉ"
                  />
                </div>
                <div className="form-group">
                  <label className="text-white">Tên đăng nhập</label>
                  <input
                    type="text"
                    defaultValue={accountInfo.TenDangNhap}
                    readOnly
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
                <div className="form-group mt-4">
                  <label className="text-white">Mật khẩu cũ</label>
                  <input
                    type="password"
                    className='input-info mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                    placeholder="Nhập mật khẩu cũ"
                  />
                </div>
                <div className="form-group mt-4">
                  <label className="text-white">Mật khẩu mới</label>
                  <input
                    type="password"
                    className='input-info mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                    placeholder="Nhập mật khẩu mới"
                  />
                </div>
                <div className="form-group mt-4">
                  <label className="text-white">Xác nhận mật khẩu mới</label>
                  <input
                    type="password"
                    className='input-info mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                    placeholder="Xác nhận mật khẩu mới"
                  />
                </div>
                <button className="mt-4 bg-[#F5CF49] text-[#000000] py-2 px-4 rounded-lg w-full">Đổi mật khẩu</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;