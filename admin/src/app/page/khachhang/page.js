// KhachHang.js
"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useRouter } from "next/navigation";

const KhachHang = () => {
  const [khachhang, setKhachhang] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  // Lấy danh sách khách hàng từ server
  useEffect(() => {
    const fetchKhachHang = async () => {
      try {
        const response = await axios.get("http://localhost:3000/khachhang");
        setKhachhang(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khách hàng:", error);
      }
    };

    fetchKhachHang();
  }, []);

  // Xử lý xóa khách hàng
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này không?")) {
      try {
        await axios.delete(`http://localhost:3000/khachhang/${id}`);
        setKhachhang(khachhang.filter((kh) => kh._id !== id));
      } catch (error) {
        console.error("Lỗi khi xóa khách hàng:", error.response?.data || error.message);
      }
    }
  };

  // Chuyển sang chế độ chỉnh sửa
  const handleEdit = (kh) => {
    setSelectedCustomer(kh);
    setIsEditing(true);
    setAvatar(null);
    setSuccessMessage(""); // Reset thông báo thành công khi chỉnh sửa
  };

  // Cập nhật khách hàng sau khi chỉnh sửa
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("Ten", selectedCustomer.Ten);
      formData.append("DiaChi", selectedCustomer.DiaChi);
      formData.append("SDT", selectedCustomer.SDT);
      formData.append("NgaySinh", selectedCustomer.NgaySinh);
      if (avatar) {
        formData.append("avatar", avatar);
      }

      const response = await axios.put(`http://localhost:3000/khachhang/${selectedCustomer._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setKhachhang(khachhang.map((kh) => (kh._id === selectedCustomer._id ? response.data : kh)));
      setIsEditing(false);
      setSelectedCustomer(null);
      setAvatar(null);
      setSuccessMessage("Cập nhật khách hàng thành công!"); // Thông báo thành công
    } catch (error) {
      console.error("Lỗi khi cập nhật khách hàng:", error);
      setSuccessMessage(""); // Reset thông báo thành công
      alert("Cập nhật khách hàng không thành công. Vui lòng thử lại.");
    }
  };

  // Xử lý thay đổi thông tin khi chỉnh sửa
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedCustomer((prev) => ({ ...prev, [name]: value || "" }));
  };

  // Xử lý thay đổi ảnh
  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  return (
    <main className="app-content">
      <Head>
        <title>Danh sách khách hàng</title>
      </Head>
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#">
              <b>Danh sách khách hàng</b>
            </a>
          </li>
        </ul>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <div className="row element-button">
                <div className="col-sm-2">
                  <button
                    className="btn btn-add btn-sm"
                    onClick={() => router.push("/page/addCustomer")}
                    title="Thêm"
                  >
                    <i className="fas fa-plus"></i> Tạo mới khách hàng
                  </button>
                </div>
              </div>
              <table className="table table-hover table-bordered" cellPadding="0" cellSpacing="0" border="0" id="sampleTable">
                <thead>
                  <tr>
                    <th>Mã khách hàng</th>
                    <th>Tên</th>
                    <th>Ảnh</th>
                    <th>Địa chỉ</th>
                    <th>Số điện thoại</th>
                    <th>Ngày sinh</th>
                    <th width="100">Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {khachhang.map((kh) => (
                    <tr key={kh._id}>
                      <td>{kh._id}</td>
                      <td>{kh.Ten}</td>
                      <td>
                        <img src={kh.Anh ? `/images/user/${kh.Anh}` : '/images/default_avatar.png'} alt={kh.Ten} style={{ height: "74px", width: "50px" }} />
                      </td>
                      <td>{kh.DiaChi}</td>
                      <td>{kh.SDT}</td>
                      <td>{kh.NgaySinh}</td>
                      <td className="table-td-center">
                        <button className="btn btn-primary btn-sm trash" type="button" title="Xóa" onClick={() => handleDelete(kh._id)}>
                          <FontAwesomeIcon icon={faTrash} style={{ color: "#de0400" }} />
                        </button>
                        <button className="btn btn-primary btn-sm edit" type="button" title="Chỉnh sửa" onClick={() => handleEdit(kh)}>
                          <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#0081ff" }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {successMessage && <div className="alert alert-success">{successMessage}</div>} {/* Hiển thị thông báo thành công */}
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="edit-modal">
          <h2>Chỉnh sửa khách hàng</h2>
          <input
            type="text"
            name="Ten"
            value={selectedCustomer.Ten || ''}
            onChange={handleChange}
            placeholder="Tên"
          />
          <input
            type="text"
            name="DiaChi"
            value={selectedCustomer.DiaChi || ''}
            onChange={handleChange}
            placeholder="Địa chỉ"
          />
          <input
            type="text"
            name="SDT"
            value={selectedCustomer.SDT || ''}
            onChange={handleChange}
            placeholder="Số điện thoại"
          />
          <input
            type="date"
            name="NgaySinh"
            value={selectedCustomer.NgaySinh || ''}
            onChange={handleChange}
          />
          <input
            type="file"
            onChange={handleAvatarChange}
          />
          <button onClick={handleUpdate}>Cập nhật</button>
          <button onClick={() => setIsEditing(false)}>Hủy</button>
        </div>
      )}
    </main>
  );
};

export default KhachHang;
