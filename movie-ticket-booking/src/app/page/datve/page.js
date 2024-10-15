"use client";
import { useState } from "react";

const DatVe = () => {
  // Inside the component
  const [selectedSeats, setSelectedSeats] = useState([]);
  const movies = [
    {
      id: "1",
      title: "CÁM(T18)",
      daodien: "Trần Hữu Tấn",
      dienvien: "Quốc Cường, Thúy Diễm, Rima Thanh Vy, Lâm Thanh Mỹ, Hải Nam",
      theloai: "Kinh dị",
      ngaykhoichieu: "Thứ Sáu, 20/09/2024",
      description:
        "Câu chuyện phim là dị bản kinh dị đẫm máu lấy cảm hứng từ truyện cổ tích nổi tiếng Tấm Cám, nội dung chính của phim xoay quanh Cám - em gái cùng cha khác mẹ của Tấm đồng thời sẽ có nhiều nhân vật và chi tiết sáng tạo, gợi cảm giác vừa lạ vừa quen cho khán giả.",
      thoigian: "122 phút",
      quocgia: "Việt Nam",
      image: "/images/phim/cam.jpg",
    },
  ];

  const SuatChieu = [
    {
      id: 1,
      ThoiGian: "Thứ Năm",
      NgayChieu: "26/09",
      MaPhim: 1,
      IdVe: 1,
    },

    {
      id: 2,
      ThoiGian: "Thứ Sáu",
      NgayChieu: "27/09",
      MaPhim: 1,
      IdVe: 1,
    },

    {
      id: 3,
      ThoiGian: "Thứ Bảy",
      NgayChieu: "28/09",
      MaPhim: 1,
      IdVe: 1,
    },
  ];

  const Loaive = [
    {
      id: 1,
      TenVe: "Người Lớn - Đơn",
      GiaVe: 75000,
    },
    {
      id: 2,
      TenVe: "HSSV-Người Cao Tuổi",
      GiaVe: 45000,
    },
    {
      id: 3,
      TenVe: "Người Lớn - Đôi",
      GiaVe: 155000,
    },
  ];

  const seats = [
    {
      row: "A",
      seats: [
        { number: 1, booked: false },
        { number: 2, booked: false },
        { number: 3, booked: false },
        { number: 4, booked: true }, // Ghế đã được đặt
        { number: 5, booked: false },
        { number: 6, booked: true }, // Ghế đã được đặt
        { number: 7, booked: false },
        { number: 8, booked: false },
        { number: 9, booked: false },
        { number: 10, booked: true }, // Ghế đã được đặt
      ],
    },
    {
      row: "B",
      seats: [
        { number: 1, booked: false },
        { number: 2, booked: false },
        { number: 3, booked: false },
        { number: 4, booked: false },
        { number: 5, booked: true },
        { number: 6, booked: false },
        { number: 7, booked: false },
        { number: 8, booked: false },
        { number: 9, booked: true },
        { number: 10, booked: false },
      ],
    },
    {
      row: "C",
      seats: [
        { number: 1, booked: false },
        { number: 2, booked: false },
        { number: 3, booked: false },
        { number: 4, booked: false },
        { number: 5, booked: false },
        { number: 6, booked: false },
        { number: 7, booked: true },
        { number: 8, booked: false },
        { number: 9, booked: false },
        { number: 10, booked: true },
      ],
    },
    {
      row: "D",
      seats: [
        { number: 1, booked: true }, // Ghế đã được đặt
        { number: 2, booked: false },
        { number: 3, booked: false },
        { number: 4, booked: false },
        { number: 5, booked: false },
        { number: 6, booked: false },
        { number: 7, booked: false },
        { number: 8, booked: false },
        { number: 9, booked: false },
        { number: 10, booked: false },
      ],
    },
    {
      row: "E",
      seats: [
        { number: 1, booked: false },
        { number: 2, booked: false },
        { number: 3, booked: false },
        { number: 4, booked: false },
        { number: 5, booked: false },
        { number: 6, booked: false },
        { number: 7, booked: false },
        { number: 8, booked: false },
        { number: 9, booked: false },
        { number: 10, booked: true }, // Ghế đã được đặt
      ],
    },
  ];

  const combo = [
    {
      id: 1,
      Anh: "combo1.jpg",
      TenCombo: "COMBO PARYPARY",
      NoiDung: "2 Bắp Ngọt 60oz + 4 Coke 22oz",
      Gia: 209000,
    },
    {
      id: 2,
      Anh: "combo2.jpg",
      TenCombo: "COMBO SOLO",
      NoiDung: "1 Bắp Ngọt 60oz + 1 Coke 32oz",
      Gia: 94000,
    },
    {
      id: 3,
      Anh: "combo3.jpg",
      TenCombo: "COMBO COUPLE",
      NoiDung: "1 Bắp Ngọt 60oz + 2 Coke 32oz",
      Gia: 115000,
    },
    {
      id: 4,
      Anh: "combo4.jpg",
      TenCombo: "NƯỚC SUỐI DASANI",
      NoiDung: "500/510ML",
      Gia: 20000,
    },
    {
      id: 5,
      Anh: "combo5.jpg",
      TenCombo: "NƯỚC TRÁI CÂY NUTRIBOOST",
      NoiDung: "",
      Gia: 28000,
    },
    {
      id: 6,
      Anh: "combo6.jpg",
      TenCombo: "NƯỚC CAM TEPPY",
      NoiDung: "",
      Gia: 28000,
    },
    {
      id: 7,
      Anh: "combo7.jpg",
      TenCombo: "FANTA",
      NoiDung: "",
      Gia: 37000,
    },
    {
      id: 8,
      Anh: "combo8.jpg",
      TenCombo: "SPRITE",
      NoiDung: "",
      Gia: 37000,
    },
    {
      id: 9,
      Anh: "combo9.jpg",
      TenCombo: "COCACOLA",
      NoiDung: "",
      Gia: 37000,
    },
  ];

  const movie = movies[0];

  return (
    <div className="justify-center mx-auto text-white bg-[rgba(0,0,0,0.6)] shadow-lg w-full max-w-[1410px] mx-auto">
      <section>
        <div className="flex justify-center">
          <div className="">
            <div className="flex flex-col md:flex-row items-start gap-20 mr-[120px] mt-8">
              {/* left box image */}
              <div className="md:w-1/2 flex justify-end mb-8 md:mb-0">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="object-cover"
                  style={{ height: "650px", width: "auto" }}
                />
              </div>

              {/* right box info */}
              <div className="pt-20 md:w-1/2 flex flex-col space-y-6">
                <h1 className="text-[30px] font-semibold mb-4">
                  {movie.title}
                </h1>

                {/* Description */}
                <h1 className="pt-20 text-[20px] font-bold">Nội Dung</h1>
                <p className="text-[18px] mb-4">{movie.description}</p>

                {/* Additional movie information */}
                <div className="pt-20 flex flex-wrap justify-between mb-6">
                  <p className="text-[18px]">
                    <span className="font-semibold">Thể loại:</span>{" "}
                    {movie.theloai}
                  </p>
                  <p className="text-[18px]">
                    <span className="font-semibold">Thời gian:</span>{" "}
                    {movie.thoigian}
                  </p>
                  <p className="text-[18px]">
                    <span className="font-semibold">Quốc gia:</span>{" "}
                    {movie.quocgia}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suất Chiếu Section */}
      <section>
        <h1 className="text-center text-[40px] font-bold mt-20 pb-3">
          Lịch Chiếu
        </h1>
        <div className="flex justify-center gap-4 mt-6">
          {["21h20", "22/09", "22/09", "22/09"].map((showtime, index) => (
            <div
              key={index}
              className="h-[93px] w-[103px] border-2 border-[#F5CF49] text-center flex flex-col justify-center items-center rounded transition duration-300 group hover:bg-[#F5CF49]"
            >
              <h2 className="font-bold text-[#F5CF49] transition duration-300 group-hover:text-white">
                {showtime}
              </h2>
              <p className="font-semibold text-[18px] text-[#F5CF49] transition duration-300 group-hover:text-black">
                {index === 0
                  ? "Thứ Bảy"
                  : index === 1
                  ? "Chủ Nhật"
                  : index === 2
                  ? "Thứ Hai"
                  : "Thứ Ba"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Danh Sách Rạp Section */}
      <section className="mt-10">
        <h2 className="text-[40px] font-bold mb-4 text-center mt-20 pb-3">
          Danh Sách Rạp
        </h2>
        <div className="flex flex-col items-center">
          {/* Example theater list */}
          {["TICKER QUẬN 12", "TICKER QUẬN 1"].map((theater, index) => (
            <div
              key={index}
              className="bg-[rgba(0,0,0,0.3)] w-full max-w-[1035px] h-[241px] p-4 mb-4 rounded"
            >
              <div className="flex justify-between">
                <h3 className="text-[28px] text-[#F5CF49] font-semibold">
                  {theater}
                </h3>
                <p>^</p>
              </div>
              <p className="text-[16px] font-light mt-4 ml-7">
                Quận 1, Thành phố Hồ Chí Minh
              </p>
              <div className="flex space-x-4 mt-4 ml-7">
                <div className="w-[120px] h-[40px] bg-[#F5CF49] text-center flex flex-col justify-center items-center rounded">
                  <p className="text-[14px] text-black">8:00</p>
                </div>

                <div className="w-[120px] h-[40px] bg-[#F5CF49] text-center flex flex-col justify-center items-center rounded">
                  <p className="text-[14px] text-black">11:00</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chọn Loại Vé Section */}
      <section className="mt-10">
        <h2 className="text-[40px] font-bold mt-20 mb-5 text-center">
          CHỌN LOẠI VÉ
        </h2>
        <div className="flex justify-center gap-4">
          {Loaive.map((ticketType) => (
            <div
              key={ticketType.id}
              className="w-[313px] h-[150px] border-2 border-white bg-[#212529] p-4 rounded"
            >
              <h3 className="text-lg text-[18px] font-bold">
                {ticketType.TenVe}
              </h3>
              <p className="text-[14px] text-gray-400">
                Giá: {ticketType.GiaVe.toLocaleString()} VND
              </p>
              <div className="w-[92px] h-[31px] bg-[#F5CF49] flex items-center justify-center space-x-2 mt-2 rounded ml-[150px]">
                <button className="text-black p-1">-</button>
                <span className="text-black p-1">1</span>
                <button className="text-black p-1">+</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seat Selection Section */}
<section className="rounded-lg shadow-lg p-4 mt-4 mx-4">
  <h1 className="text-3xl font-bold text-center">CHỌN GHẾ - RẠP 03</h1>
  <div className="bg-white text-black text-center py-2 rounded mt-4">
    Màn hình
  </div>

  <div className="flex flex-col items-center mt-20">
    {/* Ghế từng hàng */}
    {seats.map(({ row, seats }) => (
      <div key={row} className="flex items-center mb-4">
        <div className="w-8 text-center font-bold">{row}</div>
        {/* Hiển thị ghế trong hàng */}
        <div className="flex space-x-2">
          {seats.map(({ number, booked }) => (
            <div key={`${row}${number}`} className="seat">
              <button
                className={`w-12 h-12 border-2 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  booked
                    ? 'bg-gray-300 cursor-not-allowed' // Ghế đã đặt
                    : 'bg-gray-800 text-white hover:bg-[#F5CF49] hover:text-black'
                }`}
                onClick={() => !booked && handleSeatClick(`${row}${number}`)}
                disabled={booked} // Vô hiệu hóa nút nếu ghế đã đặt
              >
                {`${row}${number}`}
              </button>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>

  {/* Legends */}
  <div className="legends flex justify-center mt-4">
    <div className="legend flex items-center mr-4">
      <div className="legend-box w-4 h-4 bg-blue-500 mr-2"></div> Ghế Đơn
    </div>
    <div className="legend flex items-center mr-4">
      <div className="legend-box w-4 h-4 bg-green-500 mr-2"></div> Ghế Đôi
    </div>
    <div className="legend flex items-center mr-4">
      <div className="legend-box w-4 h-4 bg-gray-300 mr-2"></div> Ghế Thường
    </div>
    <div className="legend flex items-center">
      <div className="legend-box w-4 h-4 bg-yellow-300 mr-2"></div> Ghế Chọn
    </div>
  </div>
</section>



      {/* Combo Section */}
      <section className="mt-10">
        <h2 className="text-[40px] font-bold mt-20 mb-5 text-center">
          CHỌN COMBO
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {combo.map((item) => (
            <div
              key={item.id}
              className="w-[350px] p-4 flex items-center gap-4" // Tạo layout cho 3 cột
            >
              {/* Left: Combo Image */}
              <div className="flex-shrink-0">
                <img
                  src={`/images/combo/${item.Anh}`}
                  alt={item.TenCombo}
                  className="h-[130px] w-[130px] object-cover rounded"
                />
              </div>

              {/* Right: Combo Info */}
              <div>
                <h3 className="mb-2 text-[16px] font-bold">{item.TenCombo}</h3>
                <p className="mb-2 text-[14px] font-bold">{item.NoiDung}</p>
                <p className="mb-2 text-[14px] font-bold">
                  Giá: {item.Gia.toLocaleString()} VND
                </p>
                <div className="w-[92px] h-[31px] bg-[#F5CF49] flex items-center justify-center space-x-2 mt-2 rounded">
                  <button className="text-black p-1">-</button>
                  <span className="text-black p-1">1</span>
                  <button className="text-black p-1">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tổng tiền */}
      <section className="mt-10">
        <div className="flex justify-between items-center">
          {/* Empty div to create space for centering */}
          <div className="flex-grow"></div>
          {/* Centered Heading */}
          <h2 className="text-center text-[20px] font-bold flex-grow">
            Tổng tiền: <span className="font-light"> 200.000 VND</span>
          </h2>
          {/* Continue Button */}
          <button className="bg-[#F5CF49] text-black m-3 w-40 h-[40px] rounded hover:bg-[#FFD700]">
            Tiếp tục
          </button>
        </div>
      </section>
    </div>
  );
};

export default DatVe;
