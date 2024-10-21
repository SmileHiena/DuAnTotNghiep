"use client"; // Mark this component as a client component

import Head from "next/head";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ThemBlog = () => {
  const [newBlog, setNewBlog] = useState({
    TenBlog: "",
    Anh: null,
    LuotXem: "0 lượt xem",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [statusMessage, setStatusMessage] = useState(""); 

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
      Anh: e.target.files[0], 
    }));
  };

  const handleSubmitNewBlog = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("newBlog", JSON.stringify(newBlog));

    if (newBlog.Anh) {
      formData.append("Anh", newBlog.Anh); 
    }

    setIsSubmitting(true);

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
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <>
      <Head>
        <title>Thêm Blog</title>
      </Head>
      <main className="app-content">
        <div className="app-title">
          <h1>Thêm Blog Mới</h1>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <h3 className="tile-title">Tạo Mới Blog</h3>
              <div className="tile-body">
                <Form onSubmit={handleSubmitNewBlog} className="row">
                  <Form.Group className="form-group col-md-4" controlId="formTenBlog">
                    <Form.Label>Tên Blog</Form.Label>
                    <Form.Control
                      type="text"
                      name="TenBlog"
                      value={newBlog.TenBlog}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="form-group col-md-4" controlId="formAnh">
                    <Form.Label>Ảnh Blog</Form.Label>
                    <Form.Control
                      type="file"
                      name="Anh"
                      onChange={handleFileChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="form-group col-md-4 mb-5" controlId="formTLuotXem">
                    <Form.Label>Lượt Xem</Form.Label>
                    <Form.Control
                      type="text"
                      name="LuotXem"
                      value={newBlog.LuotXem}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <div className="form-group col-md-12">
                    <Button
                      className="btn btn-save mr-3"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Đang Lưu..." : "Lưu Lại"}
                    </Button>
                    <a className="btn btn-cancel" href="/page/event">
                      Hủy Bỏ
                    </a>
                  </div>
                </Form>
                {statusMessage && <div className="status-message">{statusMessage}</div>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ThemBlog;