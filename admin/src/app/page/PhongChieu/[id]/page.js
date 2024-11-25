"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
// Toast
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuanLyPhongChieu = ({ params }) => {
  const { id: rapId } = params;
  const [raps, setRaps] = useState([]);
  const [phongChieu, setPhongChieu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPhong, setCurrentPhong] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPhongChieu, setNewPhongChieu] = useState({
    TenPhongChieu: "",
    SoLuongGhe: "",
    Ghe: [],
  });

  const notifyXoa = () => {
    toast.success('Xóa phòng thành công thành công!', {
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

  const notifyThem = () => {
    toast.success('Thêm phòng thành công!', {
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

  const notifySua = () => {
    toast.success('Sửa phòng thành công!', {
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

  const [currentHang, setCurrentHang] = useState(""); // State for the current row name
  const [currentGhe, setCurrentGhe] = useState(""); // State for the current seat list
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
          const response = await fetch(
            `http://localhost:3000/rap/${rapId}/phong-chieu`
          );
          const data = await response.json();
          console.log("Phong Chieu Data:", data); // Log the data
          setPhongChieu(data);
          setLoading(false);
        } catch (error) {
          console.error("Có lỗi xảy ra khi lấy dữ liệu phòng chiếu:", error);
          setLoading(false);
        }
      }
    };
    fetchPhongChieu();
  }, [rapId]);

  const handleAddPhongChieu = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/rap/${rapId}/phong-chieu`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPhongChieu),
        }
      );

      if (response.ok) {
        const addedPhongChieu = await response.json();
        setPhongChieu((prev) => [...prev, addedPhongChieu.newPhongChieu]);
        console.log("Phòng chiếu mới:", addedPhongChieu.newPhongChieu);
        setNewPhongChieu({ TenPhongChieu: "", SoLuongGhe: "", Ghe: [] });
        setIsAddModalOpen(false);
        notifyThem();
      } else {
        alert("Có lỗi xảy ra khi thêm phòng chiếu!");
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

  const handleAddGhe = () => {
    const danhSachGhe = newPhongChieu.Ghe || [];
    danhSachGhe.push({ Hang: currentHang, DanhSachGhe: [] });
    const soHang = Math.ceil(newPhongChieu.SoLuongGhe / 10);

    let gheId = 1;
    for (let hang = 1; hang <= soHang; hang++) {
      const hangData = { Hang: `H${hang}`, DanhSachGhe: [] };
      for (let i = 1; i <= 10 && gheId <= newPhongChieu.SoLuongGhe; i++) {
        hangData.DanhSachGhe.push({ id: gheId++, tenGhe: `H${hang}G${i}` });
      }
      danhSachGhe.push(hangData);
    }

    setNewPhongChieu((prev) => ({ ...prev, Ghe: danhSachGhe }));
  };

  const handleEditPhongChieu = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/rap/${rapId}/phong-chieu/${currentPhong.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentPhong),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Lỗi từ API:", errorData);
        alert("Cập nhật không thành công!");
        return;
      }

      const updatedPhongChieu = await response.json();
      console.log("Cập nhật thành công:", updatedPhongChieu);
      notifySua();

      // Cập nhật danh sách phòng chiếu
      setPhongChieu((prev) =>
        prev.map((phong) =>
          phong.id === currentPhong.id ? { ...phong, ...currentPhong } : phong
        )
      );

      setIsEditModalOpen(false);
      setCurrentPhong(null);
    } catch (error) {
      console.error("Lỗi khi sửa phòng chiếu:", error);
      alert("Đã xảy ra lỗi, vui lòng thử lại sau!");
    }
  };

  const handleDeletePhongChieu = async (phongId) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa phòng chiếu này không?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:3000/rap/${rapId}/phong-chieu/${phongId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Cập nhật danh sách phòng chiếu trong state
          setPhongChieu((prev) =>
            prev.filter((phong) => phong._id !== phongId)
          );
          console.log("Xóa phòng chiếu thành công!");
          notifyXoa();
        } else {
          const errorDetails = await response.json();
          console.error("API Error:", errorDetails);
          alert("Có lỗi xảy ra khi xóa phòng chiếu!");
        }
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

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-primary"
        >
          Thêm phòng chiếu mới
        </button>

        {phongChieu.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    #
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Tên phòng chiếu
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Số lượng ghế
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {phongChieu.map((phong, index) => (
                  <tr
                    key={phong.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100`}
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {phong.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {phong.TenPhongChieu}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {phong.SoLuongGhe}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 mr-2"
                        onClick={() => {
                          setIsEditModalOpen(true);
                          setCurrentPhong(phong);
                        }}
                      >
                        Sửa
                      </button>
                      <button
                        className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                        onClick={() => handleDeletePhongChieu(phong.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Không có phòng chiếu nào được tìm thấy.</p>
        )}

        <button onClick={() => router.back()} className="btn btn-secondary">
          Trở về
        </button>
        {isEditModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
              <h2 className="text-xl font-bold mb-4">Sửa phòng chiếu</h2>

              <label className="block mb-2 text-sm font-medium">
                Tên phòng chiếu
              </label>
              <input
                type="text"
                className="border p-2 mb-4 w-full rounded-md"
                value={currentPhong?.TenPhongChieu || ""}
                onChange={(e) =>
                  setCurrentPhong({
                    ...currentPhong,
                    TenPhongChieu: e.target.value,
                  })
                }
              />

              <label className="block mb-2 text-sm font-medium">
                Số lượng ghế
              </label>
              <input
                type="number"
                className="border p-2 mb-4 w-full rounded-md"
                value={currentPhong?.SoLuongGhe || ""}
                onChange={(e) =>
                  setCurrentPhong({
                    ...currentPhong,
                    SoLuongGhe: parseInt(e.target.value, 10),
                  })
                }
              />

              {/* Chỉnh sửa danh sách ghế */}
              <div className="mb-4">
                <h3 className="font-medium text-lg mb-2">
                  Chỉnh sửa danh sách ghế
                </h3>
                {currentPhong?.Ghe?.map((hang, index) => (
                  <div key={index} className="mb-4">
                    <label className="block text-sm font-medium">
                      Hàng: {hang.Hang}
                    </label>
                    <input
                      type="text"
                      className="border p-2 w-full rounded-md"
                      value={
                        hang.DanhSachGhe?.map((ghe) => ghe.tenGhe).join(", ") ||
                        ""
                      }
                      onChange={(e) => {
                        const newDanhSachGhe = e.target.value
                          .split(",")
                          .map((tenGhe, idx) => ({
                            id: `${hang.Hang}${idx + 1}`,
                            tenGhe: tenGhe.trim(),
                          }));

                        const updatedGhe = currentPhong.Ghe.map((h, i) =>
                          i === index
                            ? { ...h, DanhSachGhe: newDanhSachGhe }
                            : h
                        );

                        setCurrentPhong({
                          ...currentPhong,
                          Ghe: updatedGhe,
                        });
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleEditPhongChieu}
                  className="btn btn-primary flex-1 py-2 rounded-md"
                >
                  Lưu
                </button>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="btn btn-secondary flex-1 py-2 rounded-md"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal thêm phòng chiếu */}
        {isAddModalOpen && (
          <div
            className="modal fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
            style={{ display: isAddModalOpen ? "block" : "none" }}
          >
            <div className="modal-content bg-white p-4 rounded-lg max-w-md w-full">
              <h2 className="text-lg font-bold">Thêm phòng chiếu mới</h2>
              <label className="block mb-2">Tên phòng chiếu</label>
              <input
                type="text"
                className="border p-2 mb-4 w-full"
                placeholder="Tên phòng chiếu"
                value={newPhongChieu.TenPhongChieu}
                onChange={(e) =>
                  setNewPhongChieu({
                    ...newPhongChieu,
                    TenPhongChieu: e.target.value,
                  })
                }
              />
              <label className="block mb-2">Số lượng ghế</label>
              <input
                type="number"
                className="border p-2 mb-4 w-full"
                placeholder="Số lượng ghế"
                value={newPhongChieu.SoLuongGhe}
                onChange={(e) =>
                  setNewPhongChieu({
                    ...newPhongChieu,
                    SoLuongGhe: e.target.value,
                  })
                }
              />

              {/* Add Row and Seats */}
              <div className="mb-4">
                <label className="block mb-2">Tên hàng ghế</label>
                <input
                  type="text"
                  className="border p-2 mb-2 w-full"
                  placeholder="Ví dụ: A, B"
                  value={currentHang}
                  onChange={(e) => setCurrentHang(e.target.value)}
                />
                <label className="block mb-2">Danh sách ghế</label>
                <input
                  type="text"
                  className="border p-2 mb-2 w-full"
                  placeholder="Ví dụ: 1,2,3"
                  value={currentGhe}
                  onChange={(e) => setCurrentGhe(e.target.value)}
                />
                <button
                  onClick={() => {
                    const gheArr = currentGhe.split(",").map((ghe, index) => ({
                      id: `${currentHang}${index + 1}`, // ID ghế là Hàng + Số
                      tenGhe: ghe.trim(),
                    }));

                    setNewPhongChieu((prev) => ({
                      ...prev,
                      Ghe: [
                        ...prev.Ghe,
                        { Hang: currentHang, DanhSachGhe: gheArr },
                      ],
                    }));
                    setCurrentHang("");
                    setCurrentGhe("");
                  }}
                  className="btn btn-primary"
                >
                  Thêm hàng ghế
                </button>
              </div>

              <button
                onClick={handleAddPhongChieu}
                className="btn btn-primary w-full mt-4"
              >
                Thêm phòng chiếu
              </button>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="btn btn-secondary w-full mt-2"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
        <ToastContainer />
      </main>
    </>
  );
};

export default QuanLyPhongChieu;
