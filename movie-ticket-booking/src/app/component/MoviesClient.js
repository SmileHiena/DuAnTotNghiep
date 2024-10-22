"use client"; // Đảm bảo rằng component này là Client Component

import { useState } from "react";

export default function MoviesClient({ movies }) {
//   const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5; // Số lượng phim hiển thị trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1);

  // Tính toán số trang
  const totalPages = Math.ceil(movies.length / itemsPerPage);

  // Tính toán danh sách phim hiển thị
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMovies = movies.slice(startIndex, startIndex + itemsPerPage);

  // Hàm xử lý phân trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex justify-center mt-8">
  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      style={{
        backgroundColor: currentPage === index + 1 ? '#ff00ff' : 'white',
        color: currentPage === index + 1 ? 'white' : 'black',
      }}
      className="rounded-full w-8 h-8 mx-1"
      onClick={() => handlePageChange(index + 1)}
    >
      {index + 1}
    </button>
  ))}
</div>
  );
}