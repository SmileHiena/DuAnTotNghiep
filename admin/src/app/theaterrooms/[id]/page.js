"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
// Toast
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const QuanLyPhongChieu = ({ params }) => {
  const { id: rapId } = params;
  // const { name: tenRap } = params;
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
  const tenRaps = raps.map(rap => rap.TenRap);

  console.log(tenRaps);


  const notifyXoa = () => {
    toast.success("Xóa phòng thành công thành công!", {
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
    toast.success("Thêm phòng thành công!", {
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
    toast.success("Sửa phòng thành công!", {
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
        const response = await fetch("http://localhost:3000/theater");
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
            `http://localhost:3000/theater/${rapId}/phong-chieu`
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
  }, [rapId]); const handleAddPhongChieu = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/theater/${rapId}/phong-chieu`,
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
    const soHang = Math.ceil(newPhongChieu.SoLuongGhe / 0);

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
        `http://localhost:3000/theater/${rapId}/phong-chieu/${currentPhong.id}`,
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
          `http://localhost:3000/theater/${rapId}/phong-chieu/${phongId}`,
          {
            method: "DELETE",
          }
        ); if (response.ok) {
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
      <main className="app-content">
        <Head>
          <title>Quản lý phòng chiếu</title>
        </Head>
        <div className="app-title">
          <ul className="app-breadcrumb breadcrumb side">
            <li className="breadcrumb-item active">
              <a href="#"><b>Quản lý phòng chiếu cho {tenRaps}</b></a>
            </li>
          </ul>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <div className="tile-body">
                <div className="row element-button">
                  <div className="col-sm-2">
                    <button onClick={() => setIsAddModalOpen(true)} className="btn btn-add"><FontAwesomeIcon icon={faPlus} />Thêm mới</button>
                  </div>
                </div>

                {Array.isArray(phongChieu) && phongChieu.length > 0 ? (
                  <table className="table table-hover table-bordered js-copytextarea">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên phòng chiếu</th>
                        <th>Số lượng ghế</th>
                        <th>Tên ghế</th>
                        <th width="130">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {phongChieu.map((phong, index) => (
                        <tr key={phong.id}>
                          <td>{index + 1}</td>
                          <td>{phong.TenPhongChieu}</td>
                          <td>{phong.SoLuongGhe}</td>
                          <td>{phong.Ghe.map((row, rowIndex) => (<div key={rowIndex} className="mb-2">
                            <div className="flex flex-wrap gap-2">
                              <strong className="block mb-1"> {row.Hang} -{" "}
                              </strong>
                              {row.Ghe.map((ghe, gheIndex) => (
                                <div
                                  key={gheIndex}
                                  className="px-2 py-2 w-[65px] bg-blue-500 text-white text-center text-sm rounded "
                                >
                                  {ghe}
                                </div>
                              ))}
                            </div>
                          </div>
                          ))}
                          </td>
                          <td>
                            <button className="btn btn-primary mr-3" onClick={() => { setIsEditModalOpen(true); setCurrentPhong(phong); }}><FontAwesomeIcon icon={faPenToSquare} /></button>
                            <button className="btn btn-danger" onClick={() => handleDeletePhongChieu(phong.id)}                            ><FontAwesomeIcon icon={faTrash} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>Không có phòng chiếu nào được tìm thấy.</p>
                )}

                <button onClick={() => router.back()} className="btn btn-danger"><FontAwesomeIcon icon={faArrowLeft} className="mr-2" />Trở về</button>

                {isEditModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg max-w-4xl w-full shadow-lg overflow-y-auto max-h-[90vh]">
                      {/* Header */}
                      <div className="row">
                        <div className="form-group col-md-12">
                          <h5>Sửa phòng chiếu</h5>
                        </div>
                      </div>
                      {/* Chỉnh sửa thông tin phòng chiếu */}
                      <div className="row">
                        <div className="form-group col-md-6">
                          <label className="control-label">Tên phòng chiếu</label>
                          <input type="text" className="form-control" value={currentPhong?.TenPhongChieu || ""} onChange={(e) => setCurrentPhong({ ...currentPhong, TenPhongChieu: e.target.value, })} />
                        </div>
                        <div className="form-group col-md-6">
                          <label className="control-label">Số lượng ghế</label>
                          <input type="number" className="form-control" value={currentPhong?.SoLuongGhe || ""} onChange={(e) => setCurrentPhong({ ...currentPhong, SoLuongGhe: parseInt(e.target.value, 10), })} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-12">
                          <h5>Chỉnh sửa danh sách ghế</h5>
                        </div>
                      </div>
                      {/* Chỉnh sửa danh sách ghế */}
                      <div className="row">
                        {currentPhong?.Ghe?.map((hang, index) => (
                          <div key={index} className="mb-6">
                            {/* Tên hàng */}
                            <div className="form-group col-md-12">
                              <label className="control-label">Hàng: {hang.Hang} - Số ghế: {hang.Ghe.length}</label>

                              {/* Danh sách ghế */}
                              <div className="flex flex-wrap gap-3">
                                {hang.Ghe.map((ghe, gheIndex) => (
                                  <div key={gheIndex} className="flex items-center gap-2">
                                    <input type="text" value={ghe} onChange={(e) => {
                                      // Cập nhật ghế hiện tại
                                      const updatedRow = hang.Ghe.map((g, i) => i === gheIndex ? e.target.value.trim() : g);

                                      // Cập nhật hàng ghế
                                      const updatedGhe = currentPhong.Ghe.map((h, i) => i === index ? { ...h, Ghe: updatedRow } : h);

                                      // Cập nhật tổng số lượng ghế
                                      const updatedPhong = { ...currentPhong, Ghe: updatedGhe, SoLuongGhe: updatedGhe.reduce((sum, h) => sum + h.Ghe.length, 0), }; setCurrentPhong(updatedPhong);
                                    }} className="form-control"  />
                                    {/* Nút xóa ghế */}
                                    <button onClick={() => {
                                      // Xóa ghế tại vị trí gheIndex
                                      const updatedRow = hang.Ghe.filter((g, i) => i !== gheIndex);

                                      // Cập nhật hàng ghế
                                      const updatedGhe = currentPhong.Ghe.map((h, i) => i === index ? { ...h, Ghe: updatedRow } : h);

                                      // Cập nhật tổng số lượng ghế
                                      const updatedPhong = { ...currentPhong, Ghe: updatedGhe, SoLuongGhe: updatedGhe.reduce((sum, h) => sum + h.Ghe.length, 0), }; setCurrentPhong(updatedPhong);
                                    }} className="btn btn-danger">-</button>
                                  </div>
                                ))}

                                {/* Nút thêm ghế */}
                                <button onClick={() => {
                                  // Thêm ghế mới
                                  const newGhe = [...hang.Ghe, ""]; const updatedGhe = currentPhong.Ghe.map((h, i) => i === index ? { ...h, Ghe: newGhe } : h);

                                  // Cập nhật tổng số lượng ghế
                                  const updatedPhong = { ...currentPhong, Ghe: updatedGhe, SoLuongGhe: updatedGhe.reduce((sum, h) => sum + h.Ghe.length, 0), }; setCurrentPhong(updatedPhong);
                                }} className="btn btn-add">+</button>
                              </div>
                            </div></div>
                        ))}

                      </div>

                      <button onClick={handleEditPhongChieu} className="btn btn-save mr-3">Lưu lại</button>
                      <button onClick={() => setIsEditModalOpen(false)} className="btn btn-cancel">Hủy bỏ</button>
                    </div>
                  </div>
                )}


                {/* Modal thêm phòng chiếu */}
                {isAddModalOpen && (
                  <div className="modal fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center" style={{ display: isAddModalOpen ? "block" : "none" }}                  >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                      <div className="modal-content">
                        <div className="modal-body">
                          <div className="row">
                            <div className="form-group col-md-12">
                              <h5>Thêm phòng chiếu mới</h5>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label className="control-label">Tên phòng chiếu</label>
                              <input type="text" className="form-control" placeholder="Tên phòng chiếu" value={newPhongChieu.TenPhongChieu} onChange={(e) => setNewPhongChieu({ ...newPhongChieu, TenPhongChieu: e.target.value, })} />
                            </div>
                            <div className="form-group col-md-6">
                              <label className="control-label">Số lượng ghế</label>
                              <input type="number" className="form-control" placeholder="Số lượng ghế" value={newPhongChieu.SoLuongGhe} onChange={(e) => setNewPhongChieu({ ...newPhongChieu, SoLuongGhe: e.target.value, })} />
                            </div>
                          </div>
                          <button onClick={handleAddPhongChieu} className="btn btn-save mr-3">Lưu lại</button>
                          <button onClick={() => setIsAddModalOpen(false)} className="btn btn-cancel">Hủy bỏ</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <ToastContainer />

              </div>
            </div>
          </div>
        </div>
      </main >
    </>
  );
}; export default QuanLyPhongChieu;