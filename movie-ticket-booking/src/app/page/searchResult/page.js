'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import "../../../../public/styles/sapchieu.css";

function SearchPage() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const query = searchParams.get('name');

  useEffect(() => {
    if (!query) return;

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
  }, [query]);

  return (
    <div className="search-page bg-[rgba(0,0,0,0.3)] shadow-lg w-full max-w-[1410px] mx-auto">
      <div className="max-w-[1410px] mx-auto px-4 py-8">
        <h1 className="text-5xl text-[#f5cf49] mb-[50px] text-center font-bold mb-6">Kết quả tìm kiếm</h1>
        {results.length === 0 ? (
          <div className="text-gray-500 text-center">Không có kết quả tìm kiếm.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((phim) => (
              <Link
                href={`/page/details/${phim.id}`}
              >
                <div key={phim._id} className="movie-card relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                  <img src={phim.Anh} alt={phim.Ten} className="w-full h-100 object-cover" />
                  {/* Overlay that appears on hover */}
                  <div className="movie-overlay absolute inset-0 bg-black bg-opacity-75 opacity-0 hover:opacity-100 transition-opacity">
                    <div className="p-4 text-yellow-400">
                      <h3 className="text-lg font-semibold">{phim.Ten}</h3>
                      <ul className="text-gray-400 space-y-1 mt-2">
                        <li><i className="fa-solid fa-tag text-yellow-400"></i> &nbsp;{phim.TheLoai.KieuPhim}</li>
                        <li><i className="fa-solid fa-user text-yellow-400"></i> &nbsp;{phim.MoTa.DaoDien}</li>
                        <li><i className="fa-solid fa-user-friends text-yellow-400"></i> &nbsp;{phim.MoTa.DienVien}</li>
                      </ul>



                    </div>
                  </div>
                </div> </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;