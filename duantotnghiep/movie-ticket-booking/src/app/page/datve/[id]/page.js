"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const DatVe = () => {
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
  const [comments, setComments] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) {
        console.error("Movie ID is missing");
        return;
      }

      // Log the ID to ensure it's being passed correctly
      console.log(`Fetching data for movie ID: ${id}`);

      try {
        // Fetch movie data
        const movieResponse = await fetch(
          `http://localhost:3000/sanpham/${id}`
        );
        if (!movieResponse.ok) {
          throw new Error(
            `Failed to fetch movie data: ${movieResponse.statusText} (Status Code: ${movieResponse.status})`
          );
        }
        const movieData = await movieResponse.json();
        setMovie(movieData);

        // Fetch comments
        const commentsResponse = await fetch(`/api/comments?movieId=${id}`);
        if (!commentsResponse.ok) {
          throw new Error(
            `Failed to fetch comments: ${commentsResponse.statusText} (Status Code: ${commentsResponse.status})`
          );
        }
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching movie data or comments:", error);
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
        const response = await fetch(`http://localhost:3000/rap`); // Địa chỉ API
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

    fetchLoaive(); // Call fetchLoaive on component mount
  }, []);
  const handleQuantityChange = (id, change) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) + change, 1), // Ensure quantity is at least 1
    }));
  };

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

const toggleSeatSelection = (row, number) => {
  const seatId = `${row}-${number}`;
  setSelectedSeats((prev) =>
    prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
  );
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
              className="h-[150px] w-[150px] border-4 border-[#F5CF49] text-center flex flex-col justify-center items-center rounded-lg transition duration-300 group hover:bg-[#F5CF49] shadow-lg"
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
                      className="bg-[#F5CF49] items-center text-center flex flex-col justify-center items-center rounded p-2 mb-2 mx-2 cursor-pointer w-[200px]"
                      onClick={() => setSelectedRoom(room)}
                    >
                      <p className="text-[16px]">{room.TenPhongChieu}</p>
                    </div>
                  ))}
                </div>
                {/* Long box for showtimes */}
                <div className="mt-4 w-full bg-[rgba(0,0,0,0.5)] p-4 rounded">
                  {selectedRoom && (
                    <>
                      <h4 className="text-[18px] font-semibold">Lịch Chiếu:</h4>
                      {selectedRoom.LichChieu.map((schedule) => (
                        <div key={schedule.IdSuatChieu} className="mt-2">
                          {schedule.GioChieu.map((showtime) => (
                            <div
                              key={showtime.id}
                              className={`flex justify-between items-center bg-[rgba(255, 255, 255, 0.2)] p-2 rounded mb-2 cursor-pointer`}
                              onClick={() => handleShowtimeClick(showtime)} // Add your click handler here
                            >
                              <p
                                className={`text-[16px] ${
                                  showtime.TrangThai === "dadat"
                                    ? "text-red-500"
                                    : "text-green-500"
                                }`}
                              >
                                {showtime.Gio} -{" "}
                                {showtime.TrangThai === "dadat"
                                  ? "Đã Đặt"
                                  : "Chưa Đặt"}
                              </p>
                            </div>
                          ))}
                        </div>
                      ))}
                    </>
                  )}
                  {!selectedRoom && (
                    <p className="text-gray-500">
                      Vui lòng chọn phòng để xem lịch chiếu.
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div>No theaters available.</div> // Handling no theaters
          )}
        </div>
      </section>

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
            {console.log("Loaive data:", Loaive)} {/* Log the Loaive data */}
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
                          ? "bg-gray-300 cursor-not-allowed" // Ghế đã đặt
                          : "bg-gray-800 text-white hover:bg-[#F5CF49] hover:text-black"
                      }`}
                      onClick={() =>
                        !booked && handleSeatClick(`${row}${number}`)
                      }
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
            <div className="legend-box w-4 h-4 bg-gray-300 mr-2"></div> Ghế
            Thường
          </div>
          <div className="legend flex items-center">
            <div className="legend-box w-4 h-4 bg-yellow-300 mr-2"></div> Ghế
            Chọn
          </div>
        </div>
      </section>

      {/* Combo Section */}
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
                <h3 className="mb-2 text-[16px] font-bold">{item.TenCombo}</h3>
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