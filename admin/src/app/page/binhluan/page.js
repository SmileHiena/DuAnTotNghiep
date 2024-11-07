"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BinhLuan = () => {
  const [binhluan, setBinhLuan] = useState([]);

  // Lấy danh sách bình luận từ API
  useEffect(() => {
    const fetchBinhLuan = async () => {
      try {
        const response = await fetch("http://localhost:3000/comments");
        const data = await response.json();
        setBinhLuan(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchBinhLuan();
  }, []);

  // Xóa bình luận trên server và cập nhật danh sách bình luận
  const handleDelete = async (_id) => {
    try {
      await fetch(`http://localhost:3000/comments/${_id}`, {
        method: "DELETE",
      });
      setBinhLuan(binhluan.filter((comment) => comment._id !== _id));
      toast.success("Xóa bình luận thành công!");
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Xóa bình luận thất bại!");
    }
  };

  return (
    <main className="app-content">
      <ToastContainer />
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
                    <th width="100">ID</th>
                    <th>Nội dung</th>
                    <th>Ngày bình luận</th>
                    <th>Mã phim</th>
                    <th>Mã tài khoản</th>
                    <th>Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {binhluan.map((binhluan) => (
                    <tr key={binhluan._id}>
                      <td>{binhluan._id}</td>
                      <td>{binhluan.NoiDung || binhluan.content}</td>
                      <td>{binhluan.NgayBinhLuan || binhluan.timestamp}</td>
                      <td>{binhluan.IdPhim || binhluan.movieId}</td>
                      <td>{binhluan.IdTaiKhoan || binhluan.userId}</td>
                      <td className="table-td-center">
                        <button
                          className="btn btn-primary mr-3 edit"
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
                        <button
                          className="btn btn-primary mr-3 trash"
                          type="button"
                          title="Xóa"
                          onClick={() => handleDelete(binhluan._id)}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{ color: "#de0400" }}
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