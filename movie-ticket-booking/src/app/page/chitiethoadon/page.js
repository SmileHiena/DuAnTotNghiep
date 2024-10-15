"use client";
import React from "react";
import html2canvas from "html2canvas";

const ChiTietHoaDon = () => {
  const HoaDon = [
    {
      id: "123456789",
      NgayMua: "01/01/2024",
      Rap: "Ticker Man",
      Pttt: "Momo",
      TenPhim: "Làm giàu với ma",
      ThoiGian: "18h:30",
      NgayChieu: "02/01/2024",
      SoGhe: "A3",
      PhongChieu: "Phòng 1",
      GiaVe: "150.000 VNĐ",
      TongTien: "150.000 VNĐ",
      TenKhachHang: "Nguyễn Văn A",
      Email: "nguyenvana@example.com",
    },
  ];

  const handleDownload = () => {
    const input = document.getElementById("invoice");
    html2canvas(input)
      .then((canvas) => {
        const link = document.createElement("a");
        link.download = "hoa_don.png"; // Tên file tải xuống
        link.href = canvas.toDataURL(); // Chuyển đổi canvas thành hình ảnh
        link.click();
      })
      .catch((error) => {
        console.error("Error generating image: ", error);
      });
  };

  return (
    <div className="max-w-full flex flex-col items-center justify-center mx-auto p-4 sm:p-6 bg-[rgba(0,0,0,0.3)]" style={{ maxWidth: '1410px' }}>
      <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center mb-4">CHI TIẾT HÓA ĐƠN</h2>
      <div className="overflow-hidden shadow-lg rounded-lg border border-gray-700" style={{ width: '50%' }} id="invoice">
        <table className="min-w-full bg-[rgba(0,0,0,0.5)] mx-auto">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-2 px-3 text-left text-sm">Thông tin</th>
              <th className="py-2 px-3 text-left text-sm">Chi tiết</th>
            </tr>
          </thead>
          <tbody className="text-white text-sm">
            {HoaDon.map((hoaDon) => (
              <React.Fragment key={hoaDon.id}>
                <tr className="hover:bg-gray-600 transition duration-200">
                  <td className="py-2 px-3 border-b border-gray-600">{`Mã hóa đơn:`}</td>
                  <td className="py-2 px-3 border-b border-gray-600">{hoaDon.id}</td>
                </tr>
                <tr className="hover:bg-gray-600 transition duration-200">
                  <td className="py-2 px-3 border-b border-gray-600">{`Ngày mua:`}</td>
                  <td className="py-2 px-3 border-b border-gray-600">{hoaDon.NgayMua}</td>
                </tr>
                <tr className="hover:bg-gray-600 transition duration-200">
                  <td className="py-2 px-3 border-b border-gray-600">{`Rạp:`}</td>
                  <td className="py-2 px-3 border-b border-gray-600">{hoaDon.Rap}</td>
                </tr>
                <tr className="hover:bg-gray-600 transition duration-200">
                  <td className="py-2 px-3 border-b border-gray-600">{`Phương thức thanh toán:`}</td>
                  <td className="py-2 px-3 border-b border-gray-600">{hoaDon.Pttt}</td>
                </tr>
                <tr className="hover:bg-gray-600 transition duration-200">
                  <td className="py-2 px-3 border-b border-gray-600">{`Tên phim:`}</td>
                  <td className="py-2 px-3 border-b border-gray-600">{hoaDon.TenPhim}</td>
                </tr>
                <tr className="hover:bg-gray-600 transition duration-200">
                  <td className="py-2 px-3 border-b border-gray-600">{`Thời gian chiếu:`}</td>
                  <td className="py-2 px-3 border-b border-gray-600">{hoaDon.ThoiGian}, {hoaDon.NgayChieu}</td>
                </tr>
                <tr className="hover:bg-gray-600 transition duration-200">
                  <td className="py-2 px-3 border-b border-gray-600">{`Số ghế:`}</td>
                  <td className="py-2 px-3 border-b border-gray-600">{hoaDon.SoGhe}</td>
                </tr>
                <tr className="hover:bg-gray-600 transition duration-200">
                  <td className="py-2 px-3 border-b border-gray-600">{`Phòng chiếu:`}</td>
                  <td className="py-2 px-3 border-b border-gray-600">{hoaDon.PhongChieu}</td>
                </tr>
                <tr className="hover:bg-gray-600 transition duration-200">
                  <td className="py-2 px-3 border-b border-gray-600">{`Giá vé:`}</td>
                  <td className="py-2 px-3 border-b border-gray-600">{hoaDon.GiaVe}</td>
                </tr>
                <tr className="hover:bg-gray-600 transition duration-200">
                  <td className="py-2 px-3 border-b border-gray-600">{`Tổng tiền:`}</td>
                  <td className="py-2 px-3 border-b border-gray-600">{hoaDon.TongTien}</td>
                </tr>
                <tr className="hover:bg-gray-600 transition duration-200">
                  <td className="py-2 px-3 border-b border-gray-600">{`Tên khách hàng:`}</td>
                  <td className="py-2 px-3 border-b border-gray-600">{hoaDon.TenKhachHang}</td>
                </tr>
                <tr className="hover:bg-gray-600 transition duration-200">
                  <td className="py-2 px-3 border-b border-gray-600">{`Email:`}</td>
                  <td className="py-2 px-3 border-b border-gray-600">{hoaDon.Email}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
        <button
          style={{ backgroundColor: '#F5CF49', width: '150px', height: '40px' }} // Đặt kích thước nút
          className="hover:bg-yellow-600 text-black py-1 px-3 rounded shadow-md transition duration-200"
          onClick={handleDownload} // Thêm sự kiện onClick
        >
          Tải Xuống
        </button>
        <button
          style={{ backgroundColor: '#F5CF49', width: '150px', height: '40px' }} // Đặt kích thước nút
          className="hover:bg-yellow-600 text-black py-1 px-3 rounded shadow-md transition duration-200"
        >
          Chia Sẻ
        </button>
        <button
          style={{ backgroundColor: '#F5CF49', width: '150px', height: '40px' }} // Đặt kích thước nút
          className="hover:bg-yellow-600 text-black py-1 px-3 rounded shadow-md transition duration-200"
        >
          Hủy Đơn
        </button>
      </div>

    </div>
  );
};

export default ChiTietHoaDon;
