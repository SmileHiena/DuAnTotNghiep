import React from 'react';
import '../../../../public/styles/editprofile.css'; // Assuming you have a Profile.css for the styles
import Link from 'next/link';
const EditProfile = () => {
  return (
    <div className="profile-container">
      <div className="frofile-coutumer">

      <div className="cover-photo">
      </div>
        <div className="profile-pictur">
           <div className="img">
            <form>
                <img src="images/frofile/ava.jpg" alt="Profile" />
                <div className="editimg-button">
          <label htmlFor="file-input" className="edit-label">
               Sửa
          </label>
          <input id="file-input" type="file" accept="image" className='input-file'/>
        </div>
            </form>
            </div>
          <h2 className="profile-name"> Phạm Ngọc Trân</h2>
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
                <span className="icon">👤</span>
                <p>Email: <span>toan2211@gmail.com</span></p>
            </div>
            <div className="info-item">
                <span className="icon">📍</span>
                <p>Địa chỉ: Phường 12 TP Hồ Chí Minh</p>
            </div>
            <div className="pro-btn">
                <button className="back-button">quay lại</button>
                <button className="logout-button">Đăng xuất</button>
            </div>
            </div>
            </div>
            <div className="editprofile-content">
            <h1>THÔNG TIN KHÁCH HÀNG</h1>

            {/* Thông tin cá nhân */}
            <div className="personal-info">
            <h2>Thông tin cá nhân</h2>
            <form>
                <div className="colunm-form">
                    <div className="form-group">
                    <label>Họ và tên</label>
                    <input type="text" value="Phạm Ngọc Trân" className='input-info' />
                    </div>
                    <div className="form-group">
                    <label>Ngày sinh</label>
                    <input type="date" value="2004-06-26" className='input-info' />
                    </div>
                </div>
                <div className="colunm-form">
                    <div className="form-group">
                    <label>Số điện thoại</label>
                    <input type="text" value="033554654" className='input-info' />
                    </div>
                    <div className="form-group">
                    <label>Email</label>
                    <input type="email" value="tranpham04@gmail.com" className='input-info'/>
                    </div>
                </div>
                <button className="save-button">Lưu</button>
            </form>
            </div>

            {/* Đổi mật khẩu */}
            <div className="password-change">
            <h2>Đổi mật khẩu</h2>
            <form>
                <div className="form-group">
                <label>Mật khẩu cũ</label>
                <input type="password" />
                </div>
                <div className="form-group">
                <label>Mật khẩu mới</label>
                <input type="password" />
                </div>
                <div className="form-group">
                <label>Xác thực mật khẩu</label>
                <input type="password" />
                </div>
                <button className="save-button">Lưu</button>
            </form>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;