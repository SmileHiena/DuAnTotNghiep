'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'; // Import the required icons

const Combo = () => {
  const [combo, setCombo] = useState([
    {
      id: '1',
      Ten: 'COMBO PARYPARY',
      NoiDung: '2 Bắp Ngọt 60oz + 4 Coke 22oz',
      Gia: 209000,
      image: '/combo/combo1.jpg',
    },
    {
      id: '2',
      Ten: 'COMBO SOLO',
      NoiDung: '1 Bắp Ngọt 60oz + 1 Coke 32oz',
      Gia: 94000,
      image: '/combo/combo2.jpg',
    },
    {
      id: '3',
      Ten: 'COMBO COUPLE',
      NoiDung: '1 Bắp Ngọt 60oz + 2 Coke 32oz',
      Gia: 115000,
      image: '/combo/combo3.jpg',
    },
  ]);

  const handleDelete = (id) => {
    setCombo(combo.filter((item) => item.id !== id));
  };

  return (
    <main className="app-content">
      <Head>
        <title>Danh sách combo</title>
      </Head>
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#">
              <b>Danh sách combo</b>
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
                  <a
                    className="btn btn-add btn-sm"
                    href="/form-add-product"
                    title="Thêm"
                  >
                    <i className="fas fa-plus"></i> Tạo mới combo
                  </a>
                </div>
              </div>
              <table
                className="table table-hover table-bordered"
                cellPadding="0"
                cellSpacing="0"
                border="0"
                id="sampleTable"
              >
                <thead>
                  <tr>
                    <th>Mã combo</th>
                    <th>Tên combo</th>
                    <th>Ảnh combo</th>
                    <th>Nội dung</th>
                    <th>Giá (VND)</th>
                    <th width="100">Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {combo.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.Ten}</td>
                      <td>
                        <img
                          src={item.image}
                          alt={item.Ten}
                          style={{ height: '74px', width: '50px' }}
                        />
                      </td>
                      <td>{item.NoiDung}</td>
                      <td>{item.Gia.toLocaleString()} VND</td>
                      <td className="table-td-center">
                        <button
                          className="btn btn-primary btn-sm trash"
                          type="button"
                          title="Xóa"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{ color: '#de0400' }}
                          />
                        </button>
                        <button
                          className="btn btn-primary btn-sm edit"
                          type="button"
                          title="Sửa"
                          data-toggle="modal"
                          data-target="#ModalUP"
                        >
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            style={{ color: '#f59d39' }}
                          />
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

export default Combo;
