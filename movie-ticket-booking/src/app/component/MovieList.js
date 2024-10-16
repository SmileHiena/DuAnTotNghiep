// components/MovieList.js
"use client";
import React, { useEffect, useState } from "react";

const MovieList = ({ apiUrl, title }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(15);

  // Trạng thái cho các tiêu chí lọc
  const [selectedGenre, setSelectedGenre] = useState("all"); // Lọc theo thể loại
  const [selectedRating, setSelectedRating] = useState("all"); // Lọc theo đánh giá

  const fetchMovies = async () => {
    try {
      const res = await fetch(apiUrl, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const newData = await res.json();
      setMovies(newData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [apiUrl]);

  // Xác định số phim trên mỗi trang dựa vào màn hình
  useEffect(() => {
    const updateMoviesPerPage = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1280) setMoviesPerPage(15); // Desktop
      else if (screenWidth >= 1024) setMoviesPerPage(12); // Tablet lớn
      else if (screenWidth >= 768) setMoviesPerPage(8); // Tablet nhỏ
      else setMoviesPerPage(4); // Mobile
    };

    updateMoviesPerPage();
    window.addEventListener("resize", updateMoviesPerPage);

    return () => {
      window.removeEventListener("resize", updateMoviesPerPage);
    };
  }, []);

  // Lọc phim dựa trên tiêu chí đã chọn
  const filteredMovies = movies.filter((movie) => {
    const matchesGenre =
      selectedGenre === "all" ||
      (movie.TheLoai?.KieuPhim && movie.TheLoai.KieuPhim.includes(selectedGenre));
    const matchesRating =
      selectedRating === "all" ||
      (movie.TheLoai?.KhuyenCao && movie.TheLoai.KhuyenCao.includes(selectedRating));
    return matchesGenre && matchesRating;
  });

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const maxPageNumbersToShow = 5;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const getPageNumbers = () => {
    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    if (endPage - startPage < maxPageNumbersToShow - 1) {
      startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  if (loading) return <div className="text-center text-white">Đang tải phim...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <section className="bg-[rgba(0,0,0,0.4)]">
      <div className="container mx-auto px-4 py-8 flex flex-col max-w-[1410px] w-full">
        <h1 className="text-center text-[30px] md:text-[40px] font-bold mt-8 mb-8 text-[#F5CF49]">{title}</h1>

        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <span className="text-lg font-bold text-white mr-2">Thể loại:</span>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-white border text-black border-gray-300 rounded py-2 px-4"
            >
              <option value="all">Tất cả</option>
              <option value="Hài">Hài</option>
              <option value="Hành Động">Hành Động</option>
              <option value="Kinh Dị">Kinh Dị</option>
              {/* Thêm các thể loại khác nếu cần */}
            </select>
          </div>
          <div className="flex items-center">
            <span className="text-lg font-bold text-white mr-2">Độ tuổi:</span>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="bg-white border text-black border-gray-300 rounded py-2 px-4"
            >
              <option value="all">Tất cả</option>
              <option value="T13">T13</option>
              <option value="T16">T16</option>
              <option value="T18">T18</option>
              {/* Thêm các độ tuổi khác nếu cần */}
            </select>
          </div>
        </div>

        {/* Danh sách phim */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {currentMovies.length > 0 ? (
            currentMovies.map((movie, index) => (
              <div key={index} className="text-center">
                <img
                  src={`/images/phim/${movie.Anh}`}
                  alt={`Poster of ${movie.Ten}`}
                  className="w-full h-auto max-w-[250px] max-h-[350px] mx-auto rounded"
                />
                <div className="text-sm mt-2 text-[#FFFFFF]">{movie.Ten}</div>
              </div>
            ))
          ) : (
            <div className="text-center text-white col-span-5">Không tìm thấy phim nào phù hợp với tiêu chí lọc.</div>
          )}
        </div>

        {/* Phân trang với mũi tên trái/phải */}
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`flex justify-center mt-8 px-4 py-2 bg-gray-800 text-white rounded-full mx-2 ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            &larr;
          </button>

          <div className="flex justify-center mt-8">
            {getPageNumbers().map((pageNumber) => (
              <button
                key={pageNumber}
                style={{
                  backgroundColor:
                    currentPage === pageNumber ? "#F5CF49" : "white",
                  color: currentPage === pageNumber ? "white" : "black",
                }}
                className="rounded-full w-8 h-8 mx-1"
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`flex justify-center mt-8 px-4 py-2 bg-gray-800 text-white rounded-full mx-2 ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};

export default MovieList;