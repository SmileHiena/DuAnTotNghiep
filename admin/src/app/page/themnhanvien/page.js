'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation'; // Sử dụng next/navigation

const ThemNhanVien = () => {
  const router = useRouter(); // Khởi tạo router
  const [formData, setFormData] = useState({
    HoTen: '',
    TenDangNhap: '',
    MatKhau: '',
    Anh: null,
    DiaChi: '',
    NgaySinh: '',
    GioTinh: '',
    SDT: '',
    ChucVu: '', // Chức vụ
    Tinhtrang: '', // Tình trạng
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    setIsSubmitting(true);
    setStatusMessage('Đang gửi...');

    try {
      const response = await fetch('http://localhost:3000/employees/add', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorResult = await response.json();
        console.error('Lỗi từ server:', errorResult);
        setStatusMessage(`Có lỗi xảy ra: ${errorResult.message}`);
        return;
      }

      const result = await response.json();
      setStatusMessage(result.message);

      // Chuyển hướng về trang danh sách nhân viên sau khi lưu thành công
      router.push('/page/nhanvien');

      // Reset form sau khi thành công
      setFormData({
        HoTen: '',
        TenDangNhap: '',
        MatKhau: '',
        Anh: null,
        DiaChi: '',
        NgaySinh: '',
        GioTinh: '',
        SDT: '',
        ChucVu: '', // Reset trường Chức vụ
        Tinhtrang: '', // Reset trường Tình trạng
      });
    } catch (error) {
      console.error('Có lỗi xảy ra khi gửi yêu cầu:', error);
      setStatusMessage('Có lỗi xảy ra khi gửi yêu cầu');
    } finally {
      setIsSubmitting(false);
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
                    <label className="control-label">Địa chỉ</label>
                    <input className="form-control" type="text" name="DiaChi" onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Ngày sinh</label>
                    <input className="form-control" type="date" name="NgaySinh" onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Số điện thoại</label>
                    <input className="form-control" type="text" name="SDT" onChange={handleChange} required />
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
                    <label className="control-label">Chức vụ</label>
                    <select className="form-control" name="ChucVu" onChange={handleChange} required>
                      <option value="">-- Chọn chức vụ --</option>
                      <option value="Bán hàng">Bán hàng</option>
                      <option value="Tư vấn">Tư vấn</option>
                      <option value="Dịch vụ">Dịch vụ</option>
                      <option value="Thu Ngân">Thu Ngân</option>
                      <option value="Quản kho">Quản kho</option>
                      <option value="Bảo trì">Bảo trì</option>
                      <option value="Kiểm hàng">Kiểm hàng</option>
                      <option value="Bảo vệ">Bảo vệ</option>
                      <option value="Tạp vụ">Tạp vụ</option>
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Tình trạng</label>
                    <select className="form-control" name="Tinhtrang" onChange={handleChange} required>
                      <option value="">-- Chọn tình trạng --</option>
                      <option value="Đang làm">Đang làm</option>
                      <option value="Tạm nghỉ">Tạm nghỉ</option>
                      <option value="Nghỉ việc">Nghỉ việc</option>
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Ảnh 3x4 nhân viên</label>
                    <input type="file" name="Anh" onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-12">
                    <button className="btn btn-save mr-3" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Đang lưu...' : 'Lưu lại'}
                    </button>
                    <a className="btn btn-cancel" href="/page/nhanvien">Hủy bỏ</a>
                  </div>
                </form>
                {statusMessage && <div className="status-message">{statusMessage}</div>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ThemNhanVien;
