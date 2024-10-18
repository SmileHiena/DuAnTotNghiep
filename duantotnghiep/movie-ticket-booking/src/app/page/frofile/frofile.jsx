"use client";

import React, { useState } from 'react';
import './profile.css'; // Assuming you have a Profile.css for the styles
import Link from 'next/link';

const Profile = () => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const toggleOrderDetails = () => {
    setShowOrderDetails(!showOrderDetails);
  };

  return (
    <div className="profile-container">
      <div className="frofile-coutumer">
        <div className="cover-photo"></div>
        <div className="profile-picture">
          <img src="images/frofile/ava.jpg" alt="Profile" />
          <h2 className="profile-name">Phạm Ngọc Trân</h2>
        </div>
        <div className="profile-content">
          <div className="customer-info">
            <div className="info-coutumer">
              <h2>THÔNG TIN KHÁCH HÀNG</h2>
              <div className="info-item">
                <span className="icon">👤</span>
                <p>Họ tên: Phạm Ngọc Trân</p>
              </div>
              <div className="info-item">
                <span className="icon">📞</span>
                <p>Số ĐT: 0336870210</p>
              </div>
              <div className="info-item">
                <span className="icon">📍</span>
                <p>Email: example@email.com</p>
              </div>
              <div className="pro-btn">
                <button className="edit-button">Sửa thông tin</button>
                <button className="logout-button">Đăng xuất</button>
              </div>
            </div>

            {showOrderDetails && (
              <div className="order-box">
                <h2 className='infor-card'>Thông Tin Đơn Hàng</h2>
                <p><strong>Mã Đơn Hàng:</strong> ORD-20241015-12345</p>
                <p><strong>Ngày Đặt Hàng:</strong> 15/10/2024</p>

                <h3>Thông Tin Vé Xem Phim</h3>
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

          <div className="order-info">
            <h2>ĐƠN HÀNG CỦA BẠN</h2>
            <table className="order-table">
              <thead>
                <tr>
                  <th>Mã đơn hàng</th>
                  <th>Ngày mua</th>
                  <th>Địa chỉ</th>
                  <th>Trạng thái</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                <tr className="info-oder">
                  <th>MD12345678</th>
                  <th>10-09-2024</th>
                  <th>Ticket Quận 12, 271 Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, TP Hồ Chí Minh</th>
                  <th>Đã duyệt</th>
                  <th className="detail-oder">
                    <p onClick={toggleOrderDetails}>xem chi tiết</p>
                  </th>
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
