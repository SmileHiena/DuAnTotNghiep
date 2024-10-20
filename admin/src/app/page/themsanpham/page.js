"use client"; // Mark this component as a client component

import Head from "next/head";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ThemSanPham = () => {
  const [newPhim, setNewPhim] = useState({
    Ten: "",
    Anh: null,
    TrangThai: "Sắp chiếu",
    TheLoai: {},
    ThoiLuong: "",
    QuocGia: "",
    KieuPhim: "",
    NgonNgu: "",
    KhuyenCao: "",
    MoTa: {
      DaoDien: "",
      DienVien: "",
      NgayKhoiChieu: "",
    },
    ThongTinPhim: "", // Ensure this is at the root level
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPhim((prev) => ({
      ...prev,
      MoTa: {
        ...prev.MoTa,
        [name]: value,
      },
    }));
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setNewPhim((prev) => ({
      ...prev,
      TheLoai: {
        ...prev.TheLoai,
        [name]: value,
      },
    }));
  };

  const handleSubmitNewPhim = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "newPhim",
      JSON.stringify({
        Ten: newPhim.Ten,
        TrangThai: newPhim.TrangThai,
        TheLoai: newPhim.TheLoai,
        MoTa: newPhim.MoTa,
        ThongTinPhim: newPhim.ThongTinPhim, // Include this field
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
      alert("Thêm sản phẩm thành công!");
      router.push("/page/sanpham");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      alert("Có lỗi xảy ra! Vui lòng thử lại.");
    }
  };

  return (
    <main className="app-content">
      <Head>
        <title>Thêm sản phẩm</title>
      </Head>
      <div className="app-title">
        <h1>Thêm sản phẩm mới</h1>
      </div>
      <div className="tile-body">
        <Form onSubmit={handleSubmitNewPhim} className="row">
          <Form.Group className="col-md-4" controlId="formTen">
            <Form.Label>Tên sản phẩm</Form.Label>
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
          <Form.Group className="col-md-4" controlId="formAnh">
            <Form.Label>Ảnh sản phẩm</Form.Label>
            <Form.Control
              type="file"
              name="Anh"
              onChange={(e) =>
                setNewPhim((prev) => ({ ...prev, Anh: e.target.files[0] }))
              }
              required
            />
          </Form.Group>
          <Form.Group className="col-md-4" controlId="formTrangThai">
            <Form.Label>Tình trạng</Form.Label>
            <Form.Control
              as="select"
              name="TrangThai"
              value={newPhim.TrangThai}
              onChange={(e) =>
                setNewPhim((prev) => ({ ...prev, TrangThai: e.target.value }))
              }
              required
            >
              <option value="">-- Chọn tình trạng --</option>
              <option>Đang chiếu</option>
              <option>Sắp chiếu</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="col-md-4" controlId="formKieuPhim">
            <Form.Label>Kiểu phim</Form.Label>
            <Form.Control
              type="text"
              name="KieuPhim"
              value={newPhim.TheLoai.KieuPhim}
              onChange={handleCategoryChange}
              required
            />
          </Form.Group>
          <Form.Group className="col-md-4" controlId="formThoiLuong">
            <Form.Label>Thời lượng</Form.Label>
            <Form.Control
              type="text"
              name="ThoiLuong"
              value={newPhim.TheLoai.ThoiLuong}
              onChange={handleCategoryChange}
              required
            />
          </Form.Group>
          <Form.Group className="col-md-4" controlId="formQuocGia">
            <Form.Label>Quốc gia</Form.Label>
            <Form.Control
              type="text"
              name="QuocGia"
              value={newPhim.TheLoai.QuocGia}
              onChange={handleCategoryChange}
              required
            />
          </Form.Group>
          <Form.Group className="col-md-4" controlId="formNgonNgu">
            <Form.Label>Ngôn ngữ</Form.Label>
            <Form.Control
              type="text"
              name="NgonNgu"
              value={newPhim.TheLoai.NgonNgu}
              onChange={handleCategoryChange}
              required
            />
          </Form.Group>
          <Form.Group className="col-md-4" controlId="formKhuyenCao">
            <Form.Label>Khuyến cáo</Form.Label>
            <Form.Control
              type="text"
              name="KhuyenCao"
              value={newPhim.TheLoai.KhuyenCao}
              onChange={handleCategoryChange}
              required
            />
          </Form.Group>
          <Form.Group className="col-md-4" controlId="formDaoDien">
            <Form.Label>Đạo diễn</Form.Label>
            <Form.Control
              type="text"
              name="DaoDien"
              value={newPhim.MoTa.DaoDien}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="col-md-4" controlId="formDienVien">
            <Form.Label>Diễn viên</Form.Label>
            <Form.Control
              type="text"
              name="DienVien"
              value={newPhim.MoTa.DienVien}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="col-md-4" controlId="formNgayKhoiChieu">
            <Form.Label>Ngày khởi chiếu</Form.Label>
            <Form.Control
              type="date"
              name="NgayKhoiChieu"
              value={newPhim.MoTa.NgayKhoiChieu}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="col-md-4" controlId="formThongTinPhim">
            <Form.Label>Thông tin phim</Form.Label>
            <Form.Control
              as="textarea"
              name="ThongTinPhim"
              value={newPhim.ThongTinPhim} // Use newPhim.ThongTinPhim directly
              onChange={
                (e) =>
                  setNewPhim((prev) => ({
                    ...prev,
                    ThongTinPhim: e.target.value,
                  })) // Update this
              }
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="col-md-12">
            Thêm sản phẩm
          </Button>
        </Form>
      </div>
    </main>
  );
};

export default ThemSanPham;