"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";

const QuanLyPhongChieu = ({ params }) => {
  const { id: rapId } = params;
  const [raps, setRaps] = useState([]);
  const [phongChieu, setPhongChieu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPhong, setCurrentPhong] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Thêm trạng thái cho popup thêm
  const [newPhongChieu, setNewPhongChieu] = useState({ TenPhongChieu: "", SoLuongGhe: "" });
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

  useEffect(() => {
    const fetchPhongChieu = async () => {
      if (rapId) {
        try {
          const response = await fetch(`http://localhost:3000/rap/${rapId}/phong-chieu`);
          const data = await response.json();
          setPhongChieu(data);
          setLoading(false);
        } catch (error) {
          console.error("Có lỗi xảy ra khi lấy dữ liệu phòng chiếu:", error);
          setLoading(false);
        }
      } else {
        console.warn("Rap ID không tồn tại trong params");
      }
    };

    fetchPhongChieu();
  }, [rapId]);

  const handleAddPhongChieu = async () => {
    try {
      const response = await fetch(`http://localhost:3000/rap/${rapId}/phong-chieu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPhongChieu),
      });

      if (response.ok) {
        const addedPhongChieu = await response.json();
        setPhongChieu((prev) => [...prev, addedPhongChieu]);
        setNewPhongChieu({ TenPhongChieu: "", SoLuongGhe: "" });
        setIsAddModalOpen(false);
      } else {
        alert("Có lỗi xảy ra khi thêm phòng chiếu!");
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

  const handleEditPhongChieu = async () => {
    try {
      const response = await fetch(`http://localhost:3000/phong-chieu/${currentPhong._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentPhong),
      });

      if (response.ok) {
        const updatedPhongChieu = await response.json();
        setPhongChieu((prev) =>
          prev.map((phong) => (phong._id === currentPhong._id ? updatedPhongChieu : phong))
        );
        setIsEditModalOpen(false);
        setCurrentPhong(null);
      } else {
        alert("Có lỗi xảy ra khi cập nhật phòng chiếu!");
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

  const handleDeletePhongChieu = async (phongId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa phòng chiếu này không?");
    if (confirmDelete) {
      try {
        await fetch(`http://localhost:3000/phong-chieu/${phongId}`, {
          method: "DELETE",
        });
        setPhongChieu((prev) => prev.filter((phong) => phong._id !== phongId));
      } catch (error) {
        console.error("Có lỗi xảy ra khi xóa phòng chiếu:", error);
      }
    }
  };

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <>
      <Head>
        <title>Quản lý phòng chiếu</title>
      </Head>
      <main className="app-content">
        <h1>Quản lý phòng chiếu cho Rạp ID: {rapId}</h1>

        {/* Nút mở popup thêm phòng chiếu */}
        <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary">Thêm phòng chiếu mới</button>

        {/* Render danh sách phòng chiếu */}
        {phongChieu.length > 0 ? (
          <ul className="room-list">
            {phongChieu.map((phong) => (
              <li key={phong._id} className="room-item">
                <span>{phong.TenPhongChieu} - {phong.SoLuongGhe} chỗ ngồi</span>
                <button
                  className="btn btn-sm btn-primary ml-2"
                  onClick={() => {
                    setCurrentPhong(phong);
                    setIsEditModalOpen(true);
                  }}
                >
                  Sửa
                </button>
                <button
                  className="btn btn-sm btn-danger ml-2"
                  onClick={() => handleDeletePhongChieu(phong._id)}
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Không có phòng chiếu nào được tìm thấy.</p>
        )}

        <button onClick={() => router.back()} className="btn btn-secondary">Trở về</button>

        {/* Modal sửa phòng chiếu */}
        {isEditModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Sửa thông tin phòng chiếu</h2>
              <input
                type="text"
                value={currentPhong?.TenPhongChieu}
                onChange={(e) => setCurrentPhong({ ...currentPhong, TenPhongChieu: e.target.value })}
              />
              <input
                type="number"
                value={currentPhong?.SoLuongGhe}
                onChange={(e) => setCurrentPhong({ ...currentPhong, SoLuongGhe: e.target.value })}
              />
              <button onClick={handleEditPhongChieu} className="btn btn-primary">Lưu</button>
              <button onClick={() => setIsEditModalOpen(false)} className="btn btn-secondary">Đóng</button>
            </div>
          </div>
        )}

        {/* Modal thêm phòng chiếu */}
        {isAddModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Thêm phòng chiếu mới</h2>
              <input
                type="text"
                placeholder="Tên phòng chiếu"
                value={newPhongChieu.TenPhongChieu}
                onChange={(e) => setNewPhongChieu({ ...newPhongChieu, TenPhongChieu: e.target.value })}
              />
              <input
                type="number"
                placeholder="Số lượng ghế"
                value={newPhongChieu.SoLuongGhe}
                onChange={(e) => setNewPhongChieu({ ...newPhongChieu, SoLuongGhe: e.target.value })}
              />
              <button onClick={handleAddPhongChieu} className="btn btn-primary">Thêm</button>
              <button onClick={() => setIsAddModalOpen(false)} className="btn btn-secondary">Đóng</button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default QuanLyPhongChieu;