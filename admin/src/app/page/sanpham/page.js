"use client";

import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SanPham = () => {
  const router = useRouter();
  const [theloai, setTheloai] = useState([]);
  const [sanPhamList, setSanPhamList] = useState([]);
  const [selectedPhim, setSelectedPhim] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});
  const [editError, setEditError] = useState("");
  const [error, setError] = useState("");

  const notify = () => {
    toast.success('Xóa phim thành công!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const notifyEditSuccess = () => {
    toast.success('Sửa phim thành công!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  useEffect(() => {
    const fetchSanPham = async () => {
      try {
        const response = await fetch("http://localhost:3000/sanpham/");
        if (!response.ok) throw new Error("Failed to fetch products.");
        const data = await response.json();
        setSanPhamList(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchSanPham();
  }, []);

  // Fetch theloai data from the backend API
  useEffect(() => {
    const fetchTheLoai = async () => {
      try {
        const response = await fetch("http://localhost:3000/theloai/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTheloai(data);
      } catch (error) {
        console.error("Lỗi khi lấy thể loại:", error);
      }
    };

    fetchTheLoai();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa phim này không?")) return;

    try {
      const response = await fetch(
        `http://localhost:3000/sanpham/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete product.");

      setSanPhamList((prev) => prev.filter((product) => product._id !== id));
      notify();
    } catch (error) {
      console.error("Delete error:", error);
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

  const handleAddPhim = () => {
    router.push("/page/themsanpham");
  };

  const handleEditProduct = (product) => {
    setEditedProduct(product);
    setShowEditModal(true);
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();
    const { ThoiLuong } = editedProduct;

    if (editedProduct.Anh instanceof File) {
      formData.append("Anh", editedProduct.Anh);
    }

    if (ThoiLuong && isNaN(ThoiLuong)) {
      setEditError("Chỉ được nhập thời lượng là số.");
      return;
    } else {
      setEditError(""); // Clear error if valid
    }

    const newPhim = {
      Ten: editedProduct.Ten,
      TrangThai: editedProduct.TrangThai,
      TheLoai: {
        KieuPhim: editedProduct.TheLoai?.KieuPhim,
        ThoiLuong: editedProduct.TheLoai?.ThoiLuong,
        QuocGia: editedProduct.TheLoai?.QuocGia,
        NgonNgu: editedProduct.TheLoai?.NgonNgu,
        KhuyenCao: editedProduct.TheLoai?.KhuyenCao,
      },
      MoTa: {
        DaoDien: editedProduct.MoTa?.DaoDien,
        DienVien: editedProduct.MoTa?.DienVien,
        NgayKhoiChieu: editedProduct.MoTa?.NgayKhoiChieu,
      },
      ThongTinPhim: editedProduct.ThongTinPhim,
    };

    formData.append("newPhim", JSON.stringify(newPhim));

    try {
      const response = await fetch(
        `http://localhost:3000/sanpham/edit/${editedProduct._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to update product.");

      // Optionally refresh the product list here or handle UI updates
      setShowEditModal(false);
      setEditedProduct({
        _id: "", // Resetting to initial state
        Ten: "",
        TrangThai: "",
        TheLoai: {
          KieuPhim: "",
          ThoiLuong: "",
          QuocGia: "",
          NgonNgu: "",
          KhuyenCao: "",
        },
        MoTa: {
          DaoDien: "",
          DienVien: "",
          NgayKhoiChieu: "",
        },
        ThongTinPhim: "",
      });

      notifyEditSuccess();

      setShowEditModal(false);
      setEditedProduct({});
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  const toggleLockStatus = async (movieId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/sanpham/lock/${movieId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update lock status");
      }

      const data = await response.json();
      alert(`Lock status updated: ${data.locked ? "Locked" : "Unlocked"}`);
    } catch (error) {
      console.error("Error toggling lock status:", error);
      alert("Error updating lock status. Please try again.");
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
            <b>Danh sách sản phẩm</b>
          </li>
        </ul>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <div className="row element-button">
                <div className="col-sm-2">
                  <Button
                    className="btn btn-add btn-sm"
                    onClick={handleAddPhim}
                  >
                    <i className="fas fa-plus"></i> Tạo mới sản phẩm
                  </Button>
                </div>
              </div>
              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th>Mã phim</th>
                    <th>Tên phim</th>
                    <th>Ảnh phim</th>
                    <th>Thể loại</th>
                    <th>Thời lượng</th>
                    <th>Quốc gia</th>
                    <th>Ngôn ngữ</th>
                    <th>Khuyến cáo</th>
                    <th>Đạo diễn</th>
                    <th>Diễn viên</th>
                    <th>Ngày khởi chiếu</th>
                    <th>Tình trạng</th>
                    <th>Nội dung</th>
                    <th>Khóa phim</th>
                    <th>Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {sanPhamList.map((product) => (
                    <tr key={product._id}>
                      <td>{product.id}</td>
                      <td>{product.Ten}</td>
                      <td>
                        <img
                          src={product.Anh}
                          alt={product.Ten}
                          style={{ width: "100px", height: "auto" }}
                        />
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
                        <span className="status-badge">
                          {product.TrangThai}
                        </span>
                      </td>
                      <td>
                        {truncateText(product.ThongTinPhim, 100)}{" "}
                        <button
                          className="btn btn-link"
                          onClick={() => handleShowMore(product)}
                        >
                          Xem thêm
                        </button>
                      </td>
                      <td>
                        <button
                          className=""
                          onClick={() => toggleLockStatus(product._id)}
                        >
                          {product.locked ? "Unlock" : "Lock"} Khóa phim
                        </button>
                      </td>
                      <td className="table-td-center">
                        <button
                          className="btn btn-primary btn-sm trash"
                          type="button"
                          title="Xóa"
                          onClick={() => handleDelete(product._id)}
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
                          onClick={() => handleEditProduct(product)} // Open edit modal
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

      {/* Modal to show more info about the selected phim */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPhim?.Ten}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPhim && (
            <div>
              <img
                src={selectedPhim.Anh}
                alt={selectedPhim.Ten}
                style={{ width: "100%", height: "auto" }}
              />
              <p>{selectedPhim.ThongTinPhim}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* Edit Product Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thông tin sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="form-group col-md-6">
              <label className="control-label">Mã sản phẩm</label>
              <input
                className="form-control"
                type="text"
                value={editedProduct._id || ""}
                readOnly
              />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Tên sản phẩm</label>
              <input
                className="form-control"
                type="text"
                required
                value={editedProduct.Ten || ""}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, Ten: e.target.value })
                }
              />
            </div>

            <div className="form-group col-md-6">
              <label className="control-label">Trạng thái</label>
              <select
                className="form-control"
                required
                value={editedProduct.TrangThai || ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    TrangThai: e.target.value,
                  })
                }
              >
                <option value="">Chọn trạng thái</option>
                <option value="Đang chiếu">Đang chiếu</option>
                <option value="Sắp chiếu">Sắp chiếu</option>
                <option value="Ngừng chiếu">Ngừng chiếu</option>
              </select>
            </div>

            <div className="form-group col-md-6">
              <label className="control-label">Kiểu phim</label>
              <select
                className="form-control"
                required
                value={editedProduct.TheLoai?.KieuPhim || ""}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  setEditedProduct((prev) => ({
                    ...prev,
                    TheLoai: {
                      ...prev.TheLoai,
                      KieuPhim: selectedValue, // Ensure you update KieuPhim
                    },
                  }));
                }}
              >
                {theloai.map((item) => (
                  <option key={item.id} value={item.Ten}>
                    {item.Ten}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group col-md-6">
              <label className="control-label">Thời lượng</label>
              <input
                className="form-control"
                type="number"
                required
                min="0" // Ensure non-negative input
                value={editedProduct.TheLoai?.ThoiLuong || ""}
                onChange={(e) => {
                  const value = e.target.value;

                  // Check if the value is empty
                  if (value === "") {
                    setEditedProduct({
                      ...editedProduct,
                      TheLoai: {
                        ...editedProduct.TheLoai,
                        ThoiLuong: "", // Allow empty input
                      },
                    });
                    setEditError(""); // Clear error for empty input
                  }
                  // Check if the value is a valid number and non-negative
                  else if (!isNaN(value) && Number(value) >= 0) {
                    setEditedProduct({
                      ...editedProduct,
                      TheLoai: {
                        ...editedProduct.TheLoai,
                        ThoiLuong: value,
                      },
                    });
                    setEditError(""); // Clear error if valid
                  } else {
                    setEditError("Chỉ được nhập thời lượng là số dương."); // Error message for invalid input
                  }
                }}
              />
              {editError && <small className="text-danger">{editError}</small>}{" "}
              {/* Display error message */}
            </div>

            <div className="form-group col-md-6">
              <label className="control-label">Quốc Gia</label>
              <select
                className="form-control"
                required
                value={editedProduct.TheLoai?.QuocGia || ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    TheLoai: {
                      ...editedProduct.TheLoai,
                      QuocGia: e.target.value,
                    },
                  })
                }
              >
                <option value="">Chọn quốc gia</option>
                <option value="Việt Nam">Việt Nam</option>
                <option value="Mỹ">Mỹ</option>
                <option value="Nhật Bản">Nhật Bản</option>
                <option value="Hàn Quốc">Hàn Quốc</option>
                <option value="Pháp">Pháp</option>
                <option value="Trung Quốc">Trung Quốc</option>
              </select>
            </div>

            <div className="form-group col-md-6">
              <label className="control-label">Ngôn ngữ</label>
              <select
                className="form-control"
                required
                value={editedProduct.TheLoai?.NgonNgu || ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    TheLoai: {
                      ...editedProduct.TheLoai,
                      NgonNgu: e.target.value,
                    },
                  })
                }
              >
                <option value="">Chọn ngôn ngữ</option>
                <option value="Tiếng Việt">Tiếng Việt</option>
                <option value="Tiếng Anh">Tiếng Anh</option>
                <option value="Tiếng Hàn">Tiếng Hàn</option>
                <option value="Tiếng Nhật">Tiếng Nhật</option>
              </select>
            </div>

            <div className="form-group col-md-6">
              <label className="control-label">Khuyến cáo</label>
              <select
                className="form-control"
                required
                value={editedProduct.TheLoai?.KhuyenCao || ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    TheLoai: {
                      ...editedProduct.TheLoai,
                      KhuyenCao: e.target.value,
                    },
                  })
                }
              >
                <option value="">Chọn khuyến cáo</option>
                <option value="T18: Phim dành cho khán giả từ đủ 16 tuổi trở lên (18+)">
                  T18: Phim dành cho khán giả từ đủ 16 tuổi trở lên (18+)
                </option>
                <option value="T16: Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)">
                  T16: Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)
                </option>
                <option value="T13: Phim dành cho khán giả từ đủ 16 tuổi trở lên (13+)">
                  T13: Phim dành cho khán giả từ đủ 16 tuổi trở lên (13+)
                </option>
              </select>
            </div>

            <div className="form-group col-md-6">
              <label className="control-label">Đạo diễn</label>
              <input
                className="form-control"
                type="text"
                required
                value={editedProduct.MoTa?.DaoDien || ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    MoTa: { ...editedProduct.MoTa, DaoDien: e.target.value },
                  })
                }
              />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Diễn viên</label>
              <input
                className="form-control"
                type="text"
                required
                value={editedProduct.MoTa?.DienVien || ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    MoTa: { ...editedProduct.MoTa, DienVien: e.target.value },
                  })
                }
              />
            </div>

            <div className="form-group col-md-6">
              <label className="control-label">Ngày khởi chiếu</label>
              <input
                className="form-control"
                type="date"
                required
                value={editedProduct.MoTa?.NgayKhoiChieu || ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    MoTa: {
                      ...editedProduct.MoTa,
                      NgayKhoiChieu: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="form-group col-md-12">
              <label className="control-label">Nội dung</label>
              <textarea
                className="form-control"
                rows="3"
                required
                value={editedProduct.ThongTinPhim || ""}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    ThongTinPhim: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </main>
  );
};

export default SanPham;