"use client";
import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { useParams } from "next/navigation";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QRCode } from 'react-qr-code';

const ChiTietHoaDon = () => {
  const { id } = useParams();
  const router = useRouter();
  const [hoaDon, setHoaDon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/checkout/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setHoaDon(data);
      } catch (error) {
        console.error("Error fetching invoice details: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceDetails();
  }, [id]);

  const handleShare = (method) => {
    const urlToShare = `https://s9391bnm-3001.asse.devtunnels.ms/invoice-details/${id}`;

    
    if (method === 'facebook') {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`;
      window.open(facebookUrl, "_blank", "width=600,height=400");
    } else if (method === 'twitter') {
      const messageToShare = `Mời bạn xem chi tiết hóa đơn của tôi: ${urlToShare}`;
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(messageToShare)}&url=${encodeURIComponent(urlToShare)}`;
      window.open(twitterUrl, "_blank", "width=600,height=400");
    } else if (method === 'copy') {
      navigator.clipboard.writeText(urlToShare).then(() => {
        alert("Đã sao chép liên kết hóa đơn!");
      }).catch((error) => {
        console.error("Error copying to clipboard: ", error);
      });
    }
    setIsModalOpen(false); // Đóng modal sau khi chia sẻ
  };

  const handleDownload = () => {
    const input = document.getElementById("invoice");
    html2canvas(input)
      .then((canvas) => {
        const link = document.createElement("a");
        link.download = "hoa_don.png";
        link.href = canvas.toDataURL();
        link.click();
      })
      .catch((error) => {
        console.error("Error generating image: ", error);
      });
  };

  const handleCancel = async () => {
    if (confirm("Bạn có chắc chắn muốn hủy hóa đơn này không?")) {
      try {
        const response = await fetch(`http://localhost:3000/checkout/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Hủy hóa đơn không thành công");
        }

        setMessage("Hóa đơn đã được hủy thành công!");
        setHoaDon(null);
      } catch (error) {
        console.error("Error canceling invoice: ", error);
        setMessage(error.message);
      }
    }
    router.push("/");
  };



  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{`Error: ${error}`}</div>;
  }

  if (!hoaDon) {
    return <div className="text-white">No invoice details found.</div>;
  }

  return (
    <div className="max-w-full flex flex-col items-center justify-center mx-auto p-4 sm:p-6 bg-[]" style={{ maxWidth: "1410px" }}>
      <h2 className="text-3xl font-bold text-yellow-400 text-center mb-4">CHI TIẾT HÓA ĐƠN</h2>
      <div className="overflow-hidden shadow-lg rounded-lg border border-gray-700 bg-gray-900 p-4" id="invoice">
        <table className="min-w-full bg-gray-800 mx-auto">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="py-2 px-3 text-left text-sm">Thông tin</th>
              <th className="py-2 px-3 text-left text-sm">Chi tiết</th>
            </tr>
          </thead>
          <tbody className="text-white text-sm">
            {/* Render invoice details */}
            {Object.entries(hoaDon).map(([key, value]) => (
              <tr className="hover:bg-gray-600 transition duration-200" key={key}>
                <td className="py-2 px-3 border-b border-gray-600">{key}:</td>
                <td className="py-2 px-3 border-b border-gray-600">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-center">
          <QRCode value={`https://s9391bnm-3001.asse.devtunnels.ms/invoice-details/${hoaDon.id}`} size={128} />
        </div>
      </div>

      {message && <div className="text-green-500 mt-2">{message}</div>}

      <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
        <button style={{ backgroundColor: "#F5CF49", width: "150px", height: "40px" }} className="hover:bg-yellow-600 text-black py-1 px-3 rounded shadow-md transition duration-200" onClick={handleDownload}>Tải Xuống</button>
        {/* Nút Chia sẻ */}
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
          <button
            style={{ backgroundColor: "#F5CF49", width: "150px", height: "40px" }}
            className="hover:bg-yellow-600 text-black py-1 px-3 rounded shadow-md transition duration-200"
            onClick={() => setIsModalOpen(true)} // Mở modal khi nhấn Chia Sẻ
          >
            Chia Sẻ
          </button>
        </div>

        {/* Modal Chia sẻ */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl text-gray-800 font-bold mb-4">Chọn phương thức chia sẻ</h3>
              <div className="flex flex-col space-y-4">
                <button
                  style={{ backgroundColor: "#F5CF49" }}
                  className="hover:bg-yellow-600 text-black py-2 px-4 rounded transition duration-200"
                  onClick={() => handleShare('facebook')}
                >
                  Chia sẻ trên Facebook
                </button>
                <button
                  style={{ backgroundColor: "#F5CF49" }}
                  className="hover:bg-yellow-600 text-black py-2 px-4 rounded transition duration-200"
                  onClick={() => handleShare('twitter')}
                >
                  Chia sẻ trên Twitter
                </button>
                <button
                  style={{ backgroundColor: "#F5CF49" }}
                  className="hover:bg-yellow-600 text-black py-2 px-4 rounded transition duration-200"
                  onClick={() => handleShare('copy')}
                >
                  Sao chép liên kết
                </button>
                <button
                  className="mt-4 py-2 px-4 bg-red-500 text-white rounded"
                  onClick={() => setIsModalOpen(false)} // Đóng modal
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}

        <button style={{ backgroundColor: "#F5CF49", width: "150px", height: "40px" }} className="hover:bg-yellow-600 text-black py-1 px-3 rounded shadow-md transition duration-200" onClick={handleCancel}>Hủy Đơn</button>
        <Link href="/"><button style={{ backgroundColor: "#F5CF49", width: "150px", height: "40px" }} className="hover:bg-yellow-600 text-black py-1 px-3 rounded shadow-md transition duration-200">Trang chủ</button></Link>
      </div>
    </div>
  );
};

export default ChiTietHoaDon;