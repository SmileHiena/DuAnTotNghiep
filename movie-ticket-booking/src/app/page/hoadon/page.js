"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMapLocationDot,
  faPhone,
  faEnvelope,
  faCakeCandles,
  faEdit,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Profile = () => {
  const [accountInfo, setAccountInfo] = useState({});
  const [invoices, setInvoices] = useState([]); // Chuyển từ comments sang invoices
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const toggleInvoiceDetails = (invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoiceDetails(!showInvoiceDetails);
  };

  useEffect(() => {
    const token = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("token="));
    const tokenValue = token?.split("=")[1];

    if (tokenValue) {
      const getUserInfo = async () => {
        try {
          const response = await fetch(
            "http://localhost:3000/users/detailuser",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${tokenValue}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setAccountInfo(data);
            // Fetch invoices after getting user info
            fetchInvoices(data.userId); // Sử dụng userId từ dữ liệu người dùng
          } else {
            console.error("Failed to fetch user data");
            alert("Vui lòng đăng nhập lại.");
          }
        } catch (error) {
          console.error("An error occurred while fetching user data:", error);
          alert("Có lỗi xảy ra, vui lòng thử lại.");
        }
      };

      const fetchInvoices = async (userId) => {
        try {
          const response = await fetch(
            `http://localhost:3000/checkout?userId=${userId}`, // Thay đổi URL đến API hóa đơn
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${tokenValue}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setInvoices(data);
          } else {
            console.error("Failed to fetch invoices");
          }
        } catch (error) {
          console.error("An error occurred while fetching invoices:", error);
        }
      };

      getUserInfo();
    }
  }, []);

  return (
    <section className="flex flex-col justify-center items-center w-full px-4">
      <div className="w-full max-w-[1410px]">
        <div
          className="relative h-[300px] bg-cover bg-center border-3 border-white mb-4"
          style={{ backgroundImage: "url('../images/background.png')" }}
        ></div>
        <div className="relative -mt-20 flex flex-col md:flex-row">
          <div className="flex flex-col items-center w-full md:w-1/4">
            <img
              src={`http://localhost:3000/images/${accountInfo.Anh}`} // Đường dẫn tới hình ảnh
              alt="Profile"
              className="rounded-full w-36 h-36 border-5 border-white object-cover"
            />
            <div className="flex justify-center mt-1">
              <h2 className="text-3xl text-center font-semibold text-white">
                {accountInfo.Ten}
              </h2>
            </div>
          </div>
        </div>

         <div className="flex flex-col md:flex-row justify-between mt-5 mb-8 gap-4">
         <div className="w-full md:w-1/4 p-6 bg-gray-700 text-white">
            <nav className="space-y-4">
              <Link href="/page/profile" className="flex items-center text-lg text-white no-underline">
                <FontAwesomeIcon icon={faUser} className="mr-2 w-4" /> Thông tin khách hàng
              </Link>
              <Link href="/page/comment" className="flex items-center text-lg text-white no-underline">
                <FontAwesomeIcon icon={faEdit} className="mr-2 w-4" /> Lịch sử bình luận
              </Link>
              <Link href="/page/hoadon" className="flex items-center text-lg text-white no-underline">
                <FontAwesomeIcon icon={faEdit} className="mr-2 w-4" /> Lịch sử mua hàng
              </Link>
            </nav>
          </div>

          <div className="w-full md:w-3/4">
            <h2 className="text-2xl mb-2 text-white font-semibold">
              LỊCH SỬ HÓA ĐƠN
            </h2>
            <table className="w-full border-collapse bg-gray-800 text-white">
              <thead>
                <tr>
                  <th className="bg-[#F5CF49] text-[#000000] px-2 py-2">
                    Tên phim
                  </th>
                  <th className="bg-[#F5CF49] text-[#000000] px-2 py-2">
                    Ngày mua
                  </th>
                  <th className="bg-[#F5CF49] text-[#000000] px-2 py-2">
                    Chi tiết
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.length > 0 ? (
                  invoices.map((invoice) => (
                    <tr className="bg-gray-700" key={invoice._id}>
                      <td className="text-center px-2 py-2">{invoice.TenPhim}</td>
                      <td className="text-center px-2 py-2">
                        {new Date(invoice.NgayMua).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
                      </td>
                      <td className="text-center px-2 py-2">
                        <button
                          onClick={() => toggleInvoiceDetails(invoice)}
                          className=" w-[117px] h-[35px] bg-[#F5CF49] text-[#000000] rounded hover:bg-[#212529] hover:text-[#ffffff] hover:border-2 hover:border-[#F5CF49] hover:border-solid"
                        >
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center px-2 py-2">
                      Không có hóa đơn nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {showInvoiceDetails && selectedInvoice && (
              
              <div className="mt-4 p-4 bg-gray-800 border border-[#F5CF49] rounded">
                <h3 className="text-xl text-white">Chi tiết hóa đơn</h3>
                <p className="text-white">
                  <strong className="text-white">Mã hóa đơn:</strong> {selectedInvoice.id}
                </p>
                <p className="text-white">
                  <strong className="text-white">Ngày mua:</strong>{" "}
                  {new Date(selectedInvoice.NgayMua).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
                </p>
                <p className="text-white">
                    <strong className="text-white">Rạp:</strong>{" "}
                     {selectedInvoice.Rap}
                </p>
                <p className="text-white">
                    <strong className="text-white">Phương thức thanh toán:</strong>{" "}
                     {selectedInvoice.PhuongThucThanhToan}
                </p>
                <p className="text-white">
                    <strong className="text-white">Ten phim:</strong>{" "}
                     {selectedInvoice.TenPhim}
                </p>
                <p className="text-white">
                    <strong className="text-white">Thời gian:</strong>{" "}
                     {selectedInvoice.ThoiGian}
                </p>
                <p className="text-white">
                    <strong className="text-white">Ngày chiếu:</strong>{" "}
                     
                     {new Date(selectedInvoice.NgayChieu).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
                </p>
                <p className="text-white">
                    <strong className="text-white">Số ghế:</strong>{" "}
                     {selectedInvoice.SoGhe}
                </p>
                <p className="text-white">
                    <strong className="text-white">Phòng chiếu:</strong>{" "}
                     {selectedInvoice.PhongChieu}
                </p>
                <p className="text-white">
                    <strong className="text-white">Giá vé:</strong>{" "}
                     {selectedInvoice.GiaVe}
                </p>
                <p className="text-white">
                  <strong className="text-white">Tổng số tiền:</strong>{" "}
                   {selectedInvoice.TongTien} VND
                </p>
                <p className="text-white">
                  <strong className="text-white">Số điện thoại khách hàng:</strong>{" "}
                   {selectedInvoice.SoDienThoai} VND
                </p>
                
                <button
                  onClick={() => toggleInvoiceDetails(null)}
                  className="mt-2 bg-red-500 text-white rounded px-2 py-1 hover:bg-white hover:text-red-500"
                >
                  Đóng
                </button>
              </div>
             
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;