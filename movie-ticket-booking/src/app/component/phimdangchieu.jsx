import '../../../public/styles/dangchieu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link'; // Import Link from next/link

const PhimDangChieu = () => {
    const movies = [
        { id: 1, title: "Công tử bạc liêu", image: "/images/phim/cong-tu-bac-lieu.jpg" },
        { id: 2, title: "Transformers: Một", image: "/images/phim/transformers-one.jpg" },
        { id: 3, title: "Làm giàu với ma", image: "/images/phim/lam-giau-voi-ma.jpg" },
        { id: 4, title: "Cám", image: "/images/phim/cam.jpg" },
        { id: 5, title: "Đố anh cồng được tôi", image: "/images/phim/Do-anh-cong-duoc-toi.jpg" }
    ];

    return (
        <div className="phim-dang-chieu__container">
            {/* Title */}
            <h2 className="phim-dang-chieu__title">Phim đang chiếu</h2>

            {/* Left navigation button */}
            <button className="phim-dang-chieu__nav-button phim-dang-chieu__nav-button--left">
                <FontAwesomeIcon icon={faChevronLeft} className="phim-dang-chieu__icon" />
            </button>

            {/* Movie list */}
            <div className="phim-dang-chieu__movies">
                {movies.map((movie) => (
                    <div key={movie.id} className="phim-dang-chieu__movie-card">
                        {/* Chuyển hướng tới trang Detail khi nhấp vào ảnh */}
                        <Link href={`/detail/${movie.id}`}>
                            <img
                                src={movie.image}
                                alt={movie.title}
                                className="phim-dang-chieu__movie-image"
                            />
                            <h4 className="phim-dang-chieu__movie-title">{movie.title}</h4>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Right navigation button */}
            <button className="phim-dang-chieu__nav-button phim-dang-chieu__nav-button--right">
                <FontAwesomeIcon icon={faChevronRight} className="phim-dang-chieu__icon" />
            </button>
        </div>
    );
};

export default PhimDangChieu;
