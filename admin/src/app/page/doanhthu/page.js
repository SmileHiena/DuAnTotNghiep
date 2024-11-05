// pages/admin/doanhthu.js
'use client';
import { useEffect, useState } from 'react';

export default function DoanhThuPage() {
  const [data, setData] = useState({ totalTicketsSold: 0, totalRevenue: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/doanhthu/doanhthu'); 
        if (!response.ok) throw new Error('Lỗi khi lấy dữ liệu');
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-10">Đang tải...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">Lỗi: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Doanh Thu</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tổng số vé đã bán:</span>
            <span className="text-gray-800 font-medium">{data.totalTicketsSold}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tổng doanh thu:</span>
            <span className="text-gray-800 font-medium">{data.totalRevenue.toLocaleString()} VNĐ</span>
          </div>
        </div>
      </div>
    </div>
  );
}
