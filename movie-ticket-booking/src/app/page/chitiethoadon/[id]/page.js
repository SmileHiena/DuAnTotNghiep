"use client";
import React, { useEffect, useState } from "react"; // Import useEffect and useState
import html2canvas from "html2canvas";
import { useParams } from "next/navigation";

const ChiTietHoaDon = () => {
  const { id } = useParams();
  const [hoaDon, setHoaDon] = useState(null); // Use null to indicate no data yet
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Fetch invoice details from the backend
    const fetchInvoiceDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/checkout/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setHoaDon(data); // Set invoice data to state
        console.log(data); // Debugging: log the data fetched
      } catch (error) {
        console.error("Error fetching invoice details: ", error);
        setError(error.message); // Set the error message to state
      } finally {
        setLoading(false); // Update loading state
      }
    };

    fetchInvoiceDetails(); // Call the fetch function
  }, [id]); // Runs when the component mounts or when the id changes

  const handleDownload = () => {
    const input = document.getElementById("invoice");
    html2canvas(input)
      .then((canvas) => {
        const link = document.createElement("a");
        link.download = "hoa_don.png"; // Set download filename
        link.href = canvas.toDataURL(); // Convert canvas to image
        link.click(); // Trigger the download
      })
      .catch((error) => {
        console.error("Error generating image: ", error);
      });
  };

  if (loading) {
    return <div className="text-white">Loading...</div>; // Display loading message
  }

  if (error) {
    return <div className="text-red-500">{`Error: ${error}`}</div>; // Display error message
  }

  if (!hoaDon) {
    return <div className="text-white">No invoice details found.</div>; // Handle case where no invoice is found
  }

  return (
    <div
      className="max-w-full flex flex-col items-center justify-center mx-auto p-4 sm:p-6 bg-[rgba(0,0,0,0.3)]"
      style={{ maxWidth: "1410px" }}
    >
      <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center mb-4">
        CHI TIẾT HÓA ĐƠN
      </h2>
      <div
        className="overflow-hidden shadow-lg rounded-lg border border-gray-700"
        style={{ width: "50%" }}
        id="invoice"
      >
        <table className="min-w-full bg-[rgba(0,0,0,0.5)] mx-auto">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-2 px-3 text-left text-sm">Thông tin</th>
              <th className="py-2 px-3 text-left text-sm">Chi tiết</th>
            </tr>
          </thead>
          <tbody className="text-white text-sm">
            <tr className="hover:bg-gray-600 transition duration-200">
              <td className="py-2 px-3 border-b border-gray-600">
                Mã hóa đơn:
              </td>
              <td className="py-2 px-3 border-b border-gray-600">
                {hoaDon.id}
              </td>
            </tr>
            <tr className="hover:bg-gray-600 transition duration-200">
              <td className="py-2 px-3 border-b border-gray-600">Ngày mua:</td>
              <td className="py-2 px-3 border-b border-gray-600">
                {new Date(hoaDon.NgayMua).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
            </tr>
            <tr className="hover:bg-gray-600 transition duration-200">
              <td className="py-2 px-3 border-b border-gray-600">Rạp:</td>
              <td className="py-2 px-3 border-b border-gray-600">
                {hoaDon.Rap}
              </td>
            </tr>
            <tr className="hover:bg-gray-600 transition duration-200">
              <td className="py-2 px-3 border-b border-gray-600">
                Phương thức thanh toán:
              </td>
              <td className="py-2 px-3 border-b border-gray-600">
                {hoaDon.PhuongThucThanhToan}
              </td>
            </tr>
            <tr className="hover:bg-gray-600 transition duration-200">
              <td className="py-2 px-3 border-b border-gray-600">Tên phim:</td>
              <td className="py-2 px-3 border-b border-gray-600">
                {hoaDon.TenPhim}
              </td>
            </tr>
            <tr className="hover:bg-gray-600 transition duration-200">
              <td className="py-2 px-3 border-b border-gray-600">
                Thời gian chiếu:
              </td>
              <td className="py-2 px-3 border-b border-gray-600">
                {hoaDon.ThoiGian}, {new Date(hoaDon.NgayChieu).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
            </tr>
            <tr className="hover:bg-gray-600 transition duration-200">
              <td className="py-2 px-3 border-b border-gray-600">Số ghế:</td>
              <td className="py-2 px-3 border-b border-gray-600">
                {hoaDon.SoGhe}
              </td>
            </tr>
            <tr className="hover:bg-gray-600 transition duration-200">
              <td className="py-2 px-3 border-b border-gray-600">
                Phòng chiếu:
              </td>
              <td className="py-2 px-3 border-b border-gray-600">
                {hoaDon.PhongChieu}
              </td>
            </tr>
            <tr className="hover:bg-gray-600 transition duration-200">
              <td className="py-2 px-3 border-b border-gray-600">Giá vé:</td>
              <td className="py-2 px-3 border-b border-gray-600">
                {hoaDon.GiaVe}
              </td>
            </tr>
            <tr className="hover:bg-gray-600 transition duration-200">
              <td className="py-2 px-3 border-b border-gray-600">Tổng tiền:</td>
              <td className="py-2 px-3 border-b border-gray-600">
                {hoaDon.TongTien}
              </td>
            </tr>
            <tr className="hover:bg-gray-600 transition duration-200">
              <td className="py-2 px-3 border-b border-gray-600">
                Tên khách hàng:
              </td>
              <td className="py-2 px-3 border-b border-gray-600">
                {hoaDon.TenKhachHang}
              </td>
            </tr>
            <tr className="hover:bg-gray-600 transition duration-200">
              <td className="py-2 px-3 border-b border-gray-600">Email:</td>
              <td className="py-2 px-3 border-b border-gray-600">
                {hoaDon.Email}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
        <button
          style={{ backgroundColor: "#F5CF49", width: "150px", height: "40px" }} // Set button size
          className="hover:bg-yellow-600 text-black py-1 px-3 rounded shadow-md transition duration-200"
          onClick={handleDownload} // Add click event for download
        >
          Tải Xuống
        </button>
        <button
          style={{ backgroundColor: "#F5CF49", width: "150px", height: "40px" }} // Set button size
          className="hover:bg-yellow-600 text-black py-1 px-3 rounded shadow-md transition duration-200"
        >
          Chia Sẻ
        </button>
        <button
          style={{ backgroundColor: "#F5CF49", width: "150px", height: "40px" }} // Set button size
          className="hover:bg-yellow-600 text-black py-1 px-3 rounded shadow-md transition duration-200"
        >
          Hủy Đơn
        </button>
      </div>
    </div>
  );
};

export default ChiTietHoaDon;
