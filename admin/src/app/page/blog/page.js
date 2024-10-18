'use client';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation'; // Use Next.js Router

const Blog = () => {
  const router = useRouter(); // Initialize the router
  const [khuyenmai, setKhuyenMai] = useState([]);

  // Fetch blogs from API
  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:3000/blog/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched blogs:', data); // Check fetched data
      setKhuyenMai(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs(); // Call fetchBlogs when the component mounts
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/blog/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setKhuyenMai(khuyenmai.filter((km) => km._id !== id)); // Update state after deletion
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <main className="app-content">
      <Head>
        <title>Danh sách blog</title>
      </Head>
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#"><b>Danh sách blog</b></a>
          </li>
        </ul>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <div className="row element-button">
                <div className="col-sm-2">
                  <a className="btn btn-add btn-sm" href="/form-add-promotion" title="Thêm">
                    <i className="fas fa-plus"></i> Tạo mới blog
                  </a>
                </div>
              </div>
              <table className="table table-hover table-bordered" cellPadding="0" cellSpacing="0" border="0" id="sampleTable">
                <thead>
                  <tr>
                    <th>Mã blog</th>
                    <th>Tên blog</th>
                    <th>Ảnh blog</th>
                    <th>Lượt xem</th>
                    <th width="100">Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {khuyenmai.length > 0 ? (
                    khuyenmai.map((km) => (
                      <tr key={km._id}>
                        <td>{km._id}</td>
                        <td>{km.TenBlog}</td>
                        <td>
                          <img src={km.Anh} alt={km.TenBlog} style={{ height: '74px', width: '50px' }} />
                        </td>
                        <td>{km.LuotXem}</td>
                        <td className="table-td-center">
                          <button
                            className="btn btn-primary btn-sm trash"
                            type="button"
                            title="Xóa"
                            onClick={() => handleDelete(km._id)}
                          >
                            <FontAwesomeIcon icon={faTrash} style={{ color: "#de0400" }} />
                          </button>
                          <button
                            className="btn btn-primary btn-sm edit"
                            type="button"
                            title="Sửa"
                            data-toggle="modal"
                            data-target="#ModalUP"
                          >
                            <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#f59d39" }} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">Không có blog nào</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Blog;
