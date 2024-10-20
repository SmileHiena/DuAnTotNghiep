"use client"; // Mark this component as a client component

import Head from "next/head";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ThemBlog = () => {
  const [newBlog, setNewBlog] = useState({
    TenBlog: "",
    Anh: null,
    LuotXem: "0 lượt xem", // Default view count
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setNewBlog((prev) => ({
      ...prev,
      Anh: e.target.files[0], // Handle image upload
    }));
  };

  const handleSubmitNewBlog = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("newBlog", JSON.stringify(newBlog)); // Serialize newBlog as JSON string
  
    if (newBlog.Anh) {
      formData.append("Anh", newBlog.Anh); // Include image if uploaded
    }
  
    try {
      const response = await fetch("http://localhost:3000/blog/add", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) throw new Error("Failed to add blog.");
  
      const data = await response.json();
      alert("Thêm blog thành công!");
      router.push("/page/blog");
    } catch (error) {
      console.error("Lỗi khi thêm blog:", error);
      alert("Có lỗi xảy ra! Vui lòng thử lại.");
    }
  };
  

  return (
    <main className="app-content">
      <Head>
        <title>Thêm Blog</title>
      </Head>
      <div className="app-title">
        <h1>Thêm blog mới</h1>
      </div>
      <div className="tile-body">
        <Form onSubmit={handleSubmitNewBlog} className="row">
          <Form.Group className="col-md-4" controlId="formTenBlog">
            <Form.Label>Tên Blog</Form.Label>
            <Form.Control
              type="text"
              name="TenBlog"
              value={newBlog.TenBlog}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="col-md-4" controlId="formAnh">
            <Form.Label>Ảnh Blog</Form.Label>
            <Form.Control
              type="file"
              name="Anh"
              onChange={handleFileChange}
              required
            />
          </Form.Group>
          <Form.Group className="col-md-4" controlId="formTLuotXem">
            <Form.Label>Lượt xem</Form.Label>
            <Form.Control
              type="text"
              name="LuotXem"
              value={newBlog.LuotXem}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="col-md-12">
            Thêm Blog
          </Button>
        </Form>
      </div>
    </main>
  );
};

export default ThemBlog;