'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const KhuyenMai = () => {
  const [khuyenmai, setKhuyenMai] = useState([
    {
      id: 1,
      Ten: "Sinh Nhật 20/10",
      NoiDung: "Khuyến mãi giảm giá khi mua vé tại ScreenTime",
      NgayBatDau: "20/10",
      NgayKetThuc: "22/10",
      TrangThai: "Sắp được áp dụng",
      Anh: "/hay.jpg"
    },
  ]);

  const handleDelete = (id) => {
    setKhuyenMai(khuyenmai.filter((km) => km.id !== id));
  };

  return (
    <main className="app-content">
      <Head>
        <title>Danh sách khuyến mãi</title>
      </Head>
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active"><a href="#"><b>Danh sách khuyến mãi</b></a></li>
        </ul>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <div className="row element-button">
                <div className="col-sm-2">
                  <a className="btn btn-add btn-sm" href="/form-add-promotion" title="Thêm">
                    <i className="fas fa-plus"></i> Tạo mới khuyến mãi
                  </a>
                </div>
              </div>
              <table className="table table-hover table-bordered" cellPadding="0" cellSpacing="0" border="0" id="sampleTable">
                <thead>
                  <tr>
                    <th>Mã khuyến mãi</th>
                    <th>Tên khuyến mãi</th>
                    <th>Ảnh khuyến mãi</th>
                    <th>Nội dung</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th>Trạng thái</th>
                    <th width="100">Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {khuyenmai.map((km) => (
                    <tr key={km.id}>
                      <td>{km.id}</td>
                      <td>{km.Ten}</td>
                      <td>
                        <img src={km.Anh} alt={km.Ten} style={{ height: '74px', width: '50px' }} />
                      </td>
                      <td>{km.NoiDung}</td>
                      <td>{km.NgayBatDau}</td>
                      <td>{km.NgayKetThuc}</td>
                      <td className="text-[#de0400]">{km.TrangThai}</td>
                      <td className="table-td-center">
                        <button
                          className="btn btn-primary btn-sm trash"
                          type="button"
                          title="Xóa"
                          onClick={() => handleDelete(km.id)}
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

export default KhuyenMai;
