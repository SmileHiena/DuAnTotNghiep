import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'; // Import đúng icon
// import '../styles/DangChieu.css'; // Đảm bảo file CSS đã được cấu hình đúng

const PhimDangChieu = () => {
    const movies = [
        { id: 1, title: "Công tử bạc liêu", image: "/images/phim/lam-giau-voi-ma.jpg" },
        { id: 2, title: "Transformers: Một", image: "/images/phim/lam-giau-voi-ma.jpg" },
        { id: 3, title: "Làm giàu với ma", image: "/images/phim/lam-giau-voi-ma.jpg" },
        { id: 4, title: "Cám", image: "/images/phim/cam.jpg" },
        { id: 5, title: "Đố anh cồng được tôi", image: "/images/phim/Do-anh-cong-duoc-toi.jpg" }
    ];

    return (
        <div style={{ background: "url('/images/image.png')" }} className="container mx-auto text-center py-8 relative">
            {/* Tiêu đề */}
            <h2 className="text-3xl font-bold text-yellow-500 mb-8">Phim đang chiếu</h2>

            {/* Nút điều hướng bên trái */}
            <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-yellow-500 p-2 rounded-full hover:bg-yellow-600">
                {/* Sử dụng FontAwesomeIcon với icon chính xác */}
                <FontAwesomeIcon icon={faChevronLeft} size="lg" className="text-black" />
            </button>

            {/* Danh sách phim */}
            <div className="flex justify-center flex-wrap gap-6">
                {movies.map((movie) => (
                    <div key={movie.id} className="text-center">
                        <img
                            src={movie.image}
                            alt={movie.title}
                            className="object-cover rounded-md mb-4"
                            style={{ height: '350px', width: '250px' }}
                        />
                        <h4 style={{ fontSize: 18 }} className="font-semibold text-white mb-2">{movie.title}</h4>
                    </div>
                ))}
            </div>

            {/* Nút điều hướng bên phải */}
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-yellow-500 p-2 rounded-full hover:bg-yellow-600">
                {/* Sử dụng FontAwesomeIcon với icon chính xác */}
                <FontAwesomeIcon icon={faChevronRight} size="lg" className="text-black" />
            </button>
        </div>
    );
};

export default PhimDangChieu;