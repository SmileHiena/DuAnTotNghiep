import Image from 'next/image';
import Link from 'next/link';

const Sukien = [
  {
    id: 1,
    idPhim: "P001",
    Ten: "Mua vé phim Bố Già",
    Anh: "/images/phim/cong-tu-bac-lieu.jpg",
    Noidung:
      "Mua vé xem phim Bố Già - Bộ phim tình cảm gia đình đầy cảm xúc với diễn xuất đỉnh cao của Trấn Thành.Mua vé xem phim Bố Già - Bộ phim tình cảm gia đình đầy cảm xúc với diễn xuất đỉnh cao của Trấn Thành.Mua vé xem phim Bố Già - Bộ phim tình cảm gia đình đầy cảm xúc với diễn xuất đỉnh cao của Trấn Thành.",
    NgayBatDau: "01-10-2024",
    NgayKetThuc: "01-11-2024",
  },
  {
    id: 2,
    idPhim: "P002",
    Ten: "Mua vé phim Hai Phượng",
    Anh: "/images/phim/cong-tu-bac-lieu.jpg",
    Noidung:
      "Đặt vé phim Hai Phượng - Bộ phim hành động kịch tính do Ngô Thanh Vân thủ vai chính.",
    NgayBatDau: "05-10-2024",
    NgayKetThuc: "05-11-2024",
  },
  // Thêm các sự kiện khác ở đây...
];

const EventPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}> {/* Nền ngoài 45% trong suốt */}
      <div className="max-w-[1410px] w-full">
        <h1 className="text-4xl font-bold text-center mt-10 mb-10">Chương Trình Khuyến Mãi</h1> {/* Chữ kích thước 40px */}
        <div className="space-y-6 mb-10">
          {Sukien.map((event) => (
            <div key={event.id} className="mb-20 rounded-lg shadow-md overflow-hidden flex h-[450px]" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}> {/* Nền trong 75% trong suốt và chiều cao cố định */}
              <div className="w-1/2 h-[450] flex justify-center items-center"> {/* Căn giữa ảnh */}
                <Image
                  src={event.Anh}
                  alt={event.Ten}
                  layout="intrinsic"
                  width={400}
                  height={600}
                  className="px-4 object-cover max-h-[350px] w-full" // Giữ tỷ lệ và giới hạn chiều cao
                />
              </div>
              <div className="p-14  w-1/2 flex flex-col justify-between">
                <div className="flex-grow flex flex-col justify-between"> {/* Dùng flex-grow để nội dung chiếm không gian còn lại */}
                  <h2 className="text-xl font-semibold text-[#FFFFFF]">{event.Ten}</h2> {/* Chữ màu trắng */}
                  <p className="text-gray-300 flex-grow">{event.Noidung}</p> {/* Để nội dung có thể co giãn */}
                  <div className="text-gray-400 mt-2">
                    Ngày bắt đầu: <span className="font-medium">{event.NgayBatDau}</span>
                  </div>
                  <div className="text-gray-400">
                    Ngày kết thúc: <span className="font-medium">{event.NgayKetThuc}</span>
                  </div>
                </div>
                {/* Nút Đặt Vé Ngay */}
                <Link href="/page/danhsach">
                  <button
                    className="mt-4 bg-[#F5CF49] text-black py-2 px-4 rounded hover:bg-[#e0b52e] transition duration-200 text-lg font-semibold" // Kích thước chữ 16px và font-semibold
                    style={{ width: '150px', height: '45px' }} // Thiết lập kích thước nút
                  >
                    Đặt Ngay
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
