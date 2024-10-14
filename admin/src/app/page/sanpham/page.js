'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'; // Import the required icons

const SanPham = () => {
  const [sanpham, setSanPham] = useState([
    {
      id: '1',
      name: 'CÁM',
      status: 'đang chiếu',
      category: 'Kinh dị',
      description: 'Mô tả sản phẩm',
      image: '/img-sanpham/cam.jpg',
    },
    {
        id: '2',
        name: 'Transformers-one',
        status: 'đang chiếu',
        category: 'Hành động',
        description: 'Mô tả sản phẩm',
        image: '/img-sanpham/transformers-one.jpg',
      },
  ]);

  const handleDelete = (id) => {
    setSanPham(sanpham.filter((product) => product.id !== id));
  };

  return (
    <main className="app-content">
      <Head>
        <title>Danh sách sản phẩm</title>
      </Head>
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active"><a href="#"><b>Danh sách sản phẩm</b></a></li>
        </ul>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <div className="row element-button">
                <div className="col-sm-2">
                  <a className="btn btn-add btn-sm" href="/form-add-product" title="Thêm">
                    <i className="fas fa-plus"></i> Tạo mới sản phẩm
                  </a>
                </div>
              </div>
              <table className="table table-hover table-bordered" cellPadding="0" cellSpacing="0" border="0" id="sampleTable">
                <thead>
                  <tr>
                    <th>Mã phim</th>
                    <th>Tên phim</th>
                    <th>Ảnh phim</th>
                    <th>Tình trạng</th>
                    <th>Thể loại</th>
                    <th>Mô tả</th>
                    <th width="100">Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {sanpham.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>
                        <img src={product.image} alt={product.name} style={{ height: '74px', width: '50px' }} />
                      </td>
                      <td>{product.status}</td>
                      <td>{product.category}</td>
                      <td>{product.description}</td>
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

export default SanPham;
