"use client"; // Đánh dấu đây là Client Component
import React, { useState } from "react";
import Image from "next/image";

const LichChieuPage = () => {
  const rapPhim = [
    'Tất cả',
    'Rạp 1 - MegaStar',
    'Rạp 2 - Galaxy',
    'Rạp 3 - Lotte',
  ];

  const lichChieu = [
    {
      id: 1,
      phim: 'ĐỐ ANH CỒNG ĐƯỢC TÔI',
      ngay: '27/09/2024',
      raPhim: 'Rạp 1 - MegaStar',
      gio: [
        { time: '10:00', selected: false },
        { time: '14:00', selected: false },
        { time: '18:00', selected: false },
      ],
      theLoai: {
        kieuPhim: "Hài, Hành Động",
        thoiLuong: "118'",
        quocGia: "Hàn Quốc",
        ngonNgu: "Phụ Đề",
        khuyenCao: "T18: Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+).",
      },
      anh: "/images/phim/Do-anh-cong-duoc-toi.jpg",
      moTa: {
        daoDien: "RYOO Seung-wan",
        dienVien: "HWANG Jung-min, JUNG Hae-in",
        ngayKhoiChieu: "Thứ Sáu, 27/09/2024",
      },
      thongTinPhim:
        "Các thanh tra kỳ cựu nổi tiếng đã hoạt động trở lại! Thám tử Seo Do-cheol (HWANG Jung-min) và đội điều tra tội phạm nguy hiểm của anh không ngừng truy lùng tội phạm cả ngày lẫn đêm...",
    },
    {
      id: 2,
      phim: 'Phim 2',
      ngay: '15/10/2024',
      raPhim: 'Rạp 2 - Galaxy',
      gio: [
        { time: '11:00', selected: false },
        { time: '15:00', selected: false },
        { time: '19:00', selected: false },
      ],
      theLoai: {
        kieuPhim: "Hành Động, Kinh Dị",
        thoiLuong: "120'",
        quocGia: "Mỹ",
        ngonNgu: "Phụ Đề",
        khuyenCao: "C18: Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+).",
      },
      anh: "/images/phim/Do-anh-cong-duoc-toi.jpg",
      moTa: {
        daoDien: "John Doe",
        dienVien: "Actor A, Actor B",
        ngayKhoiChieu: "Thứ Bảy, 15/10/2024",
      },
      thongTinPhim:
        "Nội dung của phim 2 sẽ được cập nhật ở đây...",
    },
    // Thêm nhiều phim ở đây...
  ];

  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedRap, setSelectedRap] = useState('Tất cả');
  const [selectedDate, setSelectedDate] = useState('');

  const handleSelectTime = (phimId, time) => {
    setSelectedShow({ phimId, time });
    alert(`Bạn đã chọn suất chiếu lúc ${time} cho phim ID: ${phimId}`);
  };

  const filteredMovies = lichChieu.filter(phim =>
    (selectedRap === 'Tất cả' || phim.raPhim === selectedRap) &&
    (selectedDate === '' || phim.ngay === selectedDate)
  );

  return (
    <div className="text-white min-h-screen p-5 bg-gray-900">
      <div className="max-w-[1410px] mx-auto mb-10">
        <h1 className="text-3xl font-bold mb-10">Lịch Chiếu Phim</h1>

        <div className="mb-4">
          <label htmlFor="rap-phim" className="text-white mr-2">
            Chọn rạp:
          </label>
          <select
            id="rap-phim"
            value={selectedRap}
            onChange={(e) => setSelectedRap(e.target.value)}
            className="bg-[#212529] border-2 border-[#F5CF49] text-white p-2 rounded"
          >
            {rapPhim.map((rap, index) => (
              <option key={index} value={rap}>
                {rap}
              </option>
            ))}
          </select>
        </div>


        <div className="grid grid-cols-1 gap-4">
          {filteredMovies.map((phim) => (
            <div key={phim.id} className="p-4 rounded-lg shadow bg-gray-800 flex ">
              {/* Bên trái chứa ảnh và thể loại */}
              <div className="flex">
                <div className="relative w-[240px] h-[320px]">
                  <Image
                    src={phim.anh}
                    alt={phim.phim}
                    layout="fill"
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-semibold">{phim.phim}</h2>
                  <p className="text-white mt-2">
                    <span className="font-bold">Thể loại:</span> {phim.theLoai.kieuPhim}
                  </p>
                  <p className="text-white">
                    <span className="font-bold">Thời lượng:</span> {phim.theLoai.thoiLuong}
                  </p>
                  <p className="text-white">
                    <span className="font-bold">Ngôn ngữ:</span> {phim.theLoai.ngonNgu}
                  </p>
                  <p className="text-white">
                    <span className="font-bold">Khuyến cáo:</span> {phim.theLoai.khuyenCao}
                  </p>
                </div>
              </div>

              {/* Bên phải chứa thông tin rạp và thời gian chiếu */}
              <div className="ml-10">
                <p className="text-gray-400">Rạp: {phim.raPhim}</p>
                <p className="text-gray-400">Ngày: {phim.ngay}</p>

                <div className="mt-2 flex flex-wrap">
                  {phim.gio.map((show) => (
                    <button
                      key={show.time}
                      className={`bg-[#F5CF49] hover:bg-[#e6b632] text-gray-900 py-2 px-4 rounded mr-2 mb-2 ${selectedShow &&
                        selectedShow.phimId === phim.id &&
                        selectedShow.time === show.time
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                        }`}
                      onClick={() => handleSelectTime(phim.id, show.time)}
                      disabled={
                        selectedShow &&
                        selectedShow.phimId === phim.id &&
                        selectedShow.time === show.time
                      }
                    >
                      {show.time}
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
