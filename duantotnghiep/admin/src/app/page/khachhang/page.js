'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faPlus, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify'; // Thêm import cho ToastContainer và toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho Toast

const TaiKhoan = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('http://localhost:3000/taikhoan/');
        const data = await response.json();
        setAccounts(data);
        setLoading(false);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu tài khoản:', error);
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Kiểm tra số điện thoại có đúng 10 chữ số không
    return phoneRegex.test(phone);
  };

  const handleEditClick = async (accountId) => {
    const response = await fetch(`http://localhost:3000/taikhoan/${accountId}`);
    const data = await response.json();
    setCurrentAccount(data);
    setIsModalOpen(true);
    setCurrentAccount((prev) => ({ ...prev, originalSDT: data.SDT })); // Lưu số điện thoại gốc
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentAccount(null);
    setFile(null);
    setErrorMessage(''); // Reset thông báo lỗi khi đóng modal
  };

  const handleSave = async () => {
    if (currentAccount) {
      // Kiểm tra số điện thoại
      if (!validatePhoneNumber(currentAccount.SDT)) {
        setErrorMessage('Số điện thoại phải có 10 chữ số.');
        return; // Ngừng thực hiện nếu số điện thoại không hợp lệ
      }

      // Chỉ kiểm tra sự tồn tại của số điện thoại nếu nó đã được thay đổi
      const originalPhoneNumber = currentAccount.originalSDT; // Sử dụng số điện thoại gốc
      if (currentAccount.SDT !== originalPhoneNumber) {
        const response = await fetch(`http://localhost:3000/taikhoan/check-username`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ SDT: currentAccount.SDT, id: currentAccount._id })
        });

        const result = await response.json();
        if (!response.ok) {
          setErrorMessage(result.message);
          return; // Ngừng thực hiện nếu số điện thoại đã tồn tại
        }
      }

      const formData = new FormData();
      formData.append('Ten', currentAccount.Ten);
      formData.append('TenDangNhap', currentAccount.TenDangNhap);
      formData.append('MatKhau', currentAccount.MatKhau); // Nếu cần thiết
      formData.append('DiaChi', currentAccount.DiaChi);
      formData.append('NgaySinh', currentAccount.NgaySinh);
      formData.append('GioiTinh', currentAccount.GioiTinh);
      formData.append('SDT', currentAccount.SDT);
      formData.append('Email', currentAccount.Email);
      if (file) {
        formData.append('Anh', file); // Thêm ảnh mới vào formData
      }

      try {
        await fetch(`http://localhost:3000/taikhoan/edit/${currentAccount._id}`, {
          method: 'PUT',
          body: formData,
        });

        // Cập nhật danh sách tài khoản mà không cần tải lại trang
        setAccounts((prev) =>
          prev.map((acc) => (acc._id === currentAccount._id ? { ...currentAccount, Anh: file ? `/${file.name}` : acc.Anh } : acc))
        );

        toast.success('Cập nhật tài khoản thành công!'); // Hiển thị thông báo thành công
        handleCloseModal();
      } catch (error) {
        console.error('Có lỗi xảy ra khi cập nhật tài khoản:', error);
        toast.error('Có lỗi xảy ra khi cập nhật tài khoản.'); // Hiển thị thông báo lỗi
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDelete = async (accountId) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa tài khoản này không?');

    if (confirmDelete) {
      try {
        await fetch(`http://localhost:3000/taikhoan/delete/${accountId}`, {
          method: 'DELETE',
        });

        setAccounts((prev) => prev.filter((acc) => acc._id !== accountId));
        toast.success('Xóa tài khoản thành công!'); // Hiển thị thông báo thành công
      } catch (error) {
        console.error('Có lỗi xảy ra khi xóa tài khoản:', error);
        toast.error('Có lỗi xảy ra khi xóa tài khoản.'); // Hiển thị thông báo lỗi
      }
    }
  };

  const handleLock = async (accountId) => {
    const confirmLock = window.confirm('Bạn có chắc chắn muốn khóa tài khoản này không?');

    if (confirmLock) {
      try {
        await fetch(`http://localhost:3000/taikhoan/lock/${accountId}`, {
          method: 'PUT',
        });

        // Cập nhật danh sách tài khoản mà không cần tải lại trang
        setAccounts((prev) =>
          prev.map((acc) => (acc._id === accountId ? { ...acc, IsAdmin: false } : acc)) // Cập nhật trạng thái
        );

        toast.success('Khóa tài khoản thành công!'); // Hiển thị thông báo thành công
      } catch (error) {
        console.error('Có lỗi xảy ra khi khóa tài khoản:', error);
        toast.error('Có lỗi xảy ra khi khóa tài khoản.'); // Hiển thị thông báo lỗi
      }
    }
  };

  const handleUnlock = async (accountId) => {
    const confirmUnlock = window.confirm('Bạn có chắc chắn muốn mở khóa tài khoản này không?');

    if (confirmUnlock) {
      try {
        await fetch(`http://localhost:3000/taikhoan/unlock/${accountId}`, {
          method: 'PUT',
        });

        // Cập nhật danh sách tài khoản mà không cần tải lại trang
        setAccounts((prev) =>
          prev.map((acc) => (acc._id === accountId ? { ...acc, IsAdmin: true } : acc)) // Cập nhật trạng thái
        );

        toast.success('Mở khóa tài khoản thành công!'); // Hiển thị thông báo thành công
      } catch (error) {
        console.error('Có lỗi xảy ra khi mở khóa tài khoản:', error);
        toast.error('Có lỗi xảy ra khi mở khóa tài khoản.'); // Hiển thị thông báo lỗi
      }
    }
  };

  return (
    <>
      <main className="app-content">
        <Head>
          <title>Danh sách tài khoản</title>
        </Head>
        <div className="app-title">
          <ul className="app-breadcrumb breadcrumb side">
            <li className="breadcrumb-item active">
              <a href="#"><b>Danh sách tài khoản</b></a>
            </li>
          </ul>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <div className="tile-body">
                <div className="row element-button">
                  <div className="col-sm-2">
                    {/* <Link href="#" className="btn bg-[#F5CF49] font-bold">
                      <FontAwesomeIcon icon={faPlus} /> Thêm mới
                    </Link> */}
                  </div>
                </div>
                <table className="table table-hover table-bordered js-copytextarea" id="sampleTable">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tên</th>
                      <th>Tên đăng nhập</th>
                      <th>Ảnh thẻ</th>
                      <th>Địa chỉ</th>
                      <th>Ngày sinh</th>
                      <th>Giới tính</th>
                      <th>SĐT</th>
                      <th>Email</th>
                      <th>Tính năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts.length > 0 ? (
                      accounts.map((account) => (
                        <tr key={account._id}>
                          <td>{account.id}</td>
                          <td>{account.Ten}</td>
                          <td>{account.TenDangNhap}</td>
                          {/* <td><img className="img-card-person" src={account.Anh} alt={account.Ten} /></td> */}
                          <td><img className="img-card-person" src={`http://localhost:3000/images/${account.Anh}`} alt={account.Ten} /></td>
                          <td>{account.DiaChi}</td>
                          <td>{account.NgaySinh}</td>
                          <td>{account.GioiTinh}</td>
                          <td>{account.SDT}</td>
                          <td>{account.Email}</td>
                          <td>
                            <button className="btn btn-primary mr-3" type="button" onClick={() => handleEditClick(account._id)}>
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            <button className="btn btn-danger mr-3" type="button" onClick={() => handleDelete(account._id)}>
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                            {account.IsAdmin ? (
                              <button className="btn btn-warning" type="button" onClick={() => handleLock(account._id)}>
                                <FontAwesomeIcon icon={faLock} />
                              </button>
                            ) : (
                              <button className="btn btn-success" type="button" onClick={() => handleUnlock(account._id)}>
                                <FontAwesomeIcon icon={faUnlock} />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10">Không có tài khoản nào được tìm thấy</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal chỉnh sửa tài khoản */}
      <div className={`modal fade ${isModalOpen ? 'show' : ''}`} id="ModalUP" tabIndex="-1" role="dialog" aria-hidden={!isModalOpen} data-backdrop="static" data-keyboard="false" style={{ display: isModalOpen ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="row">
                <div className="form-group col-md-12">
                  <h5>Chỉnh sửa thông tin tài khoản</h5>
                  {errorMessage && <p className="text-danger">{errorMessage}</p>} {/* Hiển thị thông báo lỗi */}
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label className="control-label">Tên</label>
                  <input className="form-control" type="text" name="Ten" value={currentAccount?.Ten || ''} onChange={handleInputChange} />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Tên đăng nhập</label>
                  <input className="form-control" type="text" name="TenDangNhap" value={currentAccount?.TenDangNhap || ''} onChange={handleInputChange} />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label className="control-label">SĐT</label>
                  <input className="form-control" type="text" name="SDT" value={currentAccount?.SDT || ''} onChange={handleInputChange} />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Email</label>
                  <input className="form-control" type="email" name="Email" value={currentAccount?.Email || ''} onChange={handleInputChange} />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label className="control-label">Địa chỉ</label>
                  <input className="form-control" type="text" name="DiaChi" value={currentAccount?.DiaChi || ''} onChange={handleInputChange} />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Ngày sinh</label>
                  <input className="form-control" type="date" name="NgaySinh" value={currentAccount?.NgaySinh || ''} onChange={handleInputChange} />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label className="control-label">Giới tính</label>
                  <select className="form-control" name="GioiTinh" value={currentAccount?.GioiTinh || ''} onChange={handleInputChange}>
                    <option value="">Chọn giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Ảnh thẻ</label>
                  <input className="form-control" type="file" onChange={handleFileChange} />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-12">
                  <button className="btn btn-save mr-3" onClick={handleSave}>Lưu</button>
                  <button className="btn btn-cancel" onClick={handleCloseModal}>Hủy</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer /> {/* Thêm ToastContainer vào cuối để hiển thị thông báo */}
    </>
  );
};

export default TaiKhoan;