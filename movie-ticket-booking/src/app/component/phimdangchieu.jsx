import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link'; // Import Link từ next/link

const PhimDangChieu = () => {
    const movies = [
        { id: 1, title: "Công tử bạc liêu", image: "/images/phim/cong-tu-bac-lieu.jpg" },
        { id: 2, title: "Transformers: Một", image: "/images/phim/transformers-one.jpg" },
        { id: 3, title: "Làm giàu với ma", image: "/images/phim/lam-giau-voi-ma.jpg" },
        { id: 4, title: "Cám", image: "/images/phim/cam.jpg" },
        { id: 5, title: "Đố anh cồng được tôi", image: "/images/phim/Do-anh-cong-duoc-toi.jpg" }
    ];

    return (
        <div className="relative flex flex-col items-center justify-center">
            {/* Tiêu đề */}
            <h2 className="text-3xl font-bold text-center mb-8">Phim đanh chiếu</h2>

            <div className="relative w-full max-w-[1410px]">
                {/* Nút điều hướng bên trái */}
                <button className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full">
                    <FontAwesomeIcon icon={faChevronLeft} className="text-lg" />
                </button>

                {/* Danh sách phim */}
                <div className="flex justify-between space-x-6 mx-auto"> {/* 1398px để bù cho padding */}
                    {movies.map((movie) => (
                        <div key={movie.id} className="flex-shrink-0 w-[250px]">
                            {/* Chuyển hướng tới trang chi tiết khi nhấp vào ảnh */}
                            <Link href={`/detail/${movie.id}`}>
                                <img
                                    src={movie.image}
                                    alt={movie.title}
                                    className="w-[250px] h-[354px] object-cover rounded-lg"
                                />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Nút điều hướng bên phải */}
                <button className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full">
                    <FontAwesomeIcon icon={faChevronRight} className="text-lg" />
                </button>
            </div>
        </div>
    );
};

export default PhimDangChieu;
