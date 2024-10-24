"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const Ve = () => {
  const [Ve, setVe] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/ve/tickets"); // API đã cập nhật
        const data = await response.json();
        setVe(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/ve/tickets/${id}`, {
        method: "DELETE",
      });
      setVe(Ve.filter((ve) => ve.id !== id)); // Cập nhật lại sau khi xóa
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  return (
    <main className="app-content">
      <Head>
        <title>Danh sách vé</title>
      </Head>
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#">
              <b>Danh sách vé</b>
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
                    href="/page/themve"
                    title="Thêm"
                  >
                    <i className="fas fa-plus"></i> Tạo mới vé
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
                    <th>Mã vé</th>
                    <th>Khách hàng</th>
                    <th>Ảnh</th>
                    <th>Số điện thoại</th>
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
                      <td>{ve.KhachHang.Ten}</td>{" "}
                      {/* Hiển thị tên khách hàng */}
                      <td>
                        {ve.KhachHang.Anh ? (
                          <img
                          
                            src={`/images/user/${ve.KhachHang.Anh}`}
                            alt={ve.KhachHang.Ten}
                            style={{ width: "50px", height: "50px" }}
                          />
                        ) : (
                          "Không có ảnh"
                        )}
                      </td>{" "}
                      {/* Hiển thị email */}
                      <td>{ve.KhachHang.SDT}</td> {/* Hiển thị số điện thoại */}
                      <td>{ve.SoLuong}</td>
                      <td>
                        {ve.GiaVe
                          ? ve.GiaVe.toLocaleString() + " VND"
                          : "N/A"}
                      </td>
                      <td>{ve.TrangThai}</td>
                      <td className="table-td-center">
                        <button
                          className="btn btn-primary btn-sm trash"
                          type="button"
                          title="Xóa"
                          onClick={() => handleDelete(ve.id)}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
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

export default Ve;
