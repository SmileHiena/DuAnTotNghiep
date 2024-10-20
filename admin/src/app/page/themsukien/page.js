"use client"; // Mark this component as a client component

import Head from "next/head";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ThemSuKien = () => {
  const [newEvent, setNewEvent] = useState({
    Ten: "",
    NoiDung: "",
    Anh: null,
    NgayBatDau: "",
    NgayKetThuc: "",
    Luuy: "",
    DieuKien: "",
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setNewEvent((prev) => ({
      ...prev,
      Anh: e.target.files[0], // Handle image upload
    }));
  };

  const handleSubmitNewEvent = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("newEvent", JSON.stringify(newEvent)); // Serialize newEvent as JSON string

    if (newEvent.Anh) {
      formData.append("Anh", newEvent.Anh); // Include image if uploaded
    }

    try {
      const response = await fetch("http://localhost:3000/event/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to add event.");

      const data = await response.json();
      alert("Thêm sự kiện thành công!");
      router.push("/page/khuyenmai");
    } catch (error) {
      console.error("Lỗi khi thêm sự kiện:", error);
      alert("Có lỗi xảy ra! Vui lòng thử lại.");
    }
  };

  return (
    <main className="app-content">
      <Head>
        <title>Thêm Sự Kiện</title>
      </Head>
      <div className="app-title">
        <h1>Thêm sự kiện mới</h1>
      </div>
      <div className="tile-body">
        <Form onSubmit={handleSubmitNewEvent} className="row">
          <Form.Group className="col-md-4" controlId="formTen">
            <Form.Label>Tên Sự Kiện</Form.Label>
            <Form.Control
              type="text"
              name="Ten"
              value={newEvent.Ten}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="col-md-4" controlId="formNoiDung">
            <Form.Label>Nội Dung</Form.Label>
            <Form.Control
              type="text"
              name="NoiDung"
              value={newEvent.NoiDung}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="col-md-4" controlId="formAnh">
            <Form.Label>Ảnh Sự Kiện</Form.Label>
            <Form.Control
              type="file"
              name="Anh"
              onChange={handleFileChange}
              required
            />
          </Form.Group>
          <Form.Group className="col-md-4" controlId="formNgayBatDau">
            <Form.Label>Ngày Bắt Đầu</Form.Label>
            <Form.Control
              type="date"
              name="NgayBatDau"
              value={newEvent.NgayBatDau}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="col-md-4" controlId="formNgayKetThuc">
            <Form.Label>Ngày Kết Thúc</Form.Label>
            <Form.Control
              type="date"
              name="NgayKetThuc"
              value={newEvent.NgayKetThuc}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="col-md-4" controlId="formLuuy">
            <Form.Label>Ghi Chú</Form.Label>
            <Form.Control
              type="text"
              name="Luuy"
              value={newEvent.Luuy}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="col-md-4" controlId="formDieuKien">
            <Form.Label>Điều Kiện</Form.Label>
            <Form.Control
              type="text"
              name="DieuKien"
              value={newEvent.DieuKien}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="col-md-12">
            Thêm Sự Kiện
          </Button>
        </Form>
      </div>
    </main>
  );
};

export default ThemSuKien;
