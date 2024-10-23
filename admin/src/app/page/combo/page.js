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
                <table className="table table-hover table-bordered js-copytextarea" id="sampleTable">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tên combo</th>
                      <th>Nội dung</th>
                      <th>Giá</th>
                      <th>Ảnh</th>
                      <th>Tính năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {combos.length > 0 ? (
                      combos.map((combo) => (
                        <tr key={combo._id}>
                          <td>{combo.id}</td>
                          <td>{combo.TenCombo}</td>
                          <td>{combo.NoiDung}</td>
                          <td>{formatCurrency(combo.Gia)}</td>
                          <td><img className="img-card-person" src={combo.Anh} alt={combo.TenCombo} /></td>
                          <td>
                            <button className="btn btn-primary btn-sm mr-3" type="button" onClick={() => handleEditClick(combo._id)}>
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            <button className="btn btn-danger btn-sm" type="button" onClick={() => handleDelete(combo._id)}>
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">Không có combo nào được tìm thấy</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal chỉnh sửa combo */}
      <div className={`modal fade ${isModalOpen ? 'show' : ''}`} id="ModalUP" tabIndex="-1" role="dialog" aria-hidden={!isModalOpen} data-backdrop="static" data-keyboard="false" style={{ display: isModalOpen ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="row">
                <div className="form-group col-md-12">
                  <h5>Chỉnh sửa thông tin combo</h5>
                  {errorMessage && <p className="text-danger">{errorMessage}</p>}
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label className="control-label">ID combo</label>
                  <input className="form-control" type="text" value={currentCombo?._id || ''} disabled />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Tên combo</label>
                  <input className="form-control" type="text" name="TenCombo" value={currentCombo?.TenCombo || ''} onChange={handleInputChange} required />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Nội dung</label>
                  <input className="form-control" type="text" name="NoiDung" value={currentCombo?.NoiDung || ''} onChange={handleInputChange} required />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Giá</label>
                  <input className="form-control" type="number" name="Gia" value={currentCombo?.Gia || ''} onChange={handleInputChange} required />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Ảnh</label>
                  <input className="form-control" type="file" onChange={handleFileChange} />
                </div>
              </div>
              <button className="btn btn-save mr-3" type="button" onClick={handleSave}>Lưu lại</button>
              <button className="btn btn-cancel" type="button" onClick={handleCloseModal}>Hủy bỏ</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Combo;