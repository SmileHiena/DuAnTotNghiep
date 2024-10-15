'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'; // Import the required icons

const TheLoai = () => {
  const [theloai, setTheloai] = useState([
    {
      id: 1,
      Ten: 'Tình Cảm',
      Anh: '/images/tinhcam.jpg',
    },
    {
      id: 2,
      Ten: 'Kinh Dị',
      Anh: '/images/theloaikinhdi.jpg',
    },
    {
      id: 3,
      Ten: 'Hài Hước',
      Anh: '/images/theloaihaihuoc.jpg',
    },
    {
      id: 4,
      Ten: 'Trinh Thám',
      Anh: '/images/theloaitrinhtham.jpg',
    },
    {
      id: 5,
      Ten: 'Anime',
      Anh: '/images/theloaianime.jpg',
    },
  ]);

  const handleDelete = (id) => {
    setTheloai(theloai.filter((item) => item.id !== id));
  };

  return (
    <main className="app-content">
      <Head>
        <title>Danh sách thể loại</title>
      </Head>
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#"><b>Danh sách thể loại</b></a>
          </li>
        </ul>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <div className="row element-button">
                <div className="col-sm-2">
                  <a className="btn btn-add btn-sm" href="/form-add-category" title="Thêm">
                    <i className="fas fa-plus"></i> Tạo mới thể loại
                  </a>
                </div>
              </div>
              <table className="table table-hover table-bordered" cellPadding="0" cellSpacing="0" border="0" id="sampleTable">
                <thead>
                  <tr>
                    <th>Mã thể loại</th>
                    <th>Tên thể loại</th>
                    <th>Ảnh thể loại</th>
                    <th width="100">Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {theloai.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.Ten}</td>
                      <td>
                        <img src={item.Anh} alt={item.Ten} style={{ height: '74px', width: '50px' }} />
                      </td>
                      <td className="table-td-center">
                        <button
                          className="btn btn-primary btn-sm trash"
                          type="button"
                          title="Xóa"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} bounce style={{color: "#de0400",}} />
                        </button>
                        <button
                          className="btn btn-primary btn-sm edit"
                          type="button"
                          title="Sửa"
                          data-toggle="modal"
                          data-target="#ModalUP"
                        >
                          <FontAwesomeIcon icon={faPenToSquare} bounce style={{ color: '#f59d39' }} />
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

export default TheLoai;
