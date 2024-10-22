'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Combo = () => {
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCombo, setCurrentCombo] = useState(null);
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCombos = async () => {
      try {
        const response = await fetch('http://localhost:3000/combo/');
        const data = await response.json();
        setCombos(data);
        setLoading(false);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu combo:', error);
        setLoading(false);
      }
    };

    fetchCombos();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  const handleEditClick = async (comboId) => {
    const response = await fetch(`http://localhost:3000/combo/${comboId}`);
    const data = await response.json();
    setCurrentCombo(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCombo(null);
    setFile(null);
    setErrorMessage('');
  };

  const handleSave = async () => {
    if (currentCombo) {
      const formData = new FormData();
      formData.append('TenCombo', currentCombo.TenCombo);
      formData.append('NoiDung', currentCombo.NoiDung);
      formData.append('Gia', currentCombo.Gia); // Giá vẫn được gửi
      if (file) {
        formData.append('Anh', file);
      }

      try {
        await fetch(`http://localhost:3000/combo/edit/${currentCombo._id}`, {
          method: 'PUT',
          body: formData,
        });

        setCombos((prev) =>
          prev.map((cmb) => (cmb._id === currentCombo._id ? { ...currentCombo, Anh: file ? `/images/${file.name}` : cmb.Anh } : cmb))
        );
        handleCloseModal();
      } catch (error) {
        console.error('Có lỗi xảy ra khi cập nhật combo:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCombo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDelete = async (comboId) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa combo này không?');

    if (confirmDelete) {
      try {
        await fetch(`http://localhost:3000/combo/delete/${comboId}`, {
          method: 'DELETE',
        });

        setCombos((prev) => prev.filter((cmb) => cmb._id !== comboId));
      } catch (error) {
        console.error('Có lỗi xảy ra khi xóa combo:', error);
      }
    }
  };

  return (
    <>
      <main className="app-content">
        <Head>
          <title>Danh sách combo</title>
        </Head>
        <div className="app-title">
          <ul className="app-breadcrumb breadcrumb side">
            <li className="breadcrumb-item active">
              <a href="#"><b>Danh sách combo</b></a>
            </li>
          </ul>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <div className="tile-body">
                <div className="row element-button">
                  <div className="col-sm-2">
                    <Link href="/page/themcombo" className="btn bg-[#F5CF49] font-bold">
                      <FontAwesomeIcon icon={faPlus} /> Thêm mới
                    </Link>
                  </div>
                </div>
              </div>
              <table
                className="table table-hover table-bordered"
                cellPadding="0"
                cellSpacing="0"
                border="0"
                id="sampleTable"
              >
                <thead>
                  <tr>
                    <th>Mã combo</th>
                    <th>Tên combo</th>
                    <th>Ảnh combo</th>
                    <th>Nội dung</th>
                    <th>Giá (VND)</th>
                    <th width="100">Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {combo.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.Ten}</td>
                      <td>
                        <img
                          src={item.image}
                          alt={item.Ten}
                          style={{ height: '74px', width: '50px' }}
                        />
                      </td>
                      <td>{item.NoiDung}</td>
                      <td>{item.Gia.toLocaleString()} VND</td>
                      <td className="table-td-center">
                        <button
                          className="btn btn-primary btn-sm trash"
                          type="button"
                          title="Xóa"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            bounce
                            style={{ color: '#de0400' }}
                          />
                        </button>
                        <button
                          className="btn btn-primary btn-sm edit"
                          type="button"
                          title="Sửa"
                          data-toggle="modal"
                          data-target="#ModalUP"
                        >
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            bounce
                            style={{ color: '#f59d39' }}
                          />
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
    </main>
  );
};

export default Combo;
