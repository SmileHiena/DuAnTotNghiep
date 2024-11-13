"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faFilter, faPrint } from "@fortawesome/free-solid-svg-icons";

const Ve = () => {
  const [hoaDon, setHoaDon] = useState([]);
  const [selectedHoaDon, setSelectedHoaDon] = useState(null);
  const [filteredHoaDon, setFilteredHoaDon] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/hoadon/");
        const data = await response.json();
        setHoaDon(data);
        setFilteredHoaDon(data); // Initialize filtered data with full list
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/hoadon/${id}`, {
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

  const handlePrint = () => {
    window.print();
  };

  // Filter invoices based on selected date range and search query
  const handleFilter = () => {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const filtered = hoaDon.filter((item) => {
      const ngayMua = new Date(item.NgayMua);
      const matchesDateRange = (!start || ngayMua >= start) && (!end || ngayMua <= end);
      const matchesSearchQuery = item.id.toString().includes(searchQuery) || item._id.toString().includes(searchQuery);
      return matchesDateRange && matchesSearchQuery;
    });

    setFilteredHoaDon(filtered);
  };


  return (
    <main className="app-content">
      <Head>
        <title>Danh sách Vé</title>
      </Head>
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#">
              <b>Danh sách Vé</b>
            </a>
          </li>
        </ul>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <div className="row element-button">
                {/* Search Input */}
                <div className="col-sm-4 d-flex align-items-center">
                  <label htmlFor="searchQuery" className="mr-3" style={{ whiteSpace: 'nowrap' }}>Tìm kiếm theo mã hóa đơn:</label>
                  <input type="text" id="searchQuery" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="form-control" placeholder="Nhập Mã hóa đơn" />
                </div>

                {/* Date Filter Inputs */}
                <div className="col-sm-4 d-flex align-items-center">
                  <div className="d-flex align-items-center mr-3">
                    <label htmlFor="startDate" className="mr-3" style={{ whiteSpace: 'nowrap' }}>Từ ngày:</label>
                    <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="form-control mr-3" />
                  </div>
                  <div className="d-flex align-items-center">
                    <label htmlFor="endDate" className="mr-3" style={{ whiteSpace: 'nowrap' }}>Đến ngày:</label>
                    <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="form-control" />
                  </div>
                </div>

                {/* Filter Button */}
                <div className="col-sm-4 d-flex align-items-center justify-content-start">
                  <button className="btn btn-save mt-0 ml-2" onClick={handleFilter}><FontAwesomeIcon icon={faFilter} /></button>
                </div>
              </div>

              <table className="table table-hover table-bordered" cellPadding="0" cellSpacing="0" border="0" id="sampleTable">
                <thead>
                  <tr>
                    <th width="50">STT</th>
                    <th>Tên Khách hàng</th>
                    <th>Mã hóa đơn</th>
                    <th>Ngày Mua Vé</th>
                    <th>Ngày Tạo Vé</th>
                    <th>Phương thức thanh toán</th>
                    <th>Tổng tiền (VND)</th>
                    <th>Tình trạng</th>
                    <th width="100">Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHoaDon.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.TenKhachHang}</td>
                      <td>{item._id}</td>
                      <td>{item.NgayMua}</td>
                      <td>{item.createdAt}</td>
                      <td>{item.PhuongThucThanhToan}</td>
                      <td>{item.TongTien ? item.TongTien.toLocaleString() + " VND" : "N/A"}</td>
                      <td>{item.TrangThai}</td>
                      <td className="table-td-center"><button className="btn btn-info" type="button" onClick={() => handleViewDetails(item)}><FontAwesomeIcon icon={faFileAlt} /></button>
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
      {
        selectedHoaDon && (
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
                    <p className="text-sm"><strong>Khách hàng:</strong> {selectedHoaDon.TenKhachHang}</p>
                    <p className="text-sm"><strong>Email:</strong> {selectedHoaDon.Email}</p>
                    <p className="text-sm"><strong>Phim:</strong> {selectedHoaDon.TenPhim}</p>
                    <p className="text-sm"><strong>Rạp:</strong> {selectedHoaDon.Rap}</p>
                  </div>
                  <div>
                    <p className="text-sm"><strong>Phòng chiếu:</strong> {selectedHoaDon.PhongChieu}</p>
                    <p className="text-sm"><strong>Thời gian:</strong> {selectedHoaDon.ThoiGian}</p>
                    <p className="text-sm"><strong>Ngày chiếu:</strong> {selectedHoaDon.NgayChieu}</p>
                    <p className="text-sm"><strong>Ghế:</strong> {selectedHoaDon.SoGhe}</p>
                  </div>
                </div>
                <div className="border-t-2 border-dashed border-gray-300 my-4"></div>
                <p className="text-sm"><strong>Combo:</strong> {selectedHoaDon.Combo}</p>
                <p className="text-sm"><strong>Tổng tiền:</strong> {selectedHoaDon.TongTien} VND</p>
                <p className="text-sm"><strong>Trạng thái:</strong> {selectedHoaDon.TrangThai}</p>
                <p className="text-sm"><strong>Ngày tạo vé:</strong> {selectedHoaDon.createdAt}</p>
              </div>
              <div className="bg-gray-100 p-4 flex justify-around">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center" onClick={handlePrint}><FontAwesomeIcon icon={faPrint} className="mr-2" /> In vé</button>
                <button type="button" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700" onClick={() => setSelectedHoaDon(null)}>Đóng</button>
              </div>
            </div>
          </div>
        )
      }

    </main >
  );
};

export default Ve;