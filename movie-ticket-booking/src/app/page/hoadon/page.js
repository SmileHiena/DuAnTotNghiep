'use client'; // Ensures that this component is client-side only
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Use the 'next/navigation' package

const Profile = () => {
  const [accountInfo, setAccountInfo] = useState({});
  const [invoices, setInvoices] = useState([]);
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [message, setMessage] = useState("");
  const [isClient, setIsClient] = useState(false); // Client-side check state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Auto-login state

  const router = useRouter(); // Initialize the router

  // Auto-login effect
  useEffect(() => {
    setIsClient(true); // Ensures router actions happen only after the component mounts on the client side

    // Check for the 'token' in cookies
    const token = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("token="));
    
    const tokenValue = token?.split("=")[1];

    if (tokenValue) {
      setIsLoggedIn(true);
      // If token is found, attempt to fetch user info and invoices
      const getUserInfo = async () => {
        try {
          const response = await fetch("http://localhost:3000/users/detailuser", {
            method: "GET",
            headers: { Authorization: `Bearer ${tokenValue}`, "Content-Type": "application/json" },
          });

          if (response.ok) {
            const data = await response.json();
            setAccountInfo(data);  // Set the user info into state
            fetchInvoices(data.userId);  // Fetch invoices for the logged-in user
          } else {
            console.error("Failed to fetch user data");
            alert("Vui lòng đăng nhập lại.");
            router.push("/page/login"); // Redirect to login if fetching user info fails
          }
        } catch (error) {
          console.error("An error occurred while fetching user data:", error);
          alert("Có lỗi xảy ra, vui lòng thử lại.");
        }
      };

      // Fetch invoices
      const fetchInvoices = async (userId) => {
        try {
          const response = await fetch(
            `http://localhost:3000/checkout?userId=${userId}`,
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
            setInvoices(data); // Set invoices in state
          } else {
            console.error("Failed to fetch invoices");
          }
        } catch (error) {
          console.error("An error occurred while fetching invoices:", error);
        }
      };

      getUserInfo(); // Fetch user info if token exists
    } else {
      setIsLoggedIn(false); // No token, user is not logged in
      router.push("/page/login"); // Redirect to login page if no token found
    }
  }, [router]); // Only re-run the effect when router changes

  // Toggle invoice details modal
  const toggleInvoiceDetails = (invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoiceDetails(!showInvoiceDetails);
  };

  // Handle canceling the invoice
  const handleCancel = async () => {
    if (selectedInvoice.TrangThai !== "Đã Đặt") {
      setMessage("Chỉ có thể hủy các vé có trạng thái 'Đã Đặt'.");
      return;
    }

    if (confirm("Bạn có chắc chắn muốn hủy hóa đơn này không?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/checkout/${selectedInvoice.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Hủy hóa đơn không thành công");
        }

        setMessage("Hóa đơn đã được hủy thành công!");
        setInvoices(invoices.filter(invoice => invoice.id !== selectedInvoice.id));
        setShowInvoiceDetails(false); // Close the invoice details view after cancellation
      } catch (error) {
        console.error("Error canceling invoice: ", error);
        setMessage(error.message);
      }
    }

    // Navigate to the invoice page only on the client side
    if (isClient) {
      router.push("/page/hoadon"); // Navigate to the invoice page
    }
  };

  return (
    <section className="flex flex-col justify-center items-center w-full px-4">
      <div className="w-full max-w-[1410px]">
        {/* Profile Header */}
        <div className="relative h-[300px] bg-cover bg-center border-3 border-white mb-4" style={{ backgroundImage: "url('../images/background.png')" }}></div>
        <div className="relative -mt-20 flex flex-col md:flex-row">
          <div className="flex flex-col items-center w-full md:w-1/4">
            <img
              src={`http://localhost:3000/images/${accountInfo.Anh}`} // Profile image
              alt="Profile"
              className="rounded-full w-36 h-36 border-5 border-white object-cover"
            />
            <div className="flex justify-center mt-1">
              <h2 className="text-3xl text-center font-semibold text-white">
                {accountInfo.Ten || "Chưa có tên"} {/* User's name */}
              </h2>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex flex-col md:flex-row justify-between mt-5 mb-8 gap-4">
          <div className="w-full md:w-1/4 p-6 bg-gray-700 text-white h-[300px]">
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

          {/* Invoices History */}
          <div className="w-full md:w-3/4">
            <h2 className="text-2xl mb-2 text-white font-semibold">LỊCH SỬ HÓA ĐƠN</h2>
            <table className="w-full border-collapse bg-gray-800 text-white">
              <thead>
                <tr>
                  <th className="bg-[#F5CF49] text-[#000000] px-2 py-2">Tên phim</th>
                  <th className="bg-[#F5CF49] text-[#000000] px-2 py-2">Ngày mua</th>
                  <th className="bg-[#F5CF49] text-[#000000] px-2 py-2">Chi tiết</th>
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
                          className="w-[117px] h-[35px] bg-[#F5CF49] text-[#000000] rounded hover:bg-[#212529] hover:text-[#ffffff] hover:border-2 hover:border-[#F5CF49] hover:border-solid"
                        >
                          Chi tiết
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

            {/* Invoice Details Modal */}
            {showInvoiceDetails && selectedInvoice && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full text-white">
                  <h3 className="text-xl font-semibold mb-4">Chi tiết hóa đơn</h3>
                  <p><strong>Mã hóa đơn:</strong> {selectedInvoice.id}</p>
                  <p><strong>Ngày mua:</strong> {new Date(selectedInvoice.NgayMua).toLocaleDateString("vi-VN")}</p>
                  <p><strong>Trạng thái:</strong> {selectedInvoice.TrangThai}</p>
                  <button
                    onClick={handleCancel}
                    className="w-full py-2 bg-red-600 text-white rounded mt-4 hover:bg-red-800"
                  >
                    Hủy hóa đơn
                  </button>
                  <button
                    onClick={() => setShowInvoiceDetails(false)}
                    className="w-full py-2 bg-gray-600 text-white rounded mt-4 hover:bg-gray-800"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
