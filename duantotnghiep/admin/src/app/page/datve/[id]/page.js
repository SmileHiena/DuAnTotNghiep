"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
// import { useDispatch } from 'react-redux';
// import { saveShowtime } from './actions';
const MovieBookingPage = () => {
  const [showShowtimes, setShowShowtimes] = useState(false);
  const [showTheaterList, setShowTheaterList] = useState(false);
  const [showTicketSelection, setShowTicketSelection] = useState(false);
  const pathname = usePathname();
  const [phims, setPhim] = useState([]);
  const [phongs, setPhong] = useState([]);
  const [ghes, setghe] = useState([]);
  const id = pathname.split("/").pop();
  const [movie, setMovie] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [lichchieu, setLichChieu] = useState([]);
  const [selectedLichChieuId, setSelectedLichChieuId] = useState(null);
  const [selectedPhongId, setSelectedPhongId] = useState(null);
  const [selectedGheId, setSelectedGheId] = useState(null);
  
  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) {
        console.error("Movie ID is missing");
        return;
      }

      try {
        const movieResponse = await fetch(`http://localhost:3000/sanpham/${id}`);
        if (!movieResponse.ok) {
          throw new Error(`Failed to fetch movie data: ${movieResponse.statusText}`);
        }
        const movieData = await movieResponse.json();
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [id]);

  useEffect(() => {
    const fetchPhimId = async () => {
      if (!movie || !movie.id) return;
      try {
        const responseDetail = await fetch(`http://localhost:3000/sanpham/${movie.id}/phim`);
        if (!responseDetail.ok) {
          throw new Error("Không thể lấy chi tiết lịch chiếu");
        }
        const dataDetail = await responseDetail.json();
        setPhim(dataDetail.filter((phim) => phim.idPhim === parseInt(movie.id, 10)));
      } catch (error) {
        console.error("Error fetching schedule details:", error);
      }
    };

    fetchPhimId();
  }, [movie]);

  useEffect(() => {
    const fetchPhongId = async () => {
      if (!selectedPhongId) return;

      try {
        const responseDetail = await fetch(`http://localhost:3000/phong/${selectedPhongId}/xuatchieu`);
        if (!responseDetail.ok) {
          throw new Error("Không thể lấy chi tiết phòng chiếu");
        }
        const dataDetail = await responseDetail.json();
        setPhong(dataDetail);
        console.log("987")
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết phòng chiếu:", error);
      }
    };

    fetchPhongId();
  }, [selectedPhongId]);

  useEffect(() => {
    const fetchLichId = async () => {
      if (!selectedLichChieuId) return;

      try {
        const responseDetail = await fetch(`http://localhost:3000/lichchieu/${selectedLichChieuId}/phong`);
        if (!responseDetail.ok) {
          throw new Error("Không thể lấy chi tiết lịch chiếu");
        }
        const dataDetail = await responseDetail.json();
        setLichChieu(dataDetail);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết phòng chiếu:", error);
      }
    };

    fetchLichId();
  }, [selectedLichChieuId]);


  useEffect(() => {
    const fetchGheId = async () => {
      if (!selectedGheId) return;
  
      try {
        const responseDetail = await fetch(`http://localhost:3000/ghe/${selectedGheId}/xuatchieu`);
        if (!responseDetail.ok) {
          throw new Error("Không thể lấy chi tiết lịch chiếu");
        }
        const dataDetail = await responseDetail.json();
        setghe(dataDetail); // Cập nhật danh sách ghế với dữ liệu mới
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết phòng chiếu:", error);
      }
    };
  
    fetchGheId();
  }, [selectedGheId]);
  

  if (!movie) {
    return <p>Loading...</p>;
  }


  return (
    <div className="bg-gray-900 container mx-auto max-w-[1410px] flex flex-col gap-6 text-white min-h-screen p-6">
      <div className="container mx-auto max-w-[1410px] flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-start gap-10 mt-8">
          <div className="md:w-1/2 flex justify-end mb-8 md:mb-0">
            <img
              src={movie.Anh}
              alt={movie.Ten}
              className="object-cover"
              style={{ height: "650px", width: "auto" }}
            />
          </div>

          <div className="md:w-[65%] flex flex-col">
            <h1 className="text-[30px] font-semibold mt-4 mb-4">{movie.Ten}</h1>
            <p className="text-[18px] mb-2">
              <span className="font-semibold">Đạo diễn:</span> {movie.MoTa?.DaoDien}
            </p>
            <p className="text-[18px] mb-2">
              <span className="font-semibold">Diễn viên:</span> {movie.MoTa?.DienVien}
            </p>
            <p className="text-[18px] mb-2">
              <span className="font-semibold">Ngày khởi chiếu:</span> {movie.MoTa?.NgayKhoiChieu}
            </p>
            <p className="text-[18px]">
              <span className="font-semibold">Thể loại:</span> {movie.TheLoai?.KieuPhim}
            </p>
            <h1 className="text-[20px] font-bold mt-7 mb-2">Nội Dung</h1>
            <p className="text-[16px] mb-2">{movie.ThongTinPhim}</p>

            <div className="flex mt-7 space-x-2">
              <div className="flex">
                <p className="w-10 h-10 bg-white rounded-full flex items-center justify-center mt-1">
                  <FontAwesomeIcon
                    icon={faPlay}
                    style={{ color: "#DA70D6", width: "12px", height: "12px" }}
                  />
                </p>
                <button
                  onClick={handleToggle}
                  className="text-[20px] underline text-white font-light px-4 flex-1 max-w-[150px] h-[41px] md:max-w-[200px]"
                >
                  {isVisible ? 'Ẩn Trailer' : 'Xem Trailer'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {isVisible && (
   <iframe 
   className=" flex items-center justify-center w-[100%] min-h-[700px] bg-blue-500 " 
   style={{ zIndex: 9999 }} 
   src={movie.Trailer}
   frameBorder="0" 
   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
   allowFullScreen>
</iframe>
        )}

        <div className="my-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Lịch Chiếu</h2>
          {phims.map((phim) => (
            <button
              key={phim.idPhim}
              className="bg-yellow-500 text-black py-2 px-4 rounded"
              onClick={() => {
                setSelectedLichChieuId(phim.id); // Lưu ID lịch chiếu đã chọn
                setShowShowtimes(true);
                setShowTheaterList(false);
                setShowTicketSelection(false);
                setLichChieu([]); // Reset danh sách phòng chiếu khi chọn lịch chiếu mới
              }}
            >
              <p>{phim.ngay}</p>
              <p>{phim.thu}</p>
            </button>
          ))}
        </div>

        {showShowtimes && lichchieu.length > 0 && (
          <div className="my-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Phòng Chiếu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lichchieu.map((lich) => (
                <div
                  key={lich.idLichChieu}
                  className="bg-gray-800 p-4 rounded-lg text-left text-white"
                >
                  <button
                    className="bg-yellow-500 text-black py-2 px-4 rounded mt-3"
                    onClick={() => {
                      setSelectedPhongId(lich.id);
                      setShowTheaterList(true);
                      setShowTicketSelection(false);
                    }}
                  >
                   {lich.tenPhong}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {showTheaterList && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Danh sách xuất chiếu </h2>
            <div className="bg-purple-700 p-4 rounded-lg">
              <h3 className="font-bold text-xl mb-2"> Rạp StichMan phường 12 Thành phố Hồ Chí Minh</h3>
              <p>xuất chiếu</p>
              {phongs.map((phong) => (
  <button
    key={phong.id}
    className="bg-gray-800 py-1 px-3 rounded text-yellow-500 mt-2"
    onClick={() => { 
      setSelectedGheId(phong.id); // Lưu ID phòng đã chọn
      setShowTicketSelection(true); // Hiện thị lựa chọn vé

      // Reset lại state ghế trước khi lấy thông tin mới
      setghe([]); // Đặt lại danh sách ghế
    }}
  >
    {phong.gioChieu} {/* Hiển thị giờ chiếu */}
  </button>
))}

            </div>
          </div>
        )}

{showTicketSelection && (
          <>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Chọn Loại Vé</h2>
              <div className="flex items-center justify-center gap-4">
                <div className="bg-gray-800 p-4 rounded-lg text-center">
                  <h3>Người Lớn</h3>
                  <p>65,000 VND</p>
                  <div className="flex justify-center gap-2 mt-2">
                    <button className="bg-gray-700 px-4 py-2 rounded">-</button>
                    <span className="px-4">0</span>
                    <button className="bg-gray-700 px-4 py-2 rounded">+</button>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg text-center">
                  <h3>HSSV/Người Cao Tuổi</h3>
                  <p>45,000 VND</p>
                  <div className="flex justify-center gap-2 mt-2">
                    <button className="bg-gray-700 px-4 py-2 rounded">-</button>
                    <span className="px-4">0</span>
                    <button className="bg-gray-700 px-4 py-2 rounded">+</button>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg text-center">
                  <h3>VIP</h3>
                  <p>150,000 VND</p>
                  <div className="flex justify-center gap-2 mt-2">
                    <button className="bg-gray-700 px-4 py-2 rounded">-</button>
                    <span className="px-4">0</span>
                    <button className="bg-gray-700 px-4 py-2 rounded">+</button>
                  </div>
                </div>
              </div>
            </div>

           {/* Seat Selection */}
           <div className="my-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Chọn Ghế - Rạp 04</h2>
              <div className="bg-gray-800 p-4 rounded-lg inline-block">
                <div className="mb-4 text-white">Màn hình</div>
                <div className="bg-gray-600 h-1 w-full mb-4"></div>
                <div className="flex flex-wrap">
  {ghes.map((ghe) => (
    <div key={ghe.maXuatChieu} className="w-1/10 p-1"> {/* Độ rộng 10% cho mỗi nút */}
      <button className="flex bg-gray-800 text-white py-2 px-4 rounded">
        {ghe.tenGhe}
      </button>
    </div>
  ))}
</div>

                <div className="flex justify-center mt-6 space-x-4">
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-white border mr-2 inline-block"></span>
                    <span className="text-gray-400">Ghế Trống</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-yellow-500 border mr-2 inline-block"></span>
                    <span className="text-gray-400">Ghế Đã Đặt</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-gray-300 border mr-2 inline-block"></span>
                    <span className="text-gray-400">Ghế Đang Chọn</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Chọn Combo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <h3 className="font-bold">Combo 1</h3>
              <p>Popcorn lớn + Nước ngọt 1L</p>
              <p className="text-yellow-400">100,000 VND</p>
              <button className="bg-yellow-500 text-black py-1 px-4 rounded mt-2">
                Chọn
              </button>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <h3 className="font-bold">Combo 2</h3>
              <p>Khoai tây chiên + Nước ngọt 1L</p>
              <p className="text-yellow-400">90,000 VND</p>
              <button className="bg-yellow-500 text-black py-1 px-4 rounded mt-2">
                Chọn
              </button>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <h3 className="font-bold">Combo 3</h3>
              <p>Gà rán + Nước ngọt 1L</p>
              <p className="text-yellow-400">120,000 VND</p>
              <button className="bg-yellow-500 text-black py-1 px-4 rounded mt-2">
                Chọn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieBookingPage;
