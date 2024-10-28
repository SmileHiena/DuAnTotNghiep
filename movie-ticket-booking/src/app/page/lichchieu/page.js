"use client"; // Đánh dấu đây là Client Component
import React, { useEffect, useState } from "react";
import Image from "next/image";

const LichChieuPage = () => {
  const rapPhim = [
    'Tất cả',
    'Rạp 1 - MegaStar',
    'Rạp 2 - Galaxy',
    'Rạp 3 - Lotte',
  ];

  const [lichChieu, setLichChieu] = useState([]);
  const [theLoaiList, setTheLoaiList] = useState([]);

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const lichChieuResponse = await fetch("http://localhost:3000/suatchieu");
        const theLoaiResponse = await fetch("http://localhost:3000/theloai");

        const lichChieuData = await lichChieuResponse.json();
        const theLoaiData = await theLoaiResponse.json();

        // Kết hợp thông tin thể loại và chuyển đổi 'GioChieu' thành mảng
        const lichChieuWithTheLoai = lichChieuData.map((item) => {
          const matchedTheLoai = theLoaiData.find(tl => tl.id === item.IdPhim); // Sửa ID cho đúng mối quan hệ
          return {
            ...item,
            theLoai: matchedTheLoai ? matchedTheLoai.Ten : "Không xác định", // Lấy tên thể loại
            gio: item.GioChieu.split(",") // Chuyển đổi chuỗi thời gian thành mảng
          };
        });

        setLichChieu(lichChieuWithTheLoai);
        setTheLoaiList(theLoaiData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  const handleSelectTime = (phimId, time) => {
    setSelectedShow({ phimId, time });
    alert(`Bạn đã chọn suất chiếu lúc ${time} cho phim ID: ${phimId}`);
  };

  const filteredMovies = lichChieu.filter(phim =>
    (selectedDate === '' || phim.NgayChieu === selectedDate)
  );

  return (
    <div className="text-white min-h-screen p-5 bg-gray-900">
      <div className="max-w-[1410px] mx-auto mb-10">
        <h1 className="text-3xl font-bold mb-10">Lịch Chiếu Phim</h1>

        <div className="grid grid-cols-1 gap-4">
          {filteredMovies.map((phim) => (
            <div key={phim._id} className="p-4 rounded-lg shadow bg-gray-800 flex">
              {/* Bên trái chứa ảnh và thể loại */}
              <div className="flex">
                <div className="relative w-[240px] h-[320px]">
                  <Image
                    src={phim.Anh || "/images/default.jpg"} 
                    alt={phim.Ten}
                    layout="fill"
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-semibold">{phim.Ten}</h2>
                  <p className="text-white mt-2">
                    <span className="font-bold">Kiểu phim:</span> {phim.KieuPhim}
                  </p>
                  <p className="text-white">
                    <span className="font-bold">Ngày:</span> {phim.NgayChieu}
                  </p>
                </div>
              </div>

              {/* Bên phải chứa thông tin rạp và thời gian chiếu */}
              <div className="ml-10">
                <p className="text-gray-400">Phòng: {phim.TenPhongChieu}</p>
                <div className="mt-2 flex flex-wrap">
                  {phim.gio.map((show, index) => (
                    <button
                      key={index} // Sử dụng index cho key trong trường hợp này
                      className={`bg-[#F5CF49] hover:bg-[#e6b632] text-gray-900 py-2 px-4 rounded mr-2 mb-2 ${selectedShow &&
                        selectedShow.phimId === phim.id &&
                        selectedShow.time === show
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                        }`}
                      onClick={() => handleSelectTime(phim.id, show)}
                      disabled={selectedShow &&
                        selectedShow.phimId === phim.id &&
                        selectedShow.time === show
                      }
                    >
                      {show}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LichChieuPage;
