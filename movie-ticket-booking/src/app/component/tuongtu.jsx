// src/app/component/tuongtu.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const TuongTu = ({ movieId }) => { // Nhận movieId qua props
    const [similarMovies, setSimilarMovies] = useState([]);
    const [error, setError] = useState(null); // Thêm trạng thái lỗi

    useEffect(() => {
        if (movieId) {
            fetchCategoryId(movieId); // Lấy IdDanhMuc từ API bằng movieId
        }
    }, [movieId]);

    const fetchCategoryId = async (movieId) => {
        try {
            const response = await axios.get(`http://localhost:3000/sanpham/${movieId}`);
            const categoryId = response.data.IdDanhMuc; // Lấy IdDanhMuc từ dữ liệu API

            if (categoryId) {
                fetchSimilarMovies(categoryId);
            } else {
                setError('Không tìm thấy danh mục phim.');
            }
        } catch (error) {
            console.error('Error fetching category ID:', error);
            setError('Lỗi khi tải thông tin danh mục.');
        }
    };

    const fetchSimilarMovies = async (categoryId) => {
        try {
            const response = await axios.get(`http://localhost:3000/theloai/danhmuc/${categoryId}`);
            setSimilarMovies(response.data); // Cập nhật danh sách phim tương tự
        } catch (error) {
            console.error('Error fetching similar movies:', error);
            setError('Lỗi khi tải phim tương tự.');
        }
    };

    return (
        <section className="bg-[rgba(0,0,0,0.3)] py-8">
            <h2 className="font-bold text-[#f5cf49] text-center text-4xl mb-8">Phim tương tự</h2>
            <div className="max-w-[1410px] mx-auto ">
                {error && <p>{error}</p>}
                <div className="flex flex-wrap justify-center">
                    {similarMovies.map((movie) => (
                        <Link href={`/page/details/${movie.id}`}>
                            <div key={movie.id} className="relative w-64 h-80 m-2 overflow-hidden rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
                                <img src={movie.Anh} alt={movie.Ten} className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110" />
                                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-100 rounded-lg"></div>
                            </div>
                            <div class="flex justify-center">
                                <span class="block text-center max-w-[250px] mx-auto truncate">{movie.Ten}</span>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="text-center mt-10 ">
                    <button className="border-2 border-[#F5CF49] bg-[#212529] text-[#FFFFFF] font-semibold w-[150px] h-[40px] rounded hover:bg-[#F5CF49] hover:text-[#000000] transition uppercase text-[16px]">Xem thêm</button>
                </div>
            </div>
        </section>
    );
};

export default TuongTu;
