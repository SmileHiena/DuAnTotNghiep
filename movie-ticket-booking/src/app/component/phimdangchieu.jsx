import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const PhimDangChieu = () => {
    const movies = [
        {
            id: 1,
            Ten: "ĐỐ ANH CỒNG ĐƯỢC TÔI (T18)",
            TheLoai: {
                KieuPhim: "Hài, Hành Động",
                ThoiLuong: "118'",
                QuocGia: "Hàn Quốc",
                NgonNgu: "Phụ Đề",
                KhuyenCao: "T18: Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+)"
            },
            Anh: "Do-anh-cong-duoc-toi.jpg",
            IdDanhMuc: 4,
            TrangThai: "Đang Chiếu",
            MoTa: {
                DaoDien: "RYOO Seung-wan",
                DienVien: "HWANG Jung-min, JUNG Hae-in",
                NgayKhoiChieu: "Thứ Sáu, 27/09/2024"
            },
            ThongTinPhim: "Các thanh tra kỳ cựu nổi tiếng đã hoạt động trở lại! ..."
        },
        {
            id: 2,
            Ten: "CÁM (T18)",
            TheLoai: {
                KieuPhim: "Kinh Dị",
                ThoiLuong: "122'",
                QuocGia: "Việt Nam",
                NgonNgu: "Tiếng Việt",
                KhuyenCao: "T18: Phim dành cho khán giả từ đủ 16 tuổi trở lên (18+)"
            },
            Anh: "cam.jpg",
            IdDanhMuc: 2,
            TrangThai: "Đang Chiếu",
            MoTa: {
                DaoDien: "Trần Hữu Tấn",
                DienVien: "Quốc Cường, Thúy Diễm...",
                NgayKhoiChieu: "Thứ Sáu, 20/09/2024"
            },
            ThongTinPhim: "Câu chuyện phim là dị bản kinh dị đẫm máu..."
        },
        {
            id: 3,
            Ten: "LÀM GIÀU VỚI MA (T16)",
            TheLoai: {
                KieuPhim: "Hài, Tâm Lý",
                ThoiLuong: "112'",
                QuocGia: "Việt Nam",
                NgonNgu: "Tiếng Việt",
                KhuyenCao: "T16: Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)"
            },
            Anh: "lam-giau-voi-ma.jpg",
            IdDanhMuc: 1,
            TrangThai: "Đang Chiếu",
            MoTa: {
                DaoDien: "Trung Lùn",
                DienVien: "Hoài Linh, Tuấn Trần, Lê Giang",
                NgayKhoiChieu: "Thứ Sáu, 30/08/2024"
            },
            ThongTinPhim: "Làm Giàu Với Ma kể về Lanh (Tuấn Trần)..."
        },
        {
            id: 4,
            Ten: "LOOK BACK: LIỆU TA CÓ DÁM NHÌN LẠI (T13)",
            TheLoai: {
                KieuPhim: "Anime",
                ThoiLuong: "58'",
                QuocGia: "Nhật Bản",
                NgonNgu: "Phụ Đề",
                KhuyenCao: "T13: Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)"
            },
            Anh: "look-back.jpg",
            IdDanhMuc: 5,
            TrangThai: "Đang Chiếu",
            MoTa: {
                DaoDien: "Kiyotaka Oshiyama",
                DienVien: "Yumi Kawai, Mizuki Yoshida",
                NgayKhoiChieu: "Thứ Sáu, 20/09/2024"
            },
            ThongTinPhim: "Fujino tự tin thái quá, trong khi Kyomoto..."
        },
        {
            id: 5,
            Ten: "ANH TRAI VƯỢT MỌI TAM TAI (T16)",
            TheLoai: {
                KieuPhim: "Hài",
                ThoiLuong: "96'",
                QuocGia: "Hàn Quốc",
                NgonNgu: "Phụ Đề",
                KhuyenCao: "T16: Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)"
            },
            Anh: "anh-trai-vuot-moi-tam-tai.jpg",
            IdDanhMuc: 3,
            TrangThai: "Đang Chiếu",
            MoTa: {
                DaoDien: "Kim Jae-hoon",
                DienVien: "Park Sung-woong, Kwak Si-yang, Yoon Kyung-ho",
                NgayKhoiChieu: "Thứ Sáu, 13/09/2024"
            },
            ThongTinPhim: "Cho Su-gwang là một thanh tra cực kỳ nóng tính..."
        },
    ];

    return (
        <div className="sap-chieu max-w-full mx-auto py-8" style={{ backgroundImage: 'url(/images/image1.png)', maxWidth: '1410px' }}>
            {/* Title */}
            <h2 className="sap-chieu__title text-yellow-400 mb-8 text-3xl font-bold">Phim đang chiếu</h2>

            <div className="sap-chieu__container flex justify-center">
                {/* Movie list */}
                <div className="sap-chieu__row flex justify-between" style={{ overflowX: 'auto' }}>
                    {movies.map((movie) => (
                        <div key={movie.id} className="sap-chieu__card relative flex-shrink-0 mx-2">
                            <Link href={`/detail/${movie.id}`}>
                                <img
                                    src={`/images/phim/${movie.Anh}`}
                                    alt={movie.Ten}
                                    className="sap-chieu__image w-full h-[354px] object-cover transition-transform duration-300 transform hover:scale-110"
                                />
                                <div className="sap-chieu__overlay">
                                    <h3 className="sap-chieu__card-title text-white font-bold text-lg">{movie.Ten}</h3>
                                    <ul className="sap-chieu__info">
                                        <li>{movie.TheLoai.ThoiLuong}</li>
                                        <li>{movie.TheLoai.KieuPhim}</li>
                                        <li>{movie.TheLoai.QuocGia}</li>
                                        <li>{movie.TheLoai.NgonNgu}</li>
                                    </ul>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PhimDangChieu;
