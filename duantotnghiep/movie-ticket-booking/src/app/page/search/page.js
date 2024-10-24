// pages/search.js
import React from 'react';
import { useRouter } from 'next/router';
import MovieList from '../components/MovieList'; // Sử dụng MovieList để hiển thị kết quả

const SearchPage = () => {
  const router = useRouter();
  const { name } = router.query; // Lấy từ khóa tìm kiếm từ query

  return (
    <div className="search-results">
      <h2 className="text-center text-white mt-6">Kết quả tìm kiếm cho: {name}</h2>
      <MovieList apiUrl={`http://localhost:3000/`} title={`Kết quả tìm kiếm cho "${name}"`} />
    </div>
  );
};

export default SearchPage;
