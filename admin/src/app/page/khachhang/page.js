'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const KhachHang = () => {
  const [khachhang, setKhachhang] = useState([
    {
      id: 1,
      Ten: "Nguyễn Thái Sơn",
      Anh: "nginhphong.jpg",
      DiaChi: "Nhà xí",
      SDT: "0123456789",
      NgaySinh: "29/10/2004",
    },
    {
      id: 2,
      Ten: "Ngô Chí Toàn",
      Anh: "toan.jpg",
      DiaChi: "Thùng rác",
      SDT: "0287529374",
      NgaySinh: "01/01/2004",
    },
    {
      id: 3,
      Ten: "Trương Quang Hoài",
      Anh: "hoai.jpg",
      DiaChi: "Bụi Chuối",
      SDT: "0523846955",
      NgaySinh: "02/02/2004",
    },
    {
      id: 4,
      Ten: "Ngọc Thành",
      Anh: "thanh.jpg",
      DiaChi: "Bụi cỏ",
      SDT: "0265308420",
      NgaySinh: "03/03/2004",
    },
  ]);

  const handleDelete = (id) => {
    setKhachhang(khachhang.filter((kh) => kh.id !== id));
  };

  return (
    <main className="app-content">
      <Head>
        <title>Danh sách khách hàng</title>
      </Head>
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active"><a href="#"><b>Danh sách khách hàng</b></a></li>
        </ul>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <div className="row element-button">
                <div className="col-sm-2">
                  <a className="btn btn-add btn-sm" href="/form-add-customer" title="Thêm">
                    <i className="fas fa-plus"></i> Tạo mới khách hàng
                  </a>
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
                    <tr key={kh.id}>
                      <td>{kh.id}</td>
                      <td>{kh.Ten}</td>
                      <td>
                        <img src={kh.Anh} alt={kh.Ten} style={{ height: '74px', width: '50px' }} />
                      </td>
                      <td>{kh.DiaChi}</td>
                      <td>{kh.SDT}</td>
                      <td>{kh.NgaySinh}</td>
                      <td className="table-td-center">
                        <button
                          className="btn btn-primary btn-sm trash"
                          type="button"
                          title="Xóa"
                          onClick={() => handleDelete(kh.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} bounce style={{ color: "#de0400" }} />
                        </button>
                        <button
                          className="btn btn-primary btn-sm edit"
                          type="button"
                          title="Sửa"
                          data-toggle="modal"
                          data-target="#ModalUP"
                        >
                          <FontAwesomeIcon icon={faPenToSquare} bounce style={{ color: "#f59d39" }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default KhachHang;
