"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const DatVe = () => {
  const { id } = useParams();
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movies, setMovies] = useState({});
  const [showtimes, setShowtimes] = useState([]);
  const [raps, setRaps] = useState([]);
  const [seats, setSeats] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [combos, setCombos] = useState([]);
  const [quantities, setQuantities] = useState({}); // State for combo quantities

  useEffect(() => {
    const fetchRap = async () => {
      const response = await axios.get("http://localhost:3000/rap");
      setRaps(response.data);
    };

    fetchRap();
  }, [id]);

  const fetchCombos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/combo");
      setCombos(response.data);
    } catch (error) {
      console.error("Error fetching combos:", error);
    }
  };

  const handlePhongChieuClick = async (phongChieu) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/suatchieu?IdPhong=${phongChieu.id}`
      );
      setShowtimes(response.data);
    } catch (error) {
      console.error("Error fetching showtimes:", error);
    }
  };

  const handleShowtimeClick = async (showtime) => {
    setSelectedShowtime(showtime);
    fetchCombos(); // Gọi fetchCombos khi nhấn vào lịch chiếu
    try {
      const response = await axios.get(
        `http://localhost:3000/rap/phongchieu/${showtime.IdPhong}`
      );
      setSeats(response.data.Ghe);
    } catch (error) {
      console.error("Error fetching seats:", error);
    }
  };

  const handleSeatClick = (seat) => {
    setSelectedSeats((prevSelected) => {
      if (prevSelected.includes(seat)) {
        return prevSelected.filter((s) => s !== seat);
      }
      return [...prevSelected, seat];
    });
  };

  const handleQuantityChange = (comboId, change) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[comboId] || 1;
      const newQuantity = Math.max(currentQuantity + change, 1); // Ensure quantity is at least 1
      return {
        ...prevQuantities,
        [comboId]: newQuantity,
      };
    });
  };

  const handleBooking = async () => {
    Cookies.set("selectedSeats", JSON.stringify(selectedSeats));
    Cookies.set("selectedShowtime", JSON.stringify(selectedShowtime));
    Cookies.set("selectedCombo", JSON.stringify(quantities)); // Now using quantities
    router.push("/page/checkout");
};

  return (
    <div className="justify-center mx-auto text-white bg-[rgba(0,0,0,0.6)] shadow-lg w-full max-w-[1410px] mx-auto">
      <section className="mt-10">
        <h2 className="text-[40px] font-bold mb-4 text-center mt-20 pb-3">
          Danh Sách Phòng
        </h2>
        <div className="flex flex-col items-center">
          {raps.map((rap) => (
            <div
              key={rap._id}
              className="bg-[rgba(0,0,0,0.3)] w-full max-w-[1035px] p-4 mb-4 rounded"
            >
              <div className="flex justify-between">
                <h3 className="text-[28px] text-[#F5CF49] font-semibold">
                  {rap.TenRap}
                </h3>
                <p>^</p>
              </div>
              <p className="text-[16px] font-light mt-4">{rap.ViTri}</p>
              <div className="flex space-x-4 mt-4">
                {rap.PhongChieu.map((phongChieu) => (
                  <div
                    key={phongChieu.id}
                    onClick={() => handlePhongChieuClick(phongChieu)}
                    className="w-[120px] h-[40px] bg-[#F5CF49] text-center flex flex-col justify-center items-center rounded cursor-pointer"
                  >
                    <p className="text-[14px] text-black">
                      {phongChieu.TenPhongChieu}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {showtimes.length > 0 && (
        <section>
          <h1 className="text-center text-[40px] font-bold mt-8 pb-3">
            Lịch Chiếu
          </h1>
          <div className="flex justify-center gap-4 mt-6">
            {showtimes.map((showtime) => (
              <div
                key={showtime.id}
                onClick={() => handleShowtimeClick(showtime)}
                className="h-[93px] w-[103px] border-2 border-[#F5CF49] text-center flex flex-col justify-center items-center rounded cursor-pointer transition duration-300 group hover:bg-[#F5CF49]"
              >
                <h2 className="font-bold text-[#F5CF49] transition duration-300 group-hover:text-white">
                  {showtime.NgayChieu}
                </h2>
                <h2 className="font-bold text-[#F5CF49] transition duration-300 group-hover:text-white">
                  {showtime.GioChieu}
                </h2>
              </div>
            ))}
          </div>
        </section>
      )}

{selectedSeats && (
  <section className="rounded-lg shadow-lg p-4 mt-4 mx-4">
    <h1 className="text-3xl font-bold text-center">CHỌN GHẾ</h1>
          
    <div className="w-full flex flex-col items-center">
      <img src="/images/img-screen.png" // Replace with the actual path to your image
           alt="Seating Arrangement"
           className="mb-4 w-full max-w-[600px] rounded"/>
      {seats.map((row) => (
        <div key={row.Hang} className="flex flex-row my-4 items-center mx-4">
          <span className="font-bold text-lg mb-2">{row.Hang}</span>
          <div className="flex flex-row">
            {row.Ghe.map((seat) => (
              <div
                key={seat}
                className={`m-1 w-12 h-12 border-2 rounded-lg cursor-pointer transition duration-300 ease-in-out flex items-center justify-center 
                ${
                  seat.TrangThai === "dadat"
                    ? "bg-red-500 border-red-700 cursor-not-allowed opacity-70" // Đỏ cho ghế đã đặt
                    : selectedSeats.includes(seat)
                    ? "bg-blue-500 border-blue-700" // Xanh dương cho ghế đã chọn
                    : "bg-green-500 border-green-700 hover:bg-green-400 hover:border-green-600" // Xanh cho ghế có sẵn
                }`}
                onClick={() =>
                  seat.TrangThai !== "dadat" &&
                  handleSeatClick(seat) // Chỉ toggle nếu không bị đặt
                }
                title={
                  seat.TrangThai === "dadat"
                    ? "Ghế đã đặt"
                    : "Nhấn để chọn ghế"
                }
              >
                <span className="text-white font-semibold">{seat}</span>{" "}
                {/* Hiển thị số ghế */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
)}



      {/* Combo Section */}
{combos.length > 0 && (
  <section className="mt-10">
    <h2 className="text-[40px] font-bold mt-8 mb-5 text-center">
      CHỌN COMBO
    </h2>
    <div className="flex flex-wrap justify-center gap-4">
      {combos.map((item) => (
        <div
          key={item.id}
          className="w-[350px] p-4 flex items-center gap-4 bg-gray-800 rounded-lg"
        >
          {/* Left: Combo Image */}
          <div className="flex-shrink-0">
            <img
              src={item.Anh} // Ensure this path is correct
              alt={item.TenCombo}
              className="h-[130px] w-[130px] object-cover rounded"
            />
          </div>

          {/* Right: Combo Info */}
          <div>
            <h3 className="mb-2 text-[16px] font-bold text-[#F5CF49]">
              {item.TenCombo}
            </h3>
            <p className="mb-2 text-[14px] font-bold text-white">{item.NoiDung}</p>
            <p className="mb-2 text-[14px] font-bold text-white">
              Giá: {item.Gia.toLocaleString()} VND
            </p>
            <div className="w-[92px] h-[31px] bg-[#F5CF49] flex items-center justify-center space-x-2 mt-2 rounded">
              <button
                className="text-black p-1"
                onClick={() => handleQuantityChange(item.id, -1)}
              >
                -
              </button>
              <span className="text-black p-1">
                {quantities[item.id] || 1}
              </span>
              <button
                className="text-black p-1"
                onClick={() => handleQuantityChange(item.id, 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
)}


<div className="flex justify-end mx-10 py-10">
  <button
    onClick={handleBooking}
    className="bg-[#F5CF49] text-black px-6 py-2 rounded"
  >
    Đặt Ghế
  </button>
</div>

    </div>
  );
};

export default DatVe;
