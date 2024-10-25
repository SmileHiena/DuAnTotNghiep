"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
// import { setBookingDetails, setSeats } from "../redux/slices/bookingSlice";

const DatVe = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [suatchieu, setSuatchieu] = useState([]);
  const [raps, setRaps] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [Loaive, setLoaive] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [Combo, setCombo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null); 
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const handleContinue = () => {
    dispatch(
      setBookingDetails({
        movieId: id,
        showtime: selectedShowtime,
        theater: selectedRoom,
      })
    );
    dispatch(setSeats(selectedSeats));
    // Điều hướng tới bước tiếp theo (giả sử bạn có route tới trang thanh toán)
  };


  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) {
        console.error("Movie ID is missing");
        return;
      }

      console.log(`Fetching data for movie ID: ${id}`);

      try {
        const movieResponse = await fetch(
          `http://localhost:3000/sanpham/${id}`
        );
        if (!movieResponse.ok) {
          throw new Error(
            `Failed to fetch movie data: ${movieResponse.statusText}`
          );
        }
        const movieData = await movieResponse.json();
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  // ----- Suất Chiếu -----
  useEffect(() => {
    const fetchSuatchieu = async () => {
      try {
        const response = await fetch("http://localhost:3000/suatchieu"); // Địa chỉ API
        if (!response.ok) {
          throw new Error("Failed to fetch suatchieu");
        }
        const data = await response.json();
        setSuatchieu(data);
      } catch (error) {
        console.error("Error fetching suatchieu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuatchieu();
  }, []);

  // ----- Rạp -----
  useEffect(() => {
    const fetchRaps = async () => {
      try {
        const response = await fetch(`http://localhost:3000/rap/`);
        if (!response.ok) {
          throw new Error("Failed to fetch raps");
        }
        const data = await response.json();
        setRaps(data);
      } catch (error) {
        console.error("Error fetching raps:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRaps();
  }, []);

  const handleShowtimeClick = (showtime, roomId) => {
    setSelectedShowtime(showtime);
    console.log("Selected Showtime:", showtime);
    console.log("Selected Room ID:", roomId); // Display the selected room ID
  };

  const handleSeatClick = (seat, roomId) => {
    if (seat.TrangThai === "controng") {
      // Only select empty seats
      setSelectedSeat(seat);
      console.log(`Selected seat: ${seat.SoGhe}, Room ID: ${roomId}`);
      // Load or perform any action based on the selected seat and room ID
    } else {
      console.log(`Seat ${seat.SoGhe} is not available.`);
    }
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setSelectedRoomId(room.id); // Store the ID of the selected room
  };

  // ----- Loại vé -----
  useEffect(() => {
    const fetchLoaive = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await fetch(`http://localhost:3000/loaive/`);
        if (!response.ok) {
          throw new Error("Failed to fetch loaive");
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Log fetched data
        setLoaive(data);
      } catch (error) {
        console.error("Error fetching loaive:", error);
        setError("Error fetching ticket types. Please try again.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    const toggleSeatSelection = (seatId) => {
      setSelectedSeats((prevSelected) =>
        prevSelected.includes(seatId)
          ? prevSelected.filter((id) => id !== seatId)
          : [...prevSelected, seatId]
      );
    };

    fetchLoaive(); // Call fetchLoaive on component mount
  }, []);
  const handleQuantityChange = (id, change) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) + change, 1), // Ensure quantity is at least 1
    }));
  };

  const handleScreenSelect = (screen) => {
    setSelectedScreen(screen);
    setSeats(screen.Ghe); // Assuming 'Ghe' contains the rows and seats data
  };

  // ----- Combo -----
  useEffect(() => {
    const fetchCombo = async () => {
      try {
        const response = await fetch("http://localhost:3000/combo");
        if (!response.ok) throw new Error("Failed to fetch Combo");
        const data = await response.json();
        setCombo(data);
      } catch (error) {
        console.error("Error fetching Combo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCombo();
  }, []);

  const toggleSeatSelection = (seatId) => {
    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seatId)
        ? prevSelected.filter((id) => id !== seatId)
        : [...prevSelected, seatId]
    );
  };

  const handleScreenSelection = (screenId) => {
    const selectedScreen = PhongChieu.find((screen) => screen.id === screenId);
    if (selectedScreen) {
      const seats = selectedScreen.Ghe.flatMap((row) => row.Ghe);
      setSeats(seats);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="justify-center mx-auto text-white bg-[rgba(0,0,0,0.6)] shadow-lg w-full max-w-[1410px] mx-auto">
      <section>
        <div className="flex justify-center">
          <div className="">
            <div className="flex flex-col md:flex-row items-start gap-20 mr-[120px] mt-8">
              {/* left box image */}
              <div className="md:w-1/2 flex justify-end mb-8 md:mb-0">
                <img
                  src={movie.Anh}
                  alt={movie.title}
                  className="object-cover"
                  style={{ height: "650px", width: "auto" }}
                />
              </div>

              {/* right box info */}
              <div className="pt-20 md:w-1/2 flex flex-col space-y-6">
                <h1 className="text-[30px] font-semibold mb-4">{movie.Ten}</h1>

                {/* Description */}
                <h1 className="pt-20 text-[20px] font-bold">Nội Dung</h1>
                <p className="text-[18px] mb-4">{movie.ThongTinPhim}</p>

                {/* Additional movie information */}
                <div className="pt-20 flex flex-wrap justify-between mb-6">
                  <p className="text-[18px]">
                    <span className="font-semibold">Thể loại:</span>{" "}
                    {movie.TheLoai ? movie.TheLoai.KieuPhim : "N/A"}
                  </p>

                  <p className="text-[18px]">
                    <span className="font-semibold">Thời gian:</span>{" "}
                    {movie.TheLoai ? movie.TheLoai.ThoiLuong : "N/A"}
                  </p>
                  <p className="text-[18px]">
                    <span className="font-semibold">Quốc gia:</span>{" "}
                    {movie.TheLoai ? movie.TheLoai.QuocGia : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suất Chiếu Section */}
      <section className="w-1410 mx-auto">
        <h1 className="text-center text-[40px] font-bold mt-20 pb-3">
          Suất Chiếu
        </h1>
        <div className="flex justify-center gap-6 mt-6 flex-wrap">
          {suatchieu.map((showtime) => (
            <div
              key={showtime.id}
              className="h-[150px] w-[150px] border-4 border-[#F5CF49] text-center flex flex-col justify-center items-center rounded-lg transition duration-300 group hover:bg-[#F5CF49] shadow-lg cursor-pointer"
              onClick={() => handleShowtimeClick(showtime)}
            >
              <p className="text-2xl font-semibold">{showtime.ThoiGian}</p>
              <p className="text-lg font-semibold">{showtime.NgayChieu}</p>
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
        {raps.length > 0 ? (
          raps.map((theater) => (
            <div
              key={theater.id} // Make sure the ID is unique
              className="bg-[rgba(0,0,0,0.3)] w-full max-w-[1035px] p-4 mb-4 rounded"
            >
              <div className="flex justify-between">
                <h3 className="text-[28px] text-[#F5CF49] font-semibold">
                  {theater.TenRap}
                </h3>
                <p>^</p>
              </div>
              <p className="text-[16px] font-light mt-4 ml-7">
                {theater.ViTri}
              </p>
              <div className="flex flex-wrap mt-4 ml-7">
                {theater.PhongChieu.map((room) => (
                  <div
                    key={room.id}
                    className={`items-center text-center flex flex-col justify-center items-center rounded p-2 mb-2 mx-2 cursor-pointer w-[200px] ${
                      selectedRoomId === room.id ? 'bg-[#F5CF49]/70' : 'bg-[#F5CF49]'
                    }`} // Change color based on selection
                    onClick={() => handleRoomClick(room)}
                  >
                    <p className="text-[16px]">{room.TenPhongChieu}</p>
                  </div>
                ))}
              </div>
              {/* Long box for showtimes */}
              <div className="mt-4 w-full bg-[rgba(0,0,0,0.5)] p-4 rounded">
                {selectedRoom ? (
                  <>
                    <h4 className="text-[18px] font-semibold">Lịch Chiếu:</h4>
                    {selectedRoom.LichChieu.map((schedule) => (
                      <div key={schedule.IdSuatChieu} className="mt-2">
                        {schedule.GioChieu.map((showtime) => (
                          <div
                            key={showtime.id}
                            className="flex justify-between mb-2 cursor-pointer"
                            onClick={() =>
                              handleShowtimeClick(showtime, selectedRoom.id)
                            }
                          >
                            {/* Combined Time and Status Box */}
                            <div
                              className={`h-[50px] w-full flex justify-between items-center border-2 rounded transition duration-300 group ${
                                showtime.TrangThai === "hetcho"
                                  ? "border-red-500"
                                  : "border-green-500"
                              }`}
                            >
                              <div className="flex justify-center items-center w-1/2 group-hover:bg-[#F5CF49]">
                                <p className="text-[16px] font-semibold transition duration-300">
                                  {showtime.Gio}
                                </p>
                              </div>
                              <div className="flex justify-center items-center w-1/2 group-hover:bg-[#F5CF49]">
                                <p className="text-[16px] font-semibold transition duration-300">
                                  {showtime.TrangThai === "hetcho"
                                    ? "Hết chỗ"
                                    : "Còn trống"}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-gray-500">
                    Vui lòng chọn phòng để xem lịch chiếu.
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>No theaters available.</div>
        )}
      </div>
    </section>

      {/* Selected Seats Section */}
      <div className="mt-10 flex flex-col items-center">
        <h2 className="text-[28px] font-bold mb-4 text-center">
          Chọn Ghế
          {selectedRoom && (
            <p className="mt-4 text-center text-[16px] text-white">
              {selectedRoom.id} {/* Display the Room ID here */}
            </p>
          )}
        </h2>

        <img
          src="/images/img-screen.png" // Replace with the actual path to your image
          alt="Seating Arrangement"
          className="mb-4 w-full max-w-[600px] rounded" // Adjust max-width as needed
        />

        {selectedRoom && (
          <div className="w-full flex flex-col items-center">
            {" "}
            {/* Centered container for seats */}
            {selectedRoom.Ghe.map((row) => (
              <div key={row.Hang} className="flex items-center mb-2">
                <span className="text-lg font-bold mr-2">{row.Hang}</span>{" "}
                {/* Display row letter */}
                {row.Ghe.map((seat) => (
                  <div
                    key={seat.id}
                    className={`seat relative flex items-center justify-center mx-1 cursor-pointer transition duration-300 ease-in-out ${
                      seat.TrangThai === "dadat"
                        ? "bg-red-500 cursor-not-allowed opacity-70" // Red for booked seats
                        : "bg-green-500 hover:bg-green-400" // Green for available seats
                    } rounded w-12 h-12`} // Square shape for seats
                    onClick={() =>
                      seat.TrangThai !== "dadat" && toggleSeatSelection(seat.id)
                    } // Only toggle if not booked
                    title={
                      seat.TrangThai === "dadat"
                        ? "Ghế đã đặt"
                        : "Nhấn để chọn ghế"
                    }
                  >
                    <span className="text-white font-semibold">
                      {seat.SoGhe}
                    </span>{" "}
                    {/* Display seat number */}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Note for seat status */}
        <div className="mt-4 text-center text-sm text-gray-600 flex pt-7">
          <p className="mr-5">
            <span className="bg-red-500 rounded-full w-4 h-4 inline-block mr-2"></span>
            Ghế đã đặt
          </p>
          <p>
            <span className="bg-green-500 rounded-full w-4 h-4 inline-block mr-2"></span>
            Ghế chưa đặt
          </p>
        </div>
      </div>

      {/* Chọn Loại Vé Section */}
      <section className="mt-10">
        <h2 className="text-[40px] font-bold mt-20 mb-5 text-center">
          CHỌN LOẠI VÉ
        </h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
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
                  <button
                    onClick={() => handleQuantityChange(ticketType.id, -1)}
                    className="text-black p-1"
                  >
                    -
                  </button>
                  <span className="text-black p-1">
                    {quantities[ticketType.id] || 1}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(ticketType.id, 1)}
                    className="text-black p-1"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div>
        {/* Combo Section */}
        <section className="mt-10">
          <h2 className="text-[40px] font-bold mt-20 mb-5 text-center">
            CHỌN COMBO
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {Combo.map((item) => (
              <div
                key={item.id}
                className="w-[350px] p-4 flex items-center gap-4"
              >
                {/* Left: Combo Image */}
                <div className="flex-shrink-0">
                  <img
                    src={`${item.Anh}`} // Ensure this path is correct
                    alt={item.TenCombo}
                    className="h-[130px] w-[130px] object-cover rounded"
                  />
                </div>

                {/* Right: Combo Info */}
                <div>
                  <h3 className="mb-2 text-[16px] font-bold">
                    {item.TenCombo}
                  </h3>
                  <p className="mb-2 text-[14px] font-bold">{item.NoiDung}</p>
                  <p className="mb-2 text-[14px] font-bold">
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
      </div>

      {/* Tổng tiền */}
      <section className="mt-10">
      <div className="flex justify-between items-center">
        <div className="flex-grow"></div>
        <h2 className="text-center text-[20px] font-bold flex-grow">
          Tổng tiền: <span className="font-light">0 VND</span>
        </h2>
        <button
          onClick={handleContinue}
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
