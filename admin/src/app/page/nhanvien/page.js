'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const NhanVien = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3000/employees/');
        const data = await response.json();
        setEmployees(data);
        setLoading(false);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu nhân viên:', error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  const handleEditClick = async (employeeId) => {
    const response = await fetch(`http://localhost:3000/employees/${employeeId}`);
    const data = await response.json();
    setCurrentEmployee(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentEmployee(null);
    setFile(null);
  };

  const handleSave = async () => {
    if (currentEmployee) {
        const formData = new FormData();
        formData.append('HoTen', currentEmployee.HoTen);
        formData.append('TenDangNhap', currentEmployee.TenDangNhap);
        formData.append('MatKhau', currentEmployee.MatKhau); // Nếu cần thiết
        formData.append('DiaChi', currentEmployee.DiaChi);
        formData.append('NgaySinh', currentEmployee.NgaySinh);
        formData.append('GioTinh', currentEmployee.GioTinh);
        formData.append('SDT', currentEmployee.SDT);
        formData.append('ChucVu', currentEmployee.ChucVu);
        formData.append('Tinhtrang', currentEmployee.Tinhtrang);
        if (file) {
            formData.append('Anh', file); // Thêm ảnh mới vào formData
        }

        try {
            await fetch(`http://localhost:3000/employees/edit/${currentEmployee._id}`, {
                method: 'PUT',
                body: formData,
            });

            // Cập nhật danh sách nhân viên mà không cần tải lại trang
            setEmployees((prev) =>
                prev.map((emp) => (emp._id === currentEmployee._id ? { ...currentEmployee, Anh: file ? `/images/${file.name}` : emp.Anh } : emp))
            );
            handleCloseModal();
        } catch (error) {
            console.error('Có lỗi xảy ra khi cập nhật nhân viên:', error);
        }
    }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDelete = async (employeeId) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa nhân viên này không?');

    if (confirmDelete) {
      try {
        await fetch(`http://localhost:3000/employees/delete/${employeeId}`, {
          method: 'DELETE',
        });

        setEmployees((prev) => prev.filter((emp) => emp._id !== employeeId));
      } catch (error) {
        console.error('Có lỗi xảy ra khi xóa nhân viên:', error);
      }
    }
  };

  return (
    <>
      <main className="app-content">
        <Head>
          <title>Danh sách nhân viên</title>
        </Head>
        <div className="app-title">
          <ul className="app-breadcrumb breadcrumb side">
            <li className="breadcrumb-item active">
              <a href="#"><b>Danh sách nhân viên</b></a>
            </li>
          </ul>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <div className="tile-body">
                <div className="row element-button">
                  <div className="col-sm-2">
                    <Link href="/page/themnhanvien" className="btn bg-[#F5CF49] font-bold">
                      <FontAwesomeIcon icon={faPlus} /> Thêm mới
                    </Link>
                  </div>
                </div>
                <table className="table table-hover table-bordered js-copytextarea" id="sampleTable">
                  <thead>
                    <tr>
                      <th>ID </th>
                      <th>Họ và tên</th>
                      <th>Tài khoản</th>
                      <th>Ảnh thẻ</th>
                      <th>Địa chỉ</th>
                      <th>Ngày sinh</th>
                      <th>Giới tính</th>
                      <th>SĐT</th>
                      <th>Chức vụ</th>
                      <th>Tình trạng</th>
                      <th>Tính năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.length > 0 ? (
                      employees.map((employee) => (
                        <tr key={employee._id}>
                          <td>{employee.id}</td>
                          <td>{employee.HoTen}</td>
                          <td>{employee.TenDangNhap}</td>
                          <td><img className="img-card-person" src={employee.Anh} alt={employee.HoTen} /></td>
                          <td>{employee.DiaChi}</td>
                          <td>{employee.NgaySinh}</td>
                          <td>{employee.GioTinh}</td>
                          <td>{employee.SDT}</td>
                          <td>{employee.ChucVu}</td>
                          <td>{employee.Tinhtrang}</td>
                          <td>
                            <button className="btn btn-primary btn-sm mr-3" type="button" onClick={() => handleEditClick(employee._id)}>
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            <button className="btn btn-danger btn-sm" type="button" onClick={() => handleDelete(employee._id)}>
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10">Không có nhân viên nào được tìm thấy</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal chỉnh sửa nhân viên */}
      <div className={`modal fade ${isModalOpen ? 'show' : ''}`} id="ModalUP" tabIndex="-1" role="dialog" aria-hidden={!isModalOpen} data-backdrop="static" data-keyboard="false" style={{ display: isModalOpen ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="row">
                <div className="form-group col-md-12">
                  <h5>Chỉnh sửa thông tin nhân viên</h5>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label className="control-label">ID nhân viên</label>
                  <input className="form-control" type="text" value={currentEmployee?._id || ''} disabled />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Họ và tên</label>
                  <input className="form-control" type="text" name="HoTen" value={currentEmployee?.HoTen || ''} onChange={handleInputChange} required />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Tài khoản</label>
                  <input className="form-control" type="text" value={currentEmployee?.TenDangNhap || ''} disabled />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Số điện thoại</label>
                  <input className="form-control" type="text" name="SDT" value={currentEmployee?.SDT || ''} onChange={handleInputChange} required />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Địa chỉ</label>
                  <input className="form-control" type="text" name="DiaChi" value={currentEmployee?.DiaChi || ''} onChange={handleInputChange} required />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Ngày sinh</label>
                  <input className="form-control" type="date" name="NgaySinh" value={currentEmployee?.NgaySinh?.split('T')[0] || ''} onChange={handleInputChange} required />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Giới tính</label>
                  <select className="form-control" name="GioTinh" value={currentEmployee?.GioTinh || ''} onChange={handleInputChange} required>
                    <option value="">Chọn giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Chức vụ</label>
                  <select className="form-control" name="ChucVu" value={currentEmployee?.ChucVu || ''} onChange={handleInputChange}>
                    <option>Bán hàng</option>
                    <option>Tư vấn</option>
                    <option>Dịch vụ</option>
                    <option>Thu Ngân</option>
                    <option>Quản kho</option>
                    <option>Bảo trì</option>
                    <option>Kiểm hàng</option>
                    <option>Bảo vệ</option>
                    <option>Tạp vụ</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Tình trạng</label>
                  <select className="form-control" name="Tinhtrang" value={currentEmployee?.Tinhtrang || ''} onChange={handleInputChange}>
                    <option value="">Chọn tình trạng</option>
                    <option value="Hoạt động">Hoạt động</option>
                    <option value="Nghỉ việc">Nghỉ việc</option>
                    <option value="Tạm nghỉ">Tạm nghỉ</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Ảnh thẻ</label>
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

export default NhanVien;
