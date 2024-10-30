"use client";

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMapLocationDot, faPhone, faEnvelope, faArrowLeft, faCakeCandles, faEdit, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const EditProfile = () => {
  const [accountInfo, setAccountInfo] = useState({});
  const [updatedInfo, setUpdatedInfo] = useState({});
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
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
            setUpdatedInfo(data); // Initialize updatedInfo with current account info
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

  const handleSave = async (e) => {
    e.preventDefault();
    const token = document.cookie.split(';').find(c => c.trim().startsWith('token='));
    const tokenValue = token?.split('=')[1];

    if (tokenValue) {
      try {
        const response = await fetch(`http://localhost:3000/users/updateUser/${accountInfo.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${tokenValue}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedInfo)
        });

        if (response.ok) {
          alert("Cập nhật thông tin thành công!");
          window.location.reload();
          setAccountInfo(updatedInfo); // Update accountInfo with the new info
        } else {
          console.error("Update failed");
          alert("Cập nhật không thành công. Vui lòng thử lại.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    const tokenValue = document.cookie.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1];

    if (tokenValue) {
      try {
        const response = await fetch(`http://localhost:3000/users/updatepassword/${accountInfo.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${tokenValue}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            oldPassword,
            newPassword
          })
        });

        if (response.ok) {
          alert("Đổi mật khẩu thành công!");
          // Xóa các giá trị trong form sau khi thành công
          setOldPassword('');
          setNewPassword('');
          setConfirmPassword('');
        } else {
          console.error("Update failed");
          const data = await response.json();
          alert(data.message || "Đổi mật khẩu không thành công. Vui lòng thử lại.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
      }
    }
  };



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting..."); 
    const formData = new FormData();
    formData.append("Anh", selectedFile);

    try {
      const response = await fetch(`http://localhost:3000/users/updateprofilepicture/${accountInfo.id}`, {
        method: "PUT",
        body: formData,
      });
      if (!selectedFile) {
        console.log("No file selected."); // Kiểm tra xem có file đã được chọn không
        return;
      }
      

      if (!response.ok) {
        alert("Đã xảy ra lỗi trong quá trình cập nhật ảnh.");
      }

      const data = await response.json();
      alert("Đổi ảnh thành công!");
      window.location.reload();
      console.log(data.message); // Thông báo thành công
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex justify-center items-center w-full px-4">
      <div className="w-full max-w-[1410px]">
        <div className="relative h-[300px] bg-cover bg-center border-3 border-white mb-4" style={{ backgroundImage: "url('../images/background.png')" }}>
        </div>
    <div className="flex ml-12" style={{ marginTop: '-100px', marginLeft: '150px' }}>
      <form className="relative" onSubmit={handleSubmit}>
        <img 
          src={`http://localhost:3000/images/${accountInfo.Anh}`} 
          alt="Profile" 
          className="rounded-full w-36 h-36 border-5 border-white object-cover ml-3 bor" 
          style={{ zIndex: '99999', filter: 'blur(3px)' }}
        />
            <label 
            htmlFor="Anh" 
            className="text-[#ffff] text-xl absolute top-12 mt-3  "  style={{ marginLeft: '40px'}}
          >
            Chọn ảnh
          </label>
        <input 
          id="Anh" 
          type="file" 
          accept="image/*" 
          className="hidden"
          onChange={handleFileChange}
        />
        <button type="submit" className="mt-4 bg-[#F5CF49] text-[#000000] py-2 px-5 rounded-lg" style={{ zIndex: '99999' }}>
          Lưu ảnh
        </button>
        
      </form>
    </div>

        <div className="flex flex-col md:flex-row justify-between mt-5 mb-8 gap-4">
          <div className="w-full md:w-1/3 h-auto p-6 bg-gray-700">
            <h2 className="text-2xl text-center text-white font-semibold">THÔNG TIN KHÁCH HÀNG</h2>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="mr-2 text-white" style={{ width: '20px', height: '20px' }} />
              <p className="text-white" style={{ marginTop: '20px' }}><strong>Họ và Tên:</strong> {accountInfo.Ten}</p>
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
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="text-white" htmlFor="Ten">Họ và Tên:</label>
                  <input 
                    type="text" 
                    name="Ten" 
                    id="Ten" 
                    value={updatedInfo.Ten || ''} 
                    onChange={handleChange} 
                    className="w-full p-2 rounded-md"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="text-white" htmlFor="sdt">SĐT:</label>
                  <input 
                    type="text" 
                    name="SDT" 
                    id="sdt" 
                    value={updatedInfo.SDT || ''} 
                    onChange={handleChange} 
                    className="w-full p-2 rounded-md"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="text-white" htmlFor="email">Email:</label>
                  <input 
                    type="email" 
                    name="Email" 
                    id="email" 
                    value={updatedInfo.Email || ''} 
                    onChange={handleChange} 
                    className="w-full p-2 rounded-md"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="text-white" htmlFor="ngaysinh">Ngày sinh:</label>
                  <input 
                    type="date" 
                    name="NgaySinh" 
                    id="ngaysinh" 
                    value={updatedInfo.NgaySinh ? new Date(updatedInfo.NgaySinh).toISOString().slice(0, 10) : ''} 
                    onChange={handleChange} 
                    className="w-full p-2 rounded-md"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="text-white" htmlFor="diachi">Địa chỉ:</label>
                  <input 
                    type="text" 
                    name="DiaChi" 
                    id="diachi" 
                    value={updatedInfo.DiaChi || ''} 
                    onChange={handleChange} 
                    className="w-full p-2 rounded-md"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="bg-[#F5CF49] text-[#000000] py-2 px-4 rounded-lg mt-4 w-full">
                Cập nhật
              </button>
            </form>

            <h2 className="text-2xl mb-2 text-white font-semibold mt-8">ĐỔI MẬT KHẨU</h2>
            <form onSubmit={handlePasswordChange}>
              <div className="grid grid-cols-1 gap-4">
                <div className="form-group">
                  <label className="text-white" htmlFor="oldPassword">Mật khẩu cũ:</label>
                  <input 
                    type="password" 
                    id="oldPassword" 
                    value={oldPassword} 
                    onChange={(e) => setOldPassword(e.target.value)} 
                    className="w-full p-2 rounded-md"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="text-white" htmlFor="newPassword">Mật khẩu mới:</label>
                  <input 
                    type="password" 
                    id="newPassword" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    className="w-full p-2 rounded-md"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="text-white" htmlFor="confirmPassword">Xác nhận mật khẩu mới:</label>
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    className="w-full p-2 rounded-md"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="bg-[#F5CF49] text-[#000000] py-2 px-4 rounded-lg mt-4 w-full">
                Đổi mật khẩu
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
