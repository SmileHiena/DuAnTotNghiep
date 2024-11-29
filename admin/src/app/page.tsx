'use client';
import React, { useEffect, useState } from "react";
type Invoice = {
  _id: string;
  id: number;
  userId: number;
  NgayMua: string;
  Rap: string;
  PhuongThucThanhToan: string;
  TenPhim: string;
  ThoiGian: string;
  NgayChieu: string;
  SoGhe: string[];
  PhongChieu: string;
  GiaVe: number;
  TongTien: number;
  TenKhachHang: string;
  Email: string;
  Combo: string | null;
  IdPhong: number;
  TrangThai: string;
  createdAt: string;
};

export default function Home() {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalInvoicesInMonth, setTotalInvoicesInMonth] = useState(0);
  const [totalMovies, setTotalMovies] = useState(0);


  useEffect(() => {
    // Gọi API để lấy danh sách khách hàng
    const fetchAccounts = async () => {
      try {
        const response = await fetch("http://localhost:3000/account");
        const data = await response.json();

        // Đếm số lượng khách hàng
        setTotalCustomers(data.length);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    // Hàm lấy hóa đơn và tính toán
    const fetchInvoices = async () => {
      try {
        const response = await fetch("http://localhost:3000/invoice");
        const data: Invoice[] = await response.json(); // Áp dụng kiểu `Invoice[]`

        // Lọc hóa đơn trong tháng hiện tại
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();

        const invoicesThisMonth = data.filter((invoice: Invoice) => {
          const invoiceDate = new Date(invoice.NgayMua);
          return (
            invoiceDate.getMonth() + 1 === currentMonth &&
            invoiceDate.getFullYear() === currentYear
          );
        });

        setTotalInvoicesInMonth(invoicesThisMonth.length);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:3000/movie");
        const data = await response.json();
    
        // Đếm tổng số sản phẩm
        setTotalMovies(data.length);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    
    fetchAccounts();
    fetchInvoices();
    fetchMovies();
  }, []);


  return (
    <main className="app-content">
      <div className="row">
        <div className="col-md-12">
          <div className="app-title">
            <ul className="app-breadcrumb breadcrumb">
              <li className="breadcrumb-item">
                <a href="#"><b>Bảng điều khiển</b></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        {/* Left */}
        <div className="col-md-12 col-lg-6">
          <div className="row">
            {/* Widget Tổng khách hàng */}
            <div className="col-md-6">
              <div className="widget-small primary coloured-icon">
                <i className="icon bx bxs-user-account fa-3x"></i>
                <div className="info">
                  <h4>Tổng khách hàng</h4>
                  <p><b>{totalCustomers} khách hàng</b></p>
                  <p className="info-tong">Tổng số khách hàng được quản lý.</p>
                </div>
              </div>
            </div>
            {/* Widget Tổng sản phẩm */}
            <div className="col-md-6">
              <div className="widget-small info coloured-icon">
                <i className="icon bx bxs-data fa-3x"></i>
                <div className="info">
                  <h4>Tổng sản phẩm</h4>
                  <p><b>{totalMovies} sản phẩm</b></p>
                  <p className="info-tong">Tổng số sản phẩm được quản lý.</p>
                </div>
              </div>
            </div>
            {/* Widget Tổng đơn hàng */}
            <div className="col-md-6">
              <div className="widget-small warning coloured-icon">
                <i className="icon bx bxs-shopping-bags fa-3x"></i>
                <div className="info">
                  <h4>Tổng đơn hàng</h4>
                  <p><b>{totalInvoicesInMonth} đơn hàng</b></p>
                  <p className="info-tong">Tổng số hóa đơn bán hàng trong tháng.</p>
                </div>
              </div>
            </div>
            {/* Widget Sắp hết hàng */}
            {/* <div className="col-md-6">
              <div className="widget-small danger coloured-icon">
                <i className="icon bx bxs-error-alt fa-3x"></i>
                <div className="info">
                  <h4>Sắp hết hàng</h4>
                  <p><b>4 sản phẩm</b></p>
                  <p className="info-tong">Số sản phẩm cảnh báo hết cần nhập thêm.</p>
                </div>
              </div>
            </div> */}
            {/* Tình trạng đơn hàng */}
            <div className="col-md-12">
              <div className="tile">
                <h3 className="tile-title">Tình trạng đơn hàng</h3>
                <div>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>ID đơn hàng</th>
                        <th>Tên khách hàng</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>AL3947</td>
                        <td>Phạm Thị Ngọc</td>
                        <td>19.770.000 đ</td>
                        <td><span className="badge bg-info">Chờ xử lý</span></td>
                      </tr>
                      {/* ... các hàng khác */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Khách hàng mới */}
            <div className="col-md-12">
              <div className="tile">
                <h3 className="tile-title">Khách hàng mới</h3>
                <div>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Tên khách hàng</th>
                        <th>Ngày sinh</th>
                        <th>Số điện thoại</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>#183</td>
                        <td>Hột vịt muối</td>
                        <td>21/7/1992</td>
                        <td><span className="tag tag-success">0921387221</span></td>
                      </tr>
                      {/* ... các hàng khác */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="col-md-12 col-lg-6">
          <div className="row">
            {/* Biểu đồ */}
            <div className="col-md-12">
              <div className="tile">
                <h3 className="tile-title">Dữ liệu 6 tháng đầu vào</h3>
                <div className="embed-responsive embed-responsive-16by9">
                  <canvas className="embed-responsive-item" id="lineChartDemo"></canvas>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="tile">
                <h3 className="tile-title">Thống kê 6 tháng doanh thu</h3>
                <div className="embed-responsive embed-responsive-16by9">
                  <canvas className="embed-responsive-item" id="barChartDemo"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center" style={{ fontSize: '13px' }}>
        {/* Có thể thêm nội dung ở đây */}
      </div>
    </main>
  );
}
