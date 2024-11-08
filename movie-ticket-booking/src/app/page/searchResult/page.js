'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';  // Thêm useSearchParams
import Link from 'next/link';

function SearchPage() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams(); // Sử dụng useSearchParams để theo dõi tham số tìm kiếm
  const query = searchParams.get('name'); // Lấy giá trị từ tham số URL

  useEffect(() => {
    if (!query) return; // Nếu không có từ khóa tìm kiếm thì không làm gì cả

    const fetchResults = async () => {
      try {
        const response = await fetch(`http://localhost:3000/search?name=${query}`);
        if (!response.ok) {
          const errorMessage = await response.text();
          setError(errorMessage);
          return;
        }

        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError('Error fetching search results');
      }
    };

    fetchResults();
  }, [query]); // Chạy lại mỗi khi query thay đổi

  return (
    <div className="search-page">
      <div className="max-w-[1410px] mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Kết quả tìm kiếm</h1>
        {error && <div className="text-red-500">{error}</div>}
        {results.length === 0 ? (
          <div className="text-gray-500">Không có kết quả tìm kiếm.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((phim) => (
              <div key={phim._id} className="movie-card bg-white p-4 rounded shadow">
                <img src={phim.Anh} alt={phim.Ten} className="w-full h-64 object-cover rounded mb-4" />
                <h3 className="text-xl font-semibold text-black">{phim.Ten}</h3>
                <p className="text-gray-600">{phim.TheLoai.KieuPhim}</p>
                <p className="text-gray-500">{phim.MoTa.DaoDien}</p>
                <p className="text-gray-500">{phim.MoTa.DienVien}</p>
                <Link
                  href={`/page/${phim._id}`}
                  className="block mt-4 text-center bg-[#F5CF49] text-black font-semibold py-2 rounded hover:bg-[#E4B137]"
                >
                  Xem chi tiết
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
