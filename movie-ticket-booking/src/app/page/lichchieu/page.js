import React from 'react';
import Image from 'next/image';

const lichChieu = [
  {
    id: 1,
    phim: 'ĐỐ ANH CỒNG ĐƯỢC TÔI',
    ngay: '27/09/2024',
    gio: ['10:00', '14:00', '18:00'],
    theLoai: {
      kieuPhim: "Hài, Hành Động",
      thoiLuong: "118'",
      quocGia: "Hàn Quốc",
      ngonNgu: "Phụ Đề",
      khuyenCao: "T18: Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+)",
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
    gio: ['11:00', '15:00', '19:00'],
    theLoai: {
      kieuPhim: "Hành Động, Kinh Dị",
      thoiLuong: "120'",
      quocGia: "Mỹ",
      ngonNgu: "Phụ Đề",
      khuyenCao: "C18: Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+)",
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

const LichChieuPage = () => {
  return (
    <div className="text-white min-h-screen p-5" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
      <div className="max-w-[1410px] mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Lịch Chiếu Phim</h1>
        <div className="grid grid-cols-1 gap-6">
          {lichChieu.map((phim) => (
            <div key={phim.id} className="border border-gray-700 p-4 rounded-lg shadow" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
              <h2 className="text-xl font-semibold">{phim.phim}</h2>
              <p className="text-gray-400">{phim.ngay}</p>
              <div className="flex flex-col md:flex-row mt-2">
                <div className="relative w-[240px] h-[320px]"> {/* Đặt kích thước cố định cho div chứa hình ảnh */}
                  <Image
                    src={phim.anh}
                    alt={phim.phim}
                    layout="fill" // Sử dụng layout fill để hình ảnh lấp đầy div
                    className="rounded-lg object-cover" // Giữ tỷ lệ khung hình và cắt bớt nếu cần
                  />
                </div>
                <div className="flex-1 md:ml-4">
                  <p className="text-gray-300">{phim.thongTinPhim}</p>
                  <p className="text-gray-400">Đạo diễn: {phim.moTa.daoDien}</p>
                  <p className="text-gray-400">Diễn viên: {phim.moTa.dienVien}</p>
                  <p className="text-gray-400">Ngày khởi chiếu: {phim.moTa.ngayKhoiChieu}</p>
                  <p className="text-gray-400">Thể loại: {phim.theLoai.kieuPhim}</p>
                  <p className="text-gray-400">Thời lượng: {phim.theLoai.thoiLuong}</p>
                  <p className="text-gray-400">Quốc gia: {phim.theLoai.quocGia}</p>
                  <p className="text-gray-400">Ngôn ngữ: {phim.theLoai.ngonNgu}</p>
                  <p className="text-gray-400">Khuyến cáo: {phim.theLoai.khuyenCao}</p>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap">
                {phim.gio.map((time, index) => (
                  <button
                    key={index}
                    className="bg-[#F5CF49] hover:bg-[#e6b632] text-gray-900 py-2 px-4 rounded mr-2 mb-2">
                    {time}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LichChieuPage;
