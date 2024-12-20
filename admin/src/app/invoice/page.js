"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faFilter, faTrash, faPrint } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Ve = () => {
  const [hoaDon, setHoaDon] = useState([]);
  const [selectedHoaDon, setSelectedHoaDon] = useState(null);
  const [filteredHoaDon, setFilteredHoaDon] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/invoice/");
        const data = await response.json();
        setHoaDon(data);
        setFilteredHoaDon(data); 
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    fetchData();
  }, []);

  const handchangestate = async (id) => {
    try {
      console.log("ID được nhấn:", id);

      const isConfirmed = window.confirm('Bạn có chắc chắn muốn thay đổi trạng thái vé này?');

      if (!isConfirmed) {
        return;
      }

      const newStatus = "Đã xuất vé";
      const response = await fetch(`http://localhost:3000/checkout/update-status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ TrangThaiVe: newStatus }),
      });

      if (response.ok) {
        const updatedTicket = await response.json();

        setHoaDon(prevTickets =>
          prevTickets.map(ticket =>
            ticket.id === id ? { ...ticket, TrangThaiVe: newStatus } : ticket
          )
        );

        setTimeout(() => {
          window.location.reload(); 
        }, 3000);
        toast.success(`Cập nhật trạng thái thành công`);
      } else {
        console.error("Lỗi khi cập nhật trạng thái:", await response.json());
        toast.error("Cập nhật trạng thái thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái vé:", error);
      toast.error("Cập nhật trạng thái thất bại.");
    }
  };



  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/invoice/${id}`, {
        method: "DELETE",
      });
      setHoaDon(hoaDon.filter((item) => item.id !== id));
      setFilteredHoaDon(filteredHoaDon.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  const handleViewDetails = (invoice) => {
    setSelectedHoaDon(invoice);
  };

  const handlePrintCustom = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>In vé</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @media print {
              body { margin: 0; padding: 0; }
            }
          </style>
        </head>
        <body class="bg-gray-100">
          <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
            <div class="text-center mb-6">
              <h1 class="text-2xl font-bold text-gray-800">Chi tiết vé</h1>
            </div>
  
            <div class="space-y-4">
              <div>
                <h3 class="font-semibold text-gray-700">Thông tin khách hàng</h3>
                <p class="text-gray-600"><span class="font-bold">Khách hàng:</span> ${selectedHoaDon.TenKhachHang}</p>
                <p class="text-gray-600"><span class="font-bold">Email:</span> ${selectedHoaDon.Email}</p>
              </div>
  
              <div>
                <h3 class="font-semibold text-gray-700">Thông tin vé</h3>
                <p class="text-gray-600"><span class="font-bold">Phim:</span> ${selectedHoaDon.TenPhim}</p>
                <p class="text-gray-600"><span class="font-bold">Rạp:</span> ${selectedHoaDon.Rap}</p>
                <p class="text-gray-600"><span class="font-bold">Phòng chiếu:</span> ${selectedHoaDon.PhongChieu}</p>
                <p class="text-gray-600"><span class="font-bold">Thời gian:</span> ${selectedHoaDon.ThoiGian}</p>
                <p class="text-gray-600"><span class="font-bold">Ngày chiếu:</span> ${selectedHoaDon.NgayChieu}</p>
                <p class="text-gray-600"><span class="font-bold">Ghế:</span> ${selectedHoaDon.SoGhe}</p>
              </div>
  
              <div>
                <h3 class="font-semibold text-gray-700">Thông tin thanh toán</h3>
                <p class="text-gray-600"><span class="font-bold">Combo:</span> ${selectedHoaDon.Combo ? selectedHoaDon.Combo : "Không"}</p>
                <p class="text-gray-600"><span class="font-bold">Tổng tiền:</span> ${selectedHoaDon.TongTien} VND</p>
                <p class="text-gray-600"><span class="font-bold">Trạng thái:</span> ${selectedHoaDon.TrangThai}</p>
                <p class="text-gray-600"><span class="font-bold">Ngày tạo vé:</span>${new Date(selectedHoaDon.createdAt).toLocaleDateString('vi-VN')}</p>                
              </div>
            </div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };



  
  const handleFilter = () => {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const filtered = hoaDon.filter((item) => {
      const ngayMua = new Date(item.NgayMua);
      const matchesDateRange = (!start || ngayMua >= start) && (!end || ngayMua <= end);
      const matchesSearchQuery = item.Email && item.Email.includes(searchQuery);
      return matchesDateRange && matchesSearchQuery;
    });

    setFilteredHoaDon(filtered);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, '0'); 
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear(); 
    return `${day}/${month}/${year}`;
  };


  return (
    <main className="app-content">
      <Head>
        <title>Danh sách hóa đơn</title>
      </Head>
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#">
              <b>Danh sách hóa đơn</b>
            </a>
          </li>
        </ul>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <div className="row align-items-end element-button">
                {/* Search Input */}
                <div className="col-sm-3">
                  <label htmlFor="searchQuery">Tìm kiếm theo Email:</label>
                  <input
                    type="text"
                    id="searchQuery"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control"
                    placeholder="Nhập Email"
                  />
                </div>

                {/* Date Filter Inputs */}
                <div className="col-sm-3">
                  <label htmlFor="startDate">Từ ngày:</label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="col-sm-3">
                  <label htmlFor="endDate">Đến ngày:</label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="col-sm-3">
                  <button className="btn btn-success" onClick={handleFilter}>
                    <i className="fa fa-filter"></i>
                  </button>
                </div>
              </div>


              <table className="table table-hover table-bordered" id="sampleTable">
                <thead>
                  <tr>
                    <th style={{ verticalAlign: 'middle' }} width="50">STT</th>
                    <th style={{ verticalAlign: 'middle' }}>Tên Khách hàng</th>
                    <th style={{ verticalAlign: 'middle' }}>Email</th>
                    <th style={{ verticalAlign: 'middle' }}>Ngày Mua Vé</th>
                    <th style={{ verticalAlign: 'middle' }}>Ngày Tạo Vé</th>
                    <th style={{ verticalAlign: 'middle' }} width="150">Phương thức thanh toán</th>
                    <th style={{ verticalAlign: 'middle' }}>Tổng tiền (VND)</th>
                    <th style={{ verticalAlign: 'middle' }}>Tình trạng</th>
                    <th style={{ verticalAlign: 'middle' }}>Trang thái Đơn vé</th>
                    <th style={{ verticalAlign: 'middle' }} width="70">Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHoaDon.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.TenKhachHang}</td>
                      <td>{item.Email}</td>
                      <td>{new Date(item.NgayMua).toLocaleDateString("vi-VN", { year: "numeric", month: "2-digit", day: "2-digit", })}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString("vi-VN", { year: "numeric", month: "2-digit", day: "2-digit", })}</td>
                      <td>{item.PhuongThucThanhToan}</td>
                      <td>
                        {item.TongTien
                          ? item.TongTien.toLocaleString() + " VND"
                          : "N/A"}
                      </td>
                      <td>{item.TrangThai}</td>
                      <td>  <button
                        onClick={() => handchangestate(item.id)} 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:border-2 focus:border-white"
                      >
                        {item.TrangThaiVe === "Chưa xuất vé" ? "Xuất Vé" : "Đã Xuất"}
                      </button></td>
                      {/* <toast.Container /> */}
                      <td className="table-td-center">
                        <button
                          className="btn btn-info"
                          onClick={() => handleViewDetails(item)}
                        >
                          <FontAwesomeIcon icon={faFileAlt} />
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

      {/* Detail Box Modal */}
      {selectedHoaDon && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
              <h5 className="text-lg font-bold">Chi tiết vé</h5>
              <button
                type="button"
                className="text-white text-2xl font-bold"
                onClick={() => setSelectedHoaDon(null)}
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <div className="flex justify-between mb-4">
                <div>
                  <p><strong>Khách hàng:</strong> {selectedHoaDon.TenKhachHang}</p>
                  <p><strong>Email:</strong> {selectedHoaDon.Email}</p>
                  <p><strong>Phim:</strong> {selectedHoaDon.TenPhim}</p>
                  <p><strong>Rạp:</strong> {selectedHoaDon.Rap}</p>
                  <p><strong>Phòng chiếu:</strong> {selectedHoaDon.PhongChieu}</p>
                  <p><strong>Thời gian:</strong> {selectedHoaDon.ThoiGian}</p>
                  <p><strong>Ngày chiếu:</strong> {selectedHoaDon.NgayChieu}</p>
                  <p><strong>Ghế:</strong> {selectedHoaDon.SoGhe}</p>
                </div>
              </div>
              <div className="flex justify-between mb-4">
                <div>
                  <p><strong>Combo:</strong> {selectedHoaDon.Combo}</p>
                  <p><strong>Tổng tiền: </strong> {selectedHoaDon.TongTien} VND</p>
                  <p><strong>Trạng thái: </strong> {selectedHoaDon.TrangThai}</p>
                  <p><strong>Ngày tạo vé: </strong>{new Date(selectedHoaDon.createdAt).toLocaleDateString('vi-VN')}</p>

                </div>
              </div>
            </div>
            <div className="flex justify-end p-4">
              <button
                className="btn btn-info mr-3"
                onClick={handlePrintCustom}
              >
                <FontAwesomeIcon icon={faPrint} /> In
              </button>
              <button
                className="btn btn-cancel"
                onClick={() => handleDelete(selectedHoaDon.id)}
              >
                <FontAwesomeIcon icon={faTrash} /> Xóa
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable pauseOnFocusLoss />
    </main>
  );
};

export default Ve;
