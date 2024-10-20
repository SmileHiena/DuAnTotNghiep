'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

const ThemCombo = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    TenCombo: '',
    NoiDung: '',
    Gia: '',
    Anh: null,
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
      const response = await fetch('http://localhost:3000/combo/add', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorResult = await response.json();
        console.error('Lỗi từ server:', errorResult);
        setStatusMessage(`Có lỗi xảy ra: ${errorResult.message || 'Vui lòng thử lại sau.'}`);
        return;
      }

      const result = await response.json();
      setStatusMessage(result.message);

      // Chuyển hướng về trang danh sách combo sau khi lưu thành công
      router.push('/page/combo');

      // Reset form sau khi thành công
      setFormData({
        TenCombo: '',
        NoiDung: '',
        Gia: '',
        Anh: null,
      });
    } catch (error) {
      console.error('Có lỗi xảy ra khi gửi yêu cầu:', error);
      setStatusMessage('Có lỗi xảy ra khi gửi yêu cầu, vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Thêm combo</title>
      </Head>
      <main className="app-content">
        <div className="app-title">
          <h1>Thêm combo mới</h1>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <h3 className="tile-title">Tạo mới combo</h3>
              <div className="tile-body">
                <form className="row" onSubmit={handleSubmit}>
                  <div className="form-group col-md-4">
                    <label className="control-label">Tên combo</label>
                    <input className="form-control" type="text" name="TenCombo" onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Nội dung</label>
                    <input className="form-control" type="text" name="NoiDung" onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Giá</label>
                    <input className="form-control" type="number" name="Gia" onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Ảnh</label>
                    <input type="file" name="Anh" onChange={handleChange} required />
                  </div>
                  <div className="form-group col-md-12">
                    <button className="btn btn-save mr-3" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Đang lưu...' : 'Lưu lại'}
                    </button>
                    <a className="btn btn-cancel" href="/page/combo">Hủy bỏ</a>
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

export default ThemCombo;
