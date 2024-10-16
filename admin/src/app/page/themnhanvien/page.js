'use client';
import React, { useState } from 'react';
import Head from 'next/head';

const ThemNhanVien = () => {
  const [formData, setFormData] = useState({
    HoTen: '',
    TenDangNhap: '',
    MatKhau: '',
    Anh: null, // Dữ liệu ảnh sẽ được xử lý riêng
    DiaChi: '',
    NgaySinh: '',
    GioTinh: '',
    SDT: '',
    ChucVu: '',
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:3000/employees/add', { // Đường dẫn đến API của bạn
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorResult = await response.json();
        console.error('Lỗi từ server:', errorResult);
        alert(`Có lỗi xảy ra: ${errorResult.message}`);
        return;
      }

      const result = await response.json();
      alert(result.message);
      // Reset form sau khi thành công (nếu cần)
      setFormData({
        HoTen: '',
        TenDangNhap: '',
        MatKhau: '',
        Anh: null,
        DiaChi: '',
        NgaySinh: '',
        GioTinh: '',
        SDT: '',
        ChucVu: '',
      });
    } catch (error) {
      console.error('Có lỗi xảy ra khi gửi yêu cầu:', error);
      alert('Có lỗi xảy ra khi gửi yêu cầu');
    }
  };

  return (
    <>
      <Head>
        <title>Thêm nhân viên</title>
      </Head>
      <main className="app-content">
        <div className="app-title">
          <h1>Thêm nhân viên mới</h1>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <h3 className="tile-title">Tạo mới nhân viên</h3>
              <div className="tile-body">
                <form className="row" onSubmit={handleSubmit}>
                  <div className="form-group col-md-4">
                    <label className="control-label">Họ và tên</label>
                    <input className="form-control" type="text" name="HoTen" onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Tên đăng nhập</label>
                    <input className="form-control" type="text" name="TenDangNhap" onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Mật khẩu</label>
                    <input className="form-control" type="password" name="MatKhau" onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Ảnh 3x4 nhân viên</label>
                    <input type="file" name="Anh" onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Địa chỉ</label>
                    <input className="form-control" type="text" name="DiaChi" onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Ngày sinh</label>
                    <input className="form-control" type="date" name="NgaySinh" onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Giới tính</label>
                    <select className="form-control" name="GioTinh" onChange={handleChange} required>
                      <option value="">-- Chọn giới tính --</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Số điện thoại</label>
                    <input className="form-control" type="text" name="SDT" onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Chức vụ</label>
                    <input className="form-control" type="text" name="ChucVu" onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-12">
                    <button className="btn btn-save" type="submit">Lưu lại</button>
                    <a className="btn btn-cancel" href="/nhanvien">Hủy bỏ</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ThemNhanVien;
