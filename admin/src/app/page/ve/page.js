'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'; // Import the required icons

const Ve = () => {
  const [Ve, setVe] = useState([
    {
      id: '1',
      KhachHang: 'Nguyễn Thái Sơn',
      DonHang: '2 vé đôi',
      SoLuong: 2,
      TongTien: 120000,
      TinhTrang: 'Hoàn Thành',
    },
    {
      id: '2',
      KhachHang: 'Ngô Chí Toàn',
      DonHang: 'Combo 2, 2 vé đơn',
      SoLuong: 1,
      TongTien: 300000,
      TinhTrang: 'Hoàn Thành',
    },
    {
      id: '3',
      KhachHang: 'Trương Quang Hoài',
      DonHang: 'Combo 1, 2 vé đơn',
      SoLuong: 2,
      TongTien: 450000,
      TinhTrang: 'Chưa Thanh Toán',
    },
    {
      id: '4',
      KhachHang: 'Ngọc Thành',
      DonHang: 'Combo 4, 2 vé đơn',
      SoLuong: 3,
      TongTien: 70000,
      TinhTrang: 'Đã Hủy',
    },
  ]);

  const handleDelete = (id) => {
    setVe(Ve.filter((ve) => ve.id !== id));
  };

  return (
    <main className="app-content">
      <Head>
        <title>Danh sách vé</title>
      </Head>
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active"><a href="#"><b>Danh sách vé</b></a></li>
        </ul>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <div className="row element-button">
                <div className="col-sm-2">
                  <a className="btn btn-add btn-sm" href="/form-add-ticket" title="Thêm">
                    <i className="fas fa-plus"></i> Tạo mới vé
                  </a>
                </div>
              </div>
              <table className="table table-hover table-bordered" cellPadding="0" cellSpacing="0" border="0" id="sampleTable">
                <thead>
                  <tr>
                    <th>Mã vé</th>
                    <th>Khách hàng</th>
                    <th>Đơn hàng</th>
                    <th>Số lượng</th>
                    <th>Tổng tiền (VND)</th>
                    <th>Tình trạng</th>
                    <th width="100">Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {Ve.map((ve) => (
                    <tr key={ve.id}>
                      <td>{ve.id}</td>
                      <td>{ve.KhachHang}</td>
                      <td>{ve.DonHang}</td>
                      <td>{ve.SoLuong}</td>
                      <td>{ve.TongTien.toLocaleString()} VND</td>
                      <td>{ve.TinhTrang}</td>
                      <td className="table-td-center">
                        <button
                          className="btn btn-primary btn-sm trash"
                          type="button"
                          title="Xóa"
                          onClick={() => handleDelete(ve.id)}
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

export default Ve;
