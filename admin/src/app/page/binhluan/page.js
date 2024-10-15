"use client";
import React, { useState } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const BinhLuan = () => {
  const [binhluan, setBinhLuan] = useState([
    {
      id: 1,
      NoiDung: "Phim hay",
      NgayBinhLuan: "26-09-2024",
      IdPhim: 1,
      IdTaiKhoan: 1,
    },
    {
      id: 2,
      NoiDung: "Phim rất hấp dẫn",
      NgayBinhLuan: "27-09-2024",
      IdPhim: 2,
      IdTaiKhoan: 2,
    },
    {
      id: 3,
      NoiDung: "Kỹ xảo đẹp mắt",
      NgayBinhLuan: "28-09-2024",
      IdPhim: 3,
      IdTaiKhoan: 3,
    },
  ]);

  const handleDelete = (id) => {
    setBinhLuan(binhluan.filter((comment) => comment.id !== id));
  };

  return (
    <main className="app-content">
      <Head>
        <title>Danh sách bình luận</title>
      </Head>
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#">
              <b>Danh sách bình luận</b>
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
                    href="/form-add-comment"
                    title="Thêm"
                  >
                    <i className="fas fa-plus"></i> Tạo mới bình luận
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
                    <th>Mã bình luận</th>
                    <th>Nội dung</th>
                    <th>Ngày bình luận</th>
                    <th>Mã phim</th>
                    <th>Mã tài khoản</th>
                    <th width="100">Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {binhluan.map((binhluan) => (
                    <tr key={binhluan.id}>
                      <td>{binhluan.id}</td>
                      <td>{binhluan.NoiDung}</td>
                      <td>{binhluan.NgayBinhLuan}</td>
                      <td>{binhluan.IdPhim}</td>
                      <td>{binhluan.IdTaiKhoan}</td>
                      <td className="table-td-center">
                        <button
                          className="btn btn-primary btn-sm trash"
                          type="button"
                          title="Xóa"
                          onClick={() => handleDelete(binhluan.id)}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            bounce
                            style={{ color: "#de0400" }}
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
                            bounce
                            style={{ color: "#f59d39" }}
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

export default BinhLuan;
