"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const RapChieu = () => {
  const [raps, setRaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentRap, setCurrentRap] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRaps = async () => {
      try {
        const response = await fetch("http://localhost:3000/rap");
        const data = await response.json();
        setRaps(data);
        setLoading(false);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu rạp:", error);
        setLoading(false);
      }
    };

    fetchRaps();
  }, []);
  
  const handleDelete = async (rapId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa rạp này không?");

    if (confirmDelete) {
      try {
        await fetch(`http://localhost:3000/rap/${rapId}`, {
          method: "DELETE",
        });
        setRaps((prev) => prev.filter((rap) => rap._id !== rapId));
      } catch (error) {
        console.error("Có lỗi xảy ra khi xóa rạp:", error);
      }
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentRap((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/rap/${currentRap._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentRap),
      });
  
      if (response.ok) {
        const updatedRap = await response.json();
  
        // Cập nhật danh sách rạp mà không cần tải lại trang
        setRaps((prev) =>
          prev.map((rap) => (rap._id === currentRap._id ? { ...rap, ...currentRap } : rap))
        );
  
        // Hiển thị thông điệp thành công
        alert(updatedRap.message); // Hiển thị thông điệp từ server
        setCurrentRap(null);
        setIsEditModalOpen(false);
      } else {
        const errorData = await response.json();
        console.error('Lỗi cập nhật rạp:', errorData);
        alert(errorData.message || "Có lỗi xảy ra khi cập nhật rạp!");
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <>
      <main className="app-content">
        <Head>
          <title>Danh sách rạp chiếu</title>
        </Head>
        <div className="app-title">
          <ul className="app-breadcrumb breadcrumb side">
            <li className="breadcrumb-item active">
              <a href="#">
                <b>Danh sách rạp chiếu</b>
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
                    <button
                      className="btn btn-add"
                      onClick={() => router.push("/page/themrap")}
                    >
                      <FontAwesomeIcon icon={faPlus} /> Thêm rạp chiếu mới
                    </button>
                  </div>
                </div>

                <table className="table table-hover table-bordered js-copytextarea">
                  <thead>
                    <tr>
                      <th>Mã rạp</th>
                      <th>Tên Rạp</th>
                      <th>Vị Trí</th>
                      <th>Số Phòng Chiếu</th> {/* Thêm cột Số Phòng Chiếu */}
                      <th>Tính năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {raps.length > 0 ? (
                      raps.map((rap) => (
                        <tr key={rap._id}>
                          <td>{rap._id}</td>
                          <td>{rap.TenRap}</td>
                          <td>{rap.ViTri}</td>
                          <td>{rap.PhongChieu && Array.isArray(rap.PhongChieu) ? rap.PhongChieu.length : 0}</td> {/* Hiển thị số lượng phòng chiếu */}

                          <td>
                            <button
                              className="btn btn-primary btn-sm mr-3"
                              type="button"
                              onClick={() => {
                                setCurrentRap({ ...rap }); // Tạo một bản sao để không thay đổi trực tiếp đối tượng rạp
                                setIsEditModalOpen(true);
                              }}
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              type="button"
                              onClick={() => handleDelete(rap._id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">Không có rạp nào được tìm thấy</td> {/* Cập nhật số cột */}
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Sửa Rạp Chiếu */}
      <div
        className={`modal fade ${isEditModalOpen ? "show" : ""}`}
        id="ModalEditRap"
        tabIndex="-1"
        role="dialog"
        aria-hidden={!isEditModalOpen}
        data-backdrop="static"
        data-keyboard="false"
        style={{ display: isEditModalOpen ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <h5>Sửa Thông Tin Rạp Chiếu</h5>
              {currentRap && (
                <div className="row">
                  <div className="form-group col-md-6">
                    <label className="control-label">Tên Rạp</label>
                    <input
                      className="form-control"
                      type="text"
                      name="TenRap"
                      value={currentRap.TenRap}
                      onChange={handleEditInputChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label className="control-label">Vị Trí</label>
                    <input
                      className="form-control"
                      type="text"
                      name="ViTri"
                      value={currentRap.ViTri}
                      onChange={handleEditInputChange}
                      required
                    />
                  </div>
                </div>
              )}

              <button
                className="btn btn-save mr-3"
                type="button"
                onClick={handleEditSubmit}
              >
                Cập nhật
              </button>
              <button
                className="btn btn-cancel"
                type="button"
                onClick={() => setIsEditModalOpen(false)}
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RapChieu;