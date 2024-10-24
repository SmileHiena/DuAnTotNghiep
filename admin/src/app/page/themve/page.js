"use client"; // Đảm bảo rằng đây là một component client
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AddTicketPage = () => {
  const [ticketData, setTicketData] = useState({
    KhachHang: {
      Ten: "",
      Anh: "",
      SDT: "",
    },
    SoLuong: 1,
    GiaVe: 0,
    TrangThai: "Chưa thanh toán",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("KhachHang.")) {
      const key = name.split(".")[1];
      setTicketData((prev) => ({
        ...prev,
        KhachHang: { ...prev.KhachHang, [key]: value },
      }));
    } else {
      setTicketData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/ve/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketData),
      });

      if (response.ok) {
        const newTicket = await response.json();
        console.log("Ticket added:", newTicket);
        router.push('/page/ve');
      } else {
        console.error("Failed to add ticket");
      }
    } catch (error) {
      console.error("Error adding ticket:", error);
    }
  };

  return (
    <div className="p-4 app-content">
      <h1 className="text-2xl font-bold mb-4">Thêm vé</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tên khách hàng:</label>
            <input
              type="text"
              name="KhachHang.Ten"
              value={ticketData.KhachHang.Ten}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Ảnh khách hàng:</label>
            <input
              type="text"
              name="KhachHang.Anh"
              value={ticketData.KhachHang.Anh}
              onChange={handleChange}
              placeholder="URL ảnh"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Số điện thoại:</label>
            <input
              type="text"
              name="KhachHang.SDT"
              value={ticketData.KhachHang.SDT}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Số lượng:</label>
            <input
              type="number"
              name="SoLuong"
              value={ticketData.SoLuong}
              onChange={handleChange}
              min="1"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Giá vé (VND):</label>
            <input
              type="number"
              name="GiaVe"
              value={ticketData.GiaVe}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white rounded-md px-4 py-2">
            Thêm vé
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTicketPage;
