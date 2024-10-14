"use client";
import "../../../public/styles/dangchieu.css";
import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

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

    const settings = {
        dots: false,
        infinite: true,
        speed: 200,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <section className="dang-chieu">
            <div className="dang-chieu__container mx-auto py-8">
                <h2 className="dang-chieu__title">Phim đang chiếu</h2>
                <div className="sap-chieu max-w-full mx-auto py-8" style={{ backgroundImage: 'url(/images/image1.png)', maxWidth: '1410px' }}>
                    <Slider {...settings}>
                        {movies.map((movie) => (
                            <div key={movie.id} className="dang-chieu__card">
                                <Link href={`/page/details/${movie.id}`}>
                                    <img
                                        src={`/images/phim/${movie.Anh}`}
                                        alt={movie.Ten}
                                        className="dang-chieu__image"
                                    />
                                    {/* <div className="dang-chieu__overlay">
                                    <h3 className="dang-chieu__card-title">{movie.Ten}</h3>
                                    <ul className="dang-chieu__info">
                                        <li>{movie.TheLoai.ThoiLuong}</li>
                                        <li>{movie.TheLoai.KieuPhim}</li>
                                        <li>{movie.TheLoai.QuocGia}</li>
                                        <li>{movie.TheLoai.NgonNgu}</li>
                                    </ul>
                                </div> */}
                                </Link>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default PhimDangChieu;
