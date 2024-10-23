"use client"; // Mark this component as a client component

import Head from "next/head";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for the toast

const ThemSanPham = () => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [theloai, setTheloai] = useState([]);
  const [newPhim, setNewPhim] = useState({
    Ten: "",
    Anh: null,
    TrangThai: "Sắp chiếu",
    TheLoai: {
      ThoiLuong: "",
      QuocGia: "Việt Nam",
      KieuPhim: "",
      NgonNgu: "Tiếng Việt",
      KhuyenCao: "",
    },
    MoTa: {
      DaoDien: "",
      DienVien: "",
      NgayKhoiChieu: "",
    },
    ThongTinPhim: "",
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name in newPhim.TheLoai) {
      setNewPhim((prev) => ({
        ...prev,
        TheLoai: {
          ...prev.TheLoai,
          [name]: value,
        },
      }));
      if (name === "ThoiLuong") {
        if (value && isNaN(value)) {
          setError("Chỉ được nhập số phút.");
        } else {
          setError(""); // Xóa lỗi nếu giá trị là số
        }
      }
    } else if (name in newPhim.MoTa) {
      setNewPhim((prev) => ({
        ...prev,
        MoTa: {
          ...prev.MoTa,
          [name]: value,
        },
      }));
    } else {
      setNewPhim((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    setNewPhim((prev) => ({
      ...prev,
      Anh: e.target.files[0],
    }));
  };

  const notifySuccess = () => {
    toast.success("Thêm sản phẩm thành công!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSubmitNewPhim = async (e) => {
    e.preventDefault();

    if (isNaN(newPhim.TheLoai.ThoiLuong)) {
      setError("Chỉ được nhập số phút.");
      return;
    }

    const formData = new FormData();
    formData.append(
      "newPhim",
      JSON.stringify({
        Ten: newPhim.Ten,
        TrangThai: newPhim.TrangThai,
        TheLoai: newPhim.TheLoai,
        MoTa: newPhim.MoTa,
        ThongTinPhim: newPhim.ThongTinPhim,
      })
    );

    if (newPhim.Anh) {
      formData.append("Anh", newPhim.Anh);
    }

    try {
      const response = await fetch("http://localhost:3000/sanpham/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to add product.");

      const data = await response.json();
      notifySuccess(); // Call notifySuccess on successful addition
      setTimeout(() => {
        router.push("/page/sanpham"); // Navigate after 2 seconds
      }, 2000);
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      alert("Có lỗi xảy ra! Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

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

  return (
    <>
      <Head>
        <title>Thêm Sản Phẩm</title>
      </Head>
      <main className="app-content">
        <ToastContainer /> {/* Include ToastContainer for notifications */}
        <div className="app-title">
          <h1>Thêm Sản Phẩm Mới</h1>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <h3 className="tile-title">Tạo Mới Sản Phẩm</h3>
              <div className="tile-body">
                <Form onSubmit={handleSubmitNewPhim} className="row">
                  <Form.Group
                    className="form-group col-md-4"
                    controlId="formTen"
                  >
                    <Form.Label>Tên Sản Phẩm</Form.Label>
                    <Form.Control
                      type="text"
                      name="Ten"
                      value={newPhim.Ten}
                      onChange={(e) =>
                        setNewPhim((prev) => ({ ...prev, Ten: e.target.value }))
                      }
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="form-group col-md-4"
                    controlId="formAnh"
                  >
                    <Form.Label>Ảnh Sản Phẩm</Form.Label>
                    <Form.Control
                      type="file"
                      name="Anh"
                      onChange={handleFileChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="form-group col-md-4"
                    controlId="formTrangThai"
                  >
                    <Form.Label>Tình Trạng</Form.Label>
                    <Form.Control
                      as="select"
                      name="TrangThai"
                      value={newPhim.TrangThai}
                      onChange={(e) =>
                        setNewPhim((prev) => ({
                          ...prev,
                          TrangThai: e.target.value,
                        }))
                      }
                      required
                    >
                      <option value="">-- Chọn Tình Trạng --</option>
                      <option>Đang chiếu</option>
                      <option>Sắp chiếu</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group
                    className="form-group col-md-4"
                    controlId="formKieuPhim"
                  >
                    <Form.Label>Kiểu Phim</Form.Label>
                    <Form.Control
                      as="select"
                      name="KieuPhim"
                      value={newPhim.TheLoai.KieuPhim} // Bind to KieuPhim
                      onChange={handleInputChange} // Use handleInputChange here
                      required
                    >
                      <option value="">-- Chọn Kiểu Phim --</option>
                      {theloai.map((item) => (
                        <option key={item.id} value={item.Ten}>
                          {item.Ten}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group
                    className="form-group col-md-4"
                    controlId="formThoiLuong"
                  >
                    <Form.Label>Thời Lượng</Form.Label>
                    <Form.Control
                      type="number"
                      name="ThoiLuong"
                      value={newPhim.TheLoai.ThoiLuong}
                      onChange={handleInputChange} // Use handleInputChange here
                      required
                      placeholder="10 phút"
                    />
                    {error && <div className="text-danger">{error}</div>}
                  </Form.Group>

                  <Form.Group
                    className="form-group col-md-4"
                    controlId="formQuocGia"
                  >
                    <Form.Label>Quốc Gia</Form.Label>
                    <Form.Control
                      as="select"
                      name="QuocGia"
                      value={newPhim.TheLoai.QuocGia}
                      onChange={handleInputChange} // Use handleInputChange here
                      required
                    >
                      <option value="Việt Nam">Việt Nam</option>
                      <option value="Mỹ">Mỹ</option>
                      <option value="Nhật Bản">Nhật Bản</option>
                      <option value="Hàn Quốc">Hàn Quốc</option>
                      <option value="Pháp">Pháp</option>
                      <option value="Đức">Đức</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group
                    className="form-group col-md-4"
                    controlId="formNgayKhoiChieu"
                  >
                    <Form.Label>Ngày Khởi Chiếu</Form.Label>
                    <Form.Control
                      type="date"
                      name="NgayKhoiChieu"
                      value={newPhim.MoTa.NgayKhoiChieu}
                      onChange={handleInputChange} // Use handleInputChange here
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="form-group col-md-4"
                    controlId="formDienVien"
                  >
                    <Form.Label>Diễn Viên</Form.Label>
                    <Form.Control
                      type="text"
                      name="DienVien"
                      value={newPhim.MoTa.DienVien}
                      onChange={handleInputChange} // Use handleInputChange here
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="form-group col-md-4"
                    controlId="formDaoDien"
                  >
                    <Form.Label>Đạo Diễn</Form.Label>
                    <Form.Control
                      type="text"
                      name="DaoDien"
                      value={newPhim.MoTa.DaoDien}
                      onChange={handleInputChange} // Use handleInputChange here
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="form-group col-md-4"
                    controlId="formKhuyenCao"
                  >
                    <Form.Label>Khuyến Cáo</Form.Label>
                    <Form.Control
                      as="select"
                      name="KhuyenCao"
                      value={newPhim.TheLoai.KhuyenCao}
                      onChange={handleInputChange} // Use handleInputChange here
                      required
                    >
                      <option value="">-- Chọn Khuyến Cáo --</option>
                      <option>
                        T18: Phim dành cho khán giả từ đủ 16 tuổi trở lên (18+)
                      </option>
                      <option>
                        T16: Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)
                      </option>
                      <option>
                        T13: Phim dành cho khán giả từ đủ 16 tuổi trở lên (13+)
                      </option>
                      {/* Add more ratings as needed */}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group
                    className="form-group col-md-12"
                    controlId="formThongTinPhim"
                  >
                    <Form.Label>Thông Tin Phim</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="ThongTinPhim"
                      value={newPhim.ThongTinPhim}
                      onChange={handleInputChange} // Use handleInputChange here
                      required
                    />
                  </Form.Group>

                  <div className="form-group col-md-12">
                    <Button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Đang thêm..." : "Thêm Sản Phẩm"}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ThemSanPham;