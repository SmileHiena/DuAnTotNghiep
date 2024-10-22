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
              </div>
              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th>Mã rạp</th>
                    <th>Tên rạp</th>
                    <th>Vị trí</th>
                    <th>Số phòng chiếu</th>
                    <th>Số ghế</th>
                    <th>Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.TenRap}</td>
                      <td>{product.ViTri}</td>
                      <td>{product.PhongChieu.length}</td>
                      <td>{product.PhongChieu[0].SoLuongGhe}</td>
                     
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

export default RapChieu;