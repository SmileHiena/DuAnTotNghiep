"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap"; // Import Bootstrap modal

const SanPham = () => {
  const [sanpham, setSanPham] = useState([]);
  const [selectedPhim, setSelectedPhim] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa phim này không?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/sanpham/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete product: ${errorText}`);
      }

      setSanPham(sanpham.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Delete failed:", error.message);
    }
  };

  const handleShowMore = (phim) => {
    setSelectedPhim(phim);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPhim(null);
  };

  // Function to truncate ThongTinPhim
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
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
              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th>Mã phim</th>
                    <th>Tên phim</th>
                    <th>Ảnh phim</th>
                    <th>Tình trạng</th>
                    <th>Thể loại</th>
                    <th>Thời lượng</th>
                    <th>Quốc gia</th>
                    <th>Ngôn ngữ</th>
                    <th>Khuyến cáo</th>
                    <th>Đạo diễn</th>
                    <th>Diễn viên</th>
                    <th>Ngày khởi chiếu</th>
                    <th>Nội dung</th>
                    <th>Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {sanpham.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.Ten}</td>
                      <td>
                        <img src={product.Anh} alt={product.Ten} />
                      </td>
                      <td>
                        <span className="status-badge">
                          {product.TrangThai}
                        </span>
                      </td>
                      <td>{product.TheLoai.KieuPhim}</td>
                      <td>{product.TheLoai.ThoiLuong}</td>
                      <td>{product.TheLoai.QuocGia}</td>
                      <td>{product.TheLoai.NgonNgu}</td>
                      <td>{product.TheLoai.KhuyenCao}</td>
                      <td>{product.MoTa.DaoDien}</td>
                      <td>{product.MoTa.DienVien}</td>
                      <td>{product.MoTa.NgayKhoiChieu}</td>
                      <td>
                        {truncateText(product.ThongTinPhim, 100)}{" "}
                        <button
                          className="btn btn-link"
                          onClick={() => handleShowMore(product)}
                        >
                          Xem thêm
                        </button>
                      </td>
                      <td className="table-td-center">
                        <button
                          className="btn btn-primary btn-sm trash"
                          type="button"
                          title="Xóa"
                          onClick={() => handleDelete(product.id)}
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

      {/* Modal to show full ThongTinPhim */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPhim?.Ten}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedPhim?.ThongTinPhim}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default SanPham;