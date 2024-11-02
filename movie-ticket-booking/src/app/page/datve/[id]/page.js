"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const DatVe = () => {
  const { id } = useParams();
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movies, setMovies] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [ticketTypes, setTicketTypes] = useState([]);
  // const [combos, setcombos] = useState([]);
  const [comboQuantities, setComboQuantities] = useState({});
  const [ticketQuantities, setTicketQuantities] = useState({});
  const [raps, setRaps] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [seats, setSeats] = useState([]);
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCinema, setShowCinema] = useState(false);
  const [selectedRap, setSelectedRap] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState(null); // Lưu ID phòng đã chọn
  const [selectedDate, setSelectedDate] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedTicketType, setSelectedTicketType] = useState(null); 

  const calculateTotal = () => {
    const ticketPrice = selectedSeats.length > 0 ? ticketTypes.reduce((acc, type) => {
      return acc + (type.GiaVe * ticketQuantities[type.id]); // Tính giá vé chỉ khi có ghế được chọn
    }, 0) : 0; // Nếu không có ghế nào được chọn, giá vé là 0
    const comboPrice = combos.reduce((acc, combo) => {
      return acc + (combo.Gia * comboQuantities[combo.id]); // Giả sử mỗi combo có thuộc tính price và quantity
    }, 0);
    const total = (ticketPrice + comboPrice) // Tính tổng
    setTotalAmount(total);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieResponse = await fetch(`http://localhost:3000/sanpham/${id}`);
        const moviesData = await movieResponse.json();
        setMovies(moviesData);

        const ticketResponse = await fetch('http://localhost:3000/loaive');
        const ticketTypesData = await ticketResponse.json();
        setTicketTypes(ticketTypesData);

        const initialTicketQuantities = ticketTypesData.reduce((acc, ticket) => {
          acc[ticket.id] = 0;
          return acc;
        }, {});
        setTicketQuantities(initialTicketQuantities);

        const comboResponse = await fetch('http://localhost:3000/combo');
        const combosData = await comboResponse.json();
        setCombos(combosData);

        const initialComboQuantities = combosData.reduce((acc, combo) => {
          acc[combo.id] = 0;
          return acc;
        }, {});
        setComboQuantities(initialComboQuantities);

        // const rapResponse = await fetch(`http://localhost:3000/rap/phongchieu/${id}`);
        // const rapsData = await rapResponse.json();
        // setRaps(rapsData);

        const showtimeResponse = await fetch(`http://localhost:3000/suatchieu/phim/${id}`);
        const showtimesData = await showtimeResponse.json();
        setShowtimes(showtimesData);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    calculateTotal();
  }, []);

  useEffect(() => {
    calculateTotal(); // Gọi hàm tính tổng khi có thay đổi
  }, [selectedSeats, ticketQuantities, comboQuantities]);


  const handleSuatChieuClick = async (showtime) => {
    try {
      // Fetch lại danh sách suất chiếu
      const showtimeResponse = await fetch(
        `http://localhost:3000/suatchieu/phim/${id}/dangchieu`
      );
      const showtimesData = await showtimeResponse.json();
      setShowtimes(showtimesData);
      setShowCinema(true);
      setSelectedDate(showtime.NgayChieu); // Lưu Ngày đã chọn

      // Fetch lại danh sách phòng
      const roomsResponse = await fetch(
        `http://localhost:3000/suatchieu/phim/${id}`
      );
      const roomsData = await roomsResponse.json();

      // Lọc các phòng chỉ dựa trên IdPhong của showtimesData
      const filteredRooms = roomsData.filter((room) =>
        showtimesData.some((showtime) => showtime.IdPhong === room.IdPhong)
      );

      setRooms(filteredRooms);
      setSelectedRoomId(showtime.IdPhong); // Lưu ID phòng đã chọn
    } catch (error) {
      console.error("Error fetching showtimes:", error);
    }
  };

  const handleGioChieuClick = async (showtime) => {
    setSelectedRoomId(showtime.IdPhong);
    // Fetch ghế tương ứng với giờ chiếu
    try {
      const seatsResponse = await fetch(`http://localhost:3000/suatchieu/ghe/${showtime.IdPhong}`);
      const seatsData = await seatsResponse.json();
      setSeats(seatsData);
    } catch (error) {
      console.error("Error fetching seats:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const getDayOfWeek = (dateString) => {
    const [day, month, year] = dateString.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    const days = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
    return days[date.getDay()];
  };

  const groupedRooms = rooms.reduce((acc, room) => {
    const showtimesForRoom = showtimes.filter(
      (showtime) =>
        showtime.IdPhong === room.IdPhong &&
        showtime.NgayChieu === selectedDate
    );

    if (showtimesForRoom.length > 0) {
      const existingRoom = acc.find((r) => r.IdPhong === room.IdPhong);

      if (!existingRoom) {
        acc.push({
          ...room,
          showtimes: showtimesForRoom,
        });
      }
    }

    return acc;
  }, []);

  const handleTicketQuantityChange = (ticketId, change) => {
    setTicketQuantities((prev) => {
      const updatedQuantities = {
        ...prev,
        [ticketId]: Math.max(0, prev[ticketId] + change),
      };

      // Tính tổng số vé
      const totalTickets = Object.values(updatedQuantities).reduce(
        (acc, quantity) => acc + quantity,
        0
      );

      if (change > 0) {
        setSelectedTicketType(ticketId); // Lưu loại vé khi tăng số lượng
    } else {
        // Nếu giảm số lượng, kiểm tra nếu số lượng đã về 0 thì không chọn
        if (updatedQuantities[ticketId] === 0) {
            setSelectedTicketType(null);
        }
    }

      // Giới hạn số ghế chọn theo số lượng vé
      if (selectedSeats.length > totalTickets) {
        setSelectedSeats(selectedSeats.slice(0, totalTickets));
      }
      return updatedQuantities;

    });
  };

  const handleComboQuantityChange = (comboId, change) => {
    setComboQuantities((prev) => {
      const updatedQuantities = {
        ...prev,
        [comboId]: Math.max(0, prev[comboId] + change),
      };
      return updatedQuantities;
    });
  }

  const toggleSeatSelection = (row, seat) => {
    const seatCode = `${row}-${seat}`;
    const totalTickets = Object.values(ticketQuantities).reduce(
      (acc, quantity) => acc + quantity,

    );

    if (!totalTickets) {
      alert("Vui lòng chọn số lượng vé trước khi chọn ghế.");
      return;
    }

    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatCode)) {
        return prevSelectedSeats.filter((s) => s !== seatCode);
      } else if (prevSelectedSeats.length < totalTickets) {
        return [...prevSelectedSeats, seatCode];
      } else {
        alert("Số ghế chọn không được vượt quá số vé đã chọn");
      }
      return prevSelectedSeats;
    });
  };

  const handleContinue = () => {

    const isLoggedIn  = Cookies.get("token");
    if (!isLoggedIn ) {
      alert("Vui lòng đăng nhập để đặt vé.");

      return;
    }

    const selectedTicketTypes = ticketTypes
        .filter(ticketType => ticketQuantities[ticketType.id] > 0) // Filter selected ticket types
        .map(ticketType => ({
            name: ticketType.TenVe,
            price: ticketType.GiaVe,
            quantity: ticketQuantities[ticketType.id] // Quantity of selected ticket types
        }));

    const selectedCombos = combos
        .filter(combo => comboQuantities[combo.id] > 0) // Filter selected combos
        .map(combo => ({
            name: combo.TenCombo,
            price: combo.Gia,
            quantity: comboQuantities[combo.id] // Quantity of selected combos
        }));

    // Find the selected showtime and room corresponding to the selected IDs
    const selectedShowtime = showtimes.find(showtime => showtime.IdPhong === selectedRoomId && showtime.NgayChieu === selectedDate);
    const selectedRoom = rooms.find(room => room.IdPhong === selectedRoomId);

    const holdTimeInMinutes = 5; // Change this value if needed
    const holdTime = new Date(Date.now() + holdTimeInMinutes * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Include date and time separately if selectedShowtime is found
    const showtimeDate = selectedShowtime ? selectedShowtime.NgayChieu : null; // Date
    const showtimeTime = selectedShowtime ? selectedShowtime.GioChieu : null; // Time

    // Save necessary information to cookie
    Cookies.set("bookingInfo", JSON.stringify({
        selectedSeats,       // List of selected seats
        ticketQuantities,    // Ticket quantities
        combos: selectedCombos, // Combo quantities
        totalAmount,         // Total amount
        movieName: movies.Ten,   // Movie name
        showtimeDate,        // Showtime date
        showtimeTime,        // Showtime time
        room: selectedRoom ? selectedRoom.TenPhongChieu : null, // Room name
        ticketTypes: selectedTicketTypes,
        holdTime   
    }), { expires: 30 / 1440 });  // Expires in 5 minutes (1 day / 288)

    // Redirect or perform other actions after saving to cookie
    router.push("/page/checkout");
};


  
  return (
    <div className="justify-center mx-auto text-white bg-[rgba(0,0,0,0.6)] shadow-lg w-full max-w-[1410px] mx-auto">
      <section>
        <div className="flex justify-center">
          <div className="">
            <div className="flex flex-col md:flex-row items-start gap-20 mr-[120px] mt-8">
              {/* left box image */}
              <div className="md:w-1/2 flex justify-end mb-8 md:mb-0">
                <img
                  src={movies.Anh}
                  alt={movies.title}
                  className="object-cover"
                  style={{ height: "650px", width: "auto" }}
                />
              </div>

              {/* right box info */}
              <div className="pt-20 md:w-1/2 flex flex-col space-y-6">
                <h1 className="text-[30px] font-semibold mb-4">
                  {movies.Ten}
                </h1>

                {/* Description */}
                <h1 className="pt-20 text-[20px] font-bold">Nội Dung</h1>
                <p className="text-[18px] mb-4">{movies.ThongTinPhim}</p>

                {/* Additional movie information */}
                <div className="pt-20 flex flex-wrap justify-between mb-6">
                  <p className="text-[18px]">
                    <span className="font-semibold">Thể loại:</span>{" "}
                    {movies.TheLoai.KieuPhim}
                  </p>
                  <p className="text-[18px]">
                    <span className="font-semibold">Thời gian:</span>{" "}
                    {movies.TheLoai.ThoiLuong}
                  </p>
                  <p className="text-[18px]">
                    <span className="font-semibold">Quốc gia:</span>{" "}
                    {movies.TheLoai.QuocGia}
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
          {Object.entries(
            showtimes.reduce((acc, showtime) => {
              const key = showtime.NgayChieu;
              if (!acc[key]) {
                acc[key] = { ...showtime };
              }
              return acc;
            }, {})
          ).sort(([dateA], [dateB]) => {
            const [dayA, monthA, yearA] = dateA.split("/").map(Number);
            const [dayB, monthB, yearB] = dateB.split("/").map(Number);
            return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
          })
            .map(([_, showtime], index) => (
              <div
                key={index} // Tạo key duy nhất từ IdPhong và NgayChieu
                onClick={() => {
                  handleSuatChieuClick(showtime);
                  // handleGioChieuClick(showtime);
                }}
                className="h-[93px] w-[103px] border-2 border-[#F5CF49] text-center flex flex-col justify-center items-center rounded transition duration-300 group hover:bg-[#F5CF49]"
              >
                <h2 className="font-bold text-[#F5CF49] transition duration-300 group-hover:text-white">
                  {showtime.NgayChieu}
                </h2>
                <p className="font-semibold text-[18px] text-[#F5CF49] transition duration-300 group-hover:text-black">
                  {getDayOfWeek(showtime.NgayChieu)}   {/* render ngày ra thứ*/}
                </p>
              </div>
            ))}
        </div>
      </section>

      {/* Danh Sách Rạp Section */}
      {showCinema && selectedDate && ( // Hiển thị danh sách phòng chiếu nếu đã chọn Ngày
        <section className="mt-10">
          <h2 className="text-[40px] font-bold mb-4 text-center mt-20 pb-3">
            Danh Sách Rạp
          </h2>
          <div className="flex flex-col items-center">
            {groupedRooms.map((room) => (
              <div
                key={room.IdPhong}
                className="bg-[rgba(0,0,0,0.3)] w-full max-w-[1035px] p-4 mb-4 rounded"
              >
                <div className="flex justify-between">
                  <h3 className="text-[28px] text-[#F5CF49] font-semibold">
                    {room.TenPhongChieu}
                  </h3>
                  <p>^</p>
                </div>
                <div className=" flex flex-row justify-start ">
                  {/* Hiển thị giờ chiếu cho phòng */}
                  {room.showtimes.map((showtime, index) => (
                    <div
                      key={index} // sử dụng index vì giờ chiếu có thể trùng lặp
                      className="mt-2 w-[120px] h-[40px] bg-[#F5CF49] text-center flex flex-row justify-center items-center rounded cursor-pointer mr-4"
                      onClick={() => handleGioChieuClick(showtime)}
                    >
                      <p className="text-[14px] text-black">
                        {showtime.GioChieu}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}


      {/* Chọn Loại Vé Section */}
      {showCinema && selectedDate && (
        <section className="mt-10">
          <h2 className="text-[40px] font-bold mt-20 mb-5 text-center">
            CHỌN LOẠI VÉ
          </h2>
          <div className="flex justify-center gap-4">
            {ticketTypes.map((ticketType) => (
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
                  <button
                    className="text-black p-1"
                    onClick={() => handleTicketQuantityChange(ticketType.id, -1)}
                  >
                    -
                  </button>
                  <span className="text-black p-1">
                    {ticketQuantities[ticketType.id]}
                  </span>
                  <button
                    className="text-black p-1"
                    onClick={() => handleTicketQuantityChange(ticketType.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Seat Selection Section */}
      {seats.length > 0 && (
        <section className="mt-10">
          <h2 className="text-[40px] font-bold mb-4 text-center">
            Danh Sách Ghế
          </h2>
          <div className="flex flex-col items-center">
            {seats.map((row) => (
              <div key={row.Hang} className="flex items-center mb-4">
                <span className="font-bold mr-4">{row.Hang}: </span>
                {row.Ghe.map((ghe, index) => {
                  const seatCode = `${row.Hang}-${ghe}`;
                  const isSelected = selectedSeats.includes(seatCode);
                  return (
                    <div
                      key={index}
                      onClick={() => toggleSeatSelection(row.Hang, ghe)}

                      className={`ml-2 w-[70px] h-[40px] flex items-center justify-center rounded cursor-pointer ${isSelected ? "bg-green-500" : "bg-[#F5CF49]"
                        }`}
                    >
                      <p className="text-black">{ghe}</p>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Combo Section */}
      <section className="mt-10">
        <h2 className="text-[40px] font-bold mt-20 mb-5 text-center">
          CHỌN COMBO
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {combos.map((item) => (
            <div
              key={item.id}
              className="w-[350px] p-4 flex items-center gap-4" // Tạo layout cho 3 cột
            >
              {/* Left: Combo Image */}
              <div className="flex-shrink-0">
                <img
                  src={`${item.Anh}`}
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
                  <button
                    className="text-black p-1"
                    onClick={() => handleComboQuantityChange(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="text-black p-1">
                    {comboQuantities[item.id]}
                  </span>
                  <button
                    className="text-black p-1"
                    onClick={() => handleComboQuantityChange(item.id, 1)}
                  >
                    +
                  </button>
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
            Tổng Tiền: {totalAmount.toLocaleString()} VNĐ
          </h2>
          {/* Continue Button */}
          <button
            onClick={handleContinue} // Gọi hàm lưu vào cookie
            className="bg-[#F5CF49] text-black m-3 w-40 h-[40px] rounded hover:bg-[#FFD700]"
          >
            Tiếp tục
          </button>
        </div>
      </section>
    </div>
  );
};

export default DatVe;