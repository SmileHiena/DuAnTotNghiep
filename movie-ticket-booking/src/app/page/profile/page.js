'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faMapLocationDot, faPhone, faEnvelope,faCakeCandles , faEdit, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Profile = () => {
  const [accountInfo, setAccountInfo] = useState({});
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const toggleOrderDetails = () => {
    setShowOrderDetails(!showOrderDetails);
  };

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
    <section className="flex flex-col justify-center items-center w-full px-4">
      <div className="w-full max-w-[1410px]">
        <div className="relative h-[300px] bg-cover bg-center border-3 border-white mb-4" style={{ backgroundImage: "url('../images/background.png')" }}></div>
        <div className="relative -mt-20 flex ml-20">
        <div className="flex flex-col items-center ml-12" style={{ marginTop: '-20px' }}>
    <img 
      src={`http://localhost:3000/images/${accountInfo.Anh}`} // Đường dẫn tới hình ảnh
      alt="Profile" 
      className="rounded-full w-36 h-36 border-5 border-white object-cover " 
    />
    <div className="flex justify-center mt-1">
    <h2 className="text-3xl font-semibold text-white">{accountInfo.Ten}</h2> {/* Đặt màu chữ thành trắng */}

    </div>
  </div>
</div>

        <div className="flex flex-col md:flex-row justify-between mt-5 mb-8 gap-4">
          <div className="w-full md:w-1/3 h-auto p-6 bg-gray-700">
            <h2 className="text-2xl text-center text-white font-semibold">THÔNG TIN KHÁCH HÀNG</h2>
            <div className="flex items-center ">
              <FontAwesomeIcon icon={faUser} className="mr-2 text-white" style={{ width: '20px', height: '20px' }} />
              <p className="text-white" style={{ marginTop: '20px' }}><strong>Họ và Tên:</strong> {accountInfo.Ten}</p>
            </div>
            <div className="flex items-center ">
              <FontAwesomeIcon icon={faPhone} className="mr-2 text-white" style={{ width: '20px', height: '20px' }} />
              <p className="text-white" style={{ marginTop: '20px' }}><strong>SĐT:</strong> {accountInfo.SDT}</p>
            </div>
            <div className="flex items-center ">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-white" style={{ width: '20px', height: '20px' }} />
              <p className="text-white" style={{ marginTop: '20px' }}><strong>Email:</strong> {accountInfo.Email}</p>
            </div>
            <div className="flex items-center ">
  <FontAwesomeIcon icon={faCakeCandles} className="mr-2 text-white" style={{ width: '20px', height: '20px' }} />
  <p className="text-white" style={{ marginTop: '20px' }}> 
    <strong>Ngày sinh:</strong> {new Date(accountInfo.NgaySinh).toLocaleDateString()}
  </p>
</div>



            <div className="flex items-center ">
            <FontAwesomeIcon icon={faMapLocationDot} className="mr-2 text-white" style={{ width: '20px', height: '20px' }} />

              <p className="text-white" style={{ marginTop: '20px' }}><strong>Địa chỉ:</strong> {accountInfo.DiaChi}</p>
            </div>
            <div className="flex justify-between mt-4 flex-col md:flex-row">
              <Link href="/page/editprofile">
                <button className="bg-[#F5CF49] text-[#000000] py-2 px-4 rounded-lg mb-2 md:mb-0 md:mr-2 w-full md:w-auto">
                  <FontAwesomeIcon icon={faEdit} className="mr-1" style={{ width: '20px', height: '20px' }} /> Sửa
                </button>
              </Link>
              <button className="bg-[#F5CF49] text-[#000000] py-2 px-4 rounded-lg w-full md:w-auto">
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" style={{ width: '20px', height: '20px' }} /> Đăng xuất
              </button>
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <h2 className="text-2xl mb-2 text-white font-semibold">ĐƠN HÀNG CỦA BẠN</h2>
            <table className="w-full border-collapse bg-gray-800 text-white">
              <thead>
                <tr>
                  <th className="bg-[#F5CF49] text-[#000000] px-2 py-2">Mã đơn hàng</th>
                  <th className="bg-[#F5CF49] text-[#000000] px-2 py-2">Ngày mua</th>
                  <th className="bg-[#F5CF49] text-[#000000] px-2 py-2">Địa chỉ</th>
                  <th className="bg-[#F5CF49] text-[#000000] px-2 py-2">Trạng thái</th>
                  <th className="bg-[#F5CF49] text-[#000000] px-2 py-2">Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-700">
                  <td className="text-center px-2 py-2">MD12345678</td>
                  <td className="text-center px-2 py-2">10-09-2024</td>
                  <td className="text-center px-2 py-2">Ticket Quận 12, 271 Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, TP Hồ Chí Minh</td>
                  <td className="text-center px-2 py-2">Đã duyệt</td>
                  <td className="text-center px-2 py-2">
                    <button onClick={toggleOrderDetails} className="bg-[#F5CF49] text-[#000000] rounded px-2">chi tiết</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

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