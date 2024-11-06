"use client"; // Mark this file as a client component

import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// Toast
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Blog = () => {
  const router = useRouter();
  const [blogList, setBlogList] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedBlog, setEditedBlog] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [editError, setEditError] = useState("");
  const [error, setError] = useState("");

  const notify = () => {
    toast.success('Xóa blog thành công!', {
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

  const notifyEditSuccess = () => {
    toast.success('Sửa bài viết thành công!', {
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

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:3000/blog");
        if (!response.ok) throw new Error("Failed to fetch blogs.");
        const data = await response.json();
        setBlogList(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) return;

    try {
      const response = await fetch(`http://localhost:3000/blog/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete blog.");

      // Update the blog list by filtering out the deleted blog
      setBlogList((prev) => prev.filter((blog) => blog._id !== id));

      notify();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleShowMore = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBlog(null);
  };

  const handleAddBlog = () => {
    router.push("/page/themblog");
  };

  const handleEditBlog = (blog) => {
    setEditedBlog(blog);
    setSelectedFile(null); // Reset file selection when editing
    setShowEditModal(true);
    setEditError(""); // Reset edit error when opening the edit modal
  };

  const handleSaveChanges = async () => {
    const { LuotXem } = editedBlog;

    // Validate "Lượt xem"
    if (LuotXem && isNaN(LuotXem)) {
      setEditError("Chỉ được nhập số lượt xem.");
      return;
    } else {
      setEditError(""); // Clear error if valid
    }

    const formData = new FormData();

    const blogData = {
      TenBlog: editedBlog.TenBlog,
      LuotXem: LuotXem || '0 lượt xem',
    };

    formData.append('newBlog', JSON.stringify(blogData));

    if (selectedFile) {
      formData.append('Anh', selectedFile);
    }

    try {
      const response = await fetch(`http://localhost:3000/blog/edit/${editedBlog._id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update blog.');
      }

      const result = await response.json();
      console.log('Update result:', result);
      notifyEditSuccess(); // Notify on successful edit
      setShowEditModal(false); // Close the modal on success
      // Refresh the blog list
      const updatedBlogs = blogList.map((blog) => blog._id === result._id ? result : blog);
      setBlogList(updatedBlogs);
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleNewBlogFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Update the selected file
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <main className="app-content">
      <Head>
        <title>Danh sách bài viết</title>
      </Head>
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <b>Danh sách bài viết</b>
          </li>
        </ul>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <div className="row element-button">
                <div className="col-sm-2">
                  <Button className="btn btn-add" onClick={handleAddBlog}>
                    <i className="fas fa-plus"></i> Thêm mới
                  </Button>
                </div>
              </div>
              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên blog</th>
                    <th>Ảnh</th>
                    <th>Lượt xem</th>
                    <th>Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {blogList.map((blog) => (
                    <tr key={blog._id}>
                      <td>{blog.id}</td>
                      <td>{blog.TenBlog}</td>
                      <td>
                        <img
                          src={blog.Anh}
                          alt={blog.TieuDe}
                          style={{ width: "100px", height: "auto" }}
                        />
                      </td>
                      <td>{blog.LuotXem} lượt xem</td>
                      <td className="table-td-center">
                        <button
                          className="btn btn-primary mr-3"
                          type="button"
                          title="Sửa"
                          onClick={() => handleEditBlog(blog)}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button
                          className="btn btn-danger mr-3"
                          type="button"
                          title="Xóa"
                          onClick={() => handleDelete(blog._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
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

      {/* Modal to show more info about the selected blog */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBlog?.TieuDe}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBlog && (
            <div>
              <img
                src={selectedBlog.Anh}
                alt={selectedBlog.TieuDe}
                style={{ width: "100%", height: "auto" }}
              />
              <p>{selectedBlog.NoiDung}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* Edit Blog Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thông tin bài viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="form-group col-md-6">
              <label className="control-label">Tên blog</label>
              <input
                className="form-control"
                type="text"
                value={editedBlog.TenBlog || ""}
                onChange={(e) => setEditedBlog({ ...editedBlog, TenBlog: e.target.value })}
              />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Lượt xem</label>
              <input
                className="form-control"
                type="text"
                value={editedBlog.LuotXem || ""}
                onChange={(e) => setEditedBlog({ ...editedBlog, LuotXem: e.target.value })}
              />
              {editError && <p style={{ color: 'red' }}>{editError}</p>}
            </div>
            <div className="form-group col-md-12">
              <label className="control-label">Chọn ảnh</label>
              <input
                type="file"
                onChange={handleNewBlogFileChange}
                accept="image/*"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSaveChanges} className="btn btn-save" >
            Lưu lại
          </Button>
          <Button onClick={() => setShowEditModal(false)} className="btn btn-cancel" >
            Hủy bỏ
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast container for notifications */}
      <ToastContainer />
    </main>
  );
};

export default Blog;