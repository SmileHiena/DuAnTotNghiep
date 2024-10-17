"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons"; // Import the required icons

const SanPham = () => {
  const [sanpham, setSanPham] = useState([]);
  

  // Fetch sanpham data from the backend API
  useEffect(() => {
    const fetchSanPham = async () => {
      try {
        const response = await fetch("http://localhost:3000/sanpham/"); // Adjust the URL based on your backend setup
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSanPham(data);
      } catch (error) {
        console.error("Failed to fetch sanpham:", error);
      }
    };

    fetchSanPham();
  }, []);

  

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa phim này không?");
    
    if (!confirmDelete) {
      return; 
    }
  
    try {
      const response = await fetch(`http://localhost:3000/sanpham/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Đọc nội dung lỗi từ phản hồi
        throw new Error(`Failed to delete product: ${errorText}`);
      }
  
      setSanPham(sanpham.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Delete failed:", error.message);
    }
  };
  
  

  return (
    <main className="app-content">
      <Head>
        <title>Danh sách sản phẩm</title>
      </Head>
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#">
              <b>Danh sách sản phẩm</b>
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
                    <i className="fas fa-plus"></i> Tạo mới sản phẩm
                  </a>
                </div>
              </div>
              <table
                className="table table-hover table-bordered"
                cellPadding="0"
                cellSpacing="0"
                border="0"
              >
                <thead>
                  <tr>
                    <th>Mã phim</th>
                    <th>Tên phim</th>
                    <th>Ảnh phim</th>
                    <th>Tình trạng</th>
                    <th>Thể loại</th>
                    {/* <th>Mô tả</th> */}
                    <th width="100">Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {sanpham.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.Ten}</td>
                      <td>
                        <img
                          src={product.Anh}
                          alt={product.Ten}
                          style={{ height: "74px", width: "55px" }}
                        />
                      </td>
                      <td className="text-[#02790C] h-[100px] text-center flex items-center justify-center">
                        <span className="w-[80px] h-[34px] bg-[#BFEFC4] flex items-center justify-center rounded-lg">
                          {product.TrangThai}
                        </span>
                      </td>

                      <td>{product.TheLoai.KieuPhim}</td>
                      {/* <td>{product.ThongTinPhim}</td> */}
                      <td className="table-td-center">
                        <button
                          className="btn btn-primary btn-sm trash"
                          type="button"
                          title="Xóa"
                          onClick={() => handleDelete(product.id)}
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

export default SanPham;