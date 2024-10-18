"use client"; // Đảm bảo rằng đây là một component client
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Thay đổi từ 'next/router' thành 'next/navigation'

const AddCustomer = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState(''); // Thêm state cho ngày sinh
  const [imageFile, setImageFile] = useState(null); // Thêm state cho ảnh
  const router = useRouter(); // Khai báo useRouter

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Lưu ảnh vào state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Ten', name);
    formData.append('DiaChi', address);
    formData.append('SDT', phone);
    formData.append('NgaySinh', dob);
    formData.append('avatar', imageFile); // Thêm ảnh vào form data

    const response = await fetch('http://localhost:3000/khachhang', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Khách hàng đã được thêm thành công!');
      router.push('/page/khachhang'); // Chuyển hướng về trang danh sách khách hàng
    } else {
      alert('Đã có lỗi xảy ra khi thêm khách hàng.');
    }
  };

  return (
    <div className="app-content">
      <div className="app-title">
        <h1>Thêm Khách Hàng</h1>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <h3 className="tile-title">Tạo Mới Khách Hàng</h3>
            <div className="tile-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="customerName">Họ và Tên</label>
                  <input
                    className="form-control"
                    id="customerName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="customerAddress">Địa Chỉ</label>
                  <input
                    className="form-control"
                    id="customerAddress"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="customerPhone">Số Điện Thoại</label>
                  <input
                    className="form-control"
                    id="customerPhone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="customerDob">Ngày Sinh</label>
                  <input
                    className="form-control"
                    id="customerDob"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="customerImage">Ảnh</label>
                  <input
                    className="form-control"
                    id="customerImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                </div>
                <button className="btn btn-save" type="submit">Lưu lại</button>
                <button className="btn btn-cancel" type="button" onClick={() => router.push('/page/khachhang')}>Hủy bỏ</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;