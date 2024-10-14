'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Rap = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      TenRap: "Rạp ScreenTime Quận 12",
      ViTri: "Vincom Center, Quận 12, TP.HCM",
      PhongChieu: [
        {
          id: "screenId1",
          TenPhongChieu: "Phòng chiếu 1",
          SoLuongGhe: 50,
        //   Ghe: [
        //     { id: 1, SoGhe: "A1", TrangThai: "Trống" },
        //     { id: 2, SoGhe: "A2", TrangThai: "Đã đặt" },
        //   ],
        },
      ],
    },
    {
      id: 2,
      TenRap: "Rạp ScreenTime Quận 12",
      ViTri: "Vincom Center, Quận 12, TP.HCM",
      PhongChieu: [
        {
          id: "screenId2",
          TenPhongChieu: "Phòng chiếu 2",
          SoLuongGhe: 70,
        //   Ghe: [
        //     { id: 1, SoGhe: "B1", TrangThai: "Trống" },
        //     { id: 2, SoGhe: "B2", TrangThai: "Đã đặt" },
        //   ],
        },
      ],
    },
  ]);

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <main className="app-content">
      <Head>
        <title>Danh sách rạp chiếu phim</title>
      </Head>
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#"><b>Danh sách rạp chiếu phim</b></a>
          </li>
        </ul>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <div className="row element-button">
                <div className="col-sm-2">
                  <a className="btn btn-add btn-sm" href="/form-add-product" title="Thêm">
                    <i className="fas fa-plus"></i> Tạo mới rạp chiếu phim
                  </a>
                </div>
              </div>
              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th>Mã rạp</th>
                    <th>Tên rạp</th>
                    <th>Vị trí</th>
                    <th>Số phòng chiếu</th>
                    <th>Số ghế</th>
                    <th>Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.TenRap}</td>
                      <td>{product.ViTri}</td>
                      <td>{product.PhongChieu.length}</td>
                      <td>{product.PhongChieu[0].SoLuongGhe}</td>
                     
                      <td className="table-td-center">
                        <button
                          className="btn btn-primary btn-sm trash"
                          type="button"
                          title="Xóa"
                          onClick={() => handleDelete(product.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} bounce style={{ color: "#de0400" }} />
                        </button>
                        <button
                          className="btn btn-primary btn-sm edit"
                          type="button"
                          title="Sửa"
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

export default Rap;
