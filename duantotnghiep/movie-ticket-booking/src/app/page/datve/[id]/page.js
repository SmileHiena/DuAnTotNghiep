  "use client";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faPlay } from "@fortawesome/free-solid-svg-icons";
  import React, { useEffect, useState } from "react";
  import { usePathname } from "next/navigation";

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
    const [Loaive, setLoaive] = useState([]);
    const [quantity, setQuantity] = useState({});
    const [quantities] = useState({});
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [Combo, setCombo] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
      const fetchPhimId = async () => {
        if (!movie || !movie.id) return;
        try {
          const responseDetail = await fetch(
            `http://localhost:3000/sanpham/${movie.id}/phim`
          );
          if (!responseDetail.ok) {
            throw new Error("Không thể lấy chi tiết lịch chiếu");
          }
          const dataDetail = await responseDetail.json();
          setPhim(
            dataDetail.filter((phim) => phim.idPhim === parseInt(movie.id, 10))
          );
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
          const responseDetail = await fetch(
            `http://localhost:3000/phong/${selectedPhongId}/xuatchieu`
          );
          if (!responseDetail.ok) {
            throw new Error("Không thể lấy chi tiết phòng chiếu");
          }
          const dataDetail = await responseDetail.json();
          setPhong(dataDetail);
          console.log("987");
        } catch (error) {
          console.error("Lỗi khi lấy chi tiết phòng chiếu:", error);
        }
      };

      fetchPhongId();
    }, [selectedPhongId]);

    // ----- Loại vé -----
    useEffect(() => {
      const fetchLoaiveData = async () => {
        try {
          const response = await fetch("http://localhost:3000/loaive/");
          if (!response.ok) throw new Error("Không thể lấy chi tiết loại vé");

          const data = await response.json();
          setLoaive(data);

          // Initialize quantity for each ticket type with 0
          const initialQuantity = data.reduce((acc, item) => {
            acc[item.id] = 0;
            return acc;
          }, {});
          setQuantity(initialQuantity);
        } catch (error) {
          console.error("Lỗi khi lấy chi tiết loại vé:", error);
        }
      };

      if (showTicketSelection) {
        fetchLoaiveData();
      }
    }, [showTicketSelection]);

    // Handle quantity changes
    const handleQuantityChange = (id, operation) => {
      setQuantity((prev) => ({
        ...prev,
        [id]: Math.max(0, prev[id] + (operation === "increase" ? 1 : -1)),
      }));
    };

    const handleSeatSelect = (selectedSeat) => {
      const selectedSeatsCount = selectedSeats.length; // Count of currently selected seats
      const ticketQuantity = Object.values(quantity).reduce(
        (sum, qty) => sum + (qty || 0),
        0
      ); // Total ticket quantity

      // Determine if the seat is already booked or not
      const isAlreadyBooked = selectedSeat.trangThai === "Ghế Bạn Đã Đặt";

      // If selecting a new seat and at limit, show alert
      if (!isAlreadyBooked && selectedSeatsCount >= ticketQuantity) {
        alert("Bạn đã đặt quá giới hạn số vé cho phép.");
        return; // Exit without further processing
      }

      // Update seat status
      setghe((prevGhes) =>
        prevGhes.map(
          (ghe) =>
            ghe.tenGhe === selectedSeat.tenGhe
              ? {
                  ...ghe,
                  trangThai:
                    ghe.trangThai === "Trống"
                      ? "Ghế Bạn Đã Đặt" // Seat selected
                      : ghe.trangThai === "Ghế Bạn Đã Đặt"
                      ? "Trống" // Seat deselected
                      : ghe.trangThai, // Keep "Đã đặt" seats unchanged
                }
              : ghe // Keep all other seats unchanged
        )
      );

      // Update the selected seats array
      setSelectedSeats((prev) => {
        if (isAlreadyBooked) {
          // If already selected, deselect it
          return prev.filter((seat) => seat.tenGhe !== selectedSeat.tenGhe);
        } else {
          // If not selected, select it
          return [...prev, selectedSeat];
        }
      });
    };

    useEffect(() => {
      const fetchLichId = async () => {
        if (!selectedLichChieuId) return;

        try {
          const responseDetail = await fetch(
            `http://localhost:3000/lichchieu/${selectedLichChieuId}/phong`
          );
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
          const responseDetail = await fetch(
            `http://localhost:3000/ghe/${selectedGheId}/xuatchieu`
          );
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

    // ----- Combo -----
    useEffect(() => {
      const fetchCombo = async () => {
        setLoading(true); // Set loading to true before fetching
        try {
          const response = await fetch("http://localhost:3000/combo");
          if (!response.ok) throw new Error("Failed to fetch Combo");
          const data = await response.json();
          setCombo(data);
        } catch (error) {
          console.error("Error fetching Combo:", error);
          setError("Error fetching combo items. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      fetchCombo();
    }, []);

    const calculateTotal = async () => {
      try {
        const response = await fetch("http://localhost:3000/total", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comboQuantities: quantity, // Assuming `quantity` holds the selected ticket quantities
            ticketQuantities: selectedSeats.reduce((acc, seat) => {
              // Assuming each selected seat is linked to a ticket type
              const ticketId = seat.idkc; // Adjust this line based on how you link seats to ticket types
              acc[ticketId] = (acc[ticketId] || 0) + 1;
              return acc;
            }, {}),
          }),
        });
    
        if (!response.ok) {
          throw new Error("Failed to calculate total");
        }
    
        const data = await response.json();
        alert(`Tổng tiền: ${data.total} VND`); // Display the total amount
      } catch (error) {
        console.error("Error calculating total:", error);
      }
    };

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-[rgba(0,0,0,0.3)] container mx-auto max-w-[1410px] flex flex-col gap-6 text-white min-h-screen p-6">
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

          {/* Phim */}
          <div className="md:w-[65%] flex flex-col">
            <h1 className="text-[30px] font-semibold mt-4 mb-4">{movie.Ten}</h1>
            <p className="text-[18px] mb-2">
              <span className="font-semibold">Đạo diễn:</span>{" "}
              {movie.MoTa?.DaoDien}
            </p>
            <p className="text-[18px] mb-2">
              <span className="font-semibold">Diễn viên:</span>{" "}
              {movie.MoTa?.DienVien}
            </p>
            <p className="text-[18px] mb-2">
              <span className="font-semibold">Ngày khởi chiếu:</span>{" "}
              {movie.MoTa?.NgayKhoiChieu}
            </p>
            <p className="text-[18px]">
              <span className="font-semibold">Thể loại:</span>{" "}
              {movie.TheLoai?.KieuPhim}
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
                  {isVisible ? "Ẩn Trailer" : "Xem Trailer"}
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
            allowFullScreen
          ></iframe>
        )}

        {/* Lịch chiếu */}
        <div className="my-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Lịch Chiếu</h2>
          {phims.map((phim) => (
            <button
              key={phim.idPhim}
              className={`border-2 border-yellow-500 text-[#ffffff] font-semibold m-3 py-4 px-4 rounded transition duration-300 ease-in-out transform  hover:-translate-y-1 hover:scale-105 ${
                selectedLichChieuId === phim.id
                  ? "bg-yellow-500"
                  : "bg-transparent"
              }`}
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

        {/* Phòng chiếu */}
        {showShowtimes && lichchieu.length > 0 && (
          <div className="my-8">
            <h2 className="text-3xl font-bold mb-4">Phòng Chiếu</h2>
            <div className="bg-gray-800 p-4 rounded-lg text-white">
              {lichchieu.map((lich) => (
                <button
                  key={lich.idLichChieu}
                  className={`font-semibold py-2 px-4 rounded m-2 transition duration-300 ease-in-out transform 
            ${
              selectedPhongId === lich.idLichChieu
                ? "bg-blue-500 text-white"
                : "bg-yellow-500 text-black hover:bg-yellow-600"
            }`}
                  onClick={() => {
                    setSelectedPhongId(lich.idLichChieu);
                    setShowTheaterList(true);
                    setShowTicketSelection(false);
                  }}
                >
                  {lich.tenPhong}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Suất chiếu */}
        {showTheaterList && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Danh sách suất chiếu </h2>
            <div className="bg-purple-700 p-4 rounded-lg">
              <h3 className="font-bold text-xl mb-2">
                {" "}
                Rạp StichMan phường 12 Thành phố Hồ Chí Minh
              </h3>
              <p>xuất chiếu</p>
              {phongs.map((phong) => (
                <button
                  key={phong.id}
                  className="bg-gray-800 py-1 px-3 m-3 rounded text-yellow-500 mt-2"
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

        {/* Loại vé */}
        {showTicketSelection && (
          <>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Chọn Loại Vé</h2>
              <div className="flex items-center justify-center gap-4">
                {Loaive.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="bg-gray-800 p-4 rounded-lg text-center"
                  >
                    <h3 className="text-white">{ticket.TenVe}</h3>
                    <p className="text-white">
                      {ticket.GiaVe.toLocaleString()} VND
                    </p>
                    <div className="flex justify-center gap-2 mt-2">
                      <button
                        className="bg-gray-700 px-4 py-2 rounded text-white"
                        onClick={() =>
                          handleQuantityChange(ticket.id, "decrease")
                        }
                      >
                        -
                      </button>
                      <span className="px-4 text-white">
                        {quantity[ticket.id] || 0}
                      </span>
                      <button
                        className="bg-gray-700 px-4 py-2 rounded text-white"
                        onClick={() =>
                          handleQuantityChange(ticket.id, "increase")
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ghế */}
            <div className="my-8 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Chọn Ghế - Rạp StickMan
              </h2>
              {/* Show Room and Time Information */}
              <div className="mb-4 text-lg text-white flex justify-center">
                <p>
                  Lịch chiếu:{" "}
                  {phims.find((phim) => phim.idPhim === selectedLichChieuId)
                    ?.ngay || "Chưa có lịch chiếu"}{" "}
                  {/* Display the showtime for the selected movie */} (
                  {phims.find((phim) => phim.idPhim === selectedLichChieuId)
                    ?.thu || ""}
                  ) - {/* Display the day of the week */}
                </p>
                <p>
                  Thời gian{" "}
                  {phongs.find((p) => p.id === selectedGheId)?.gioChieu}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg inline-block">
                <p>Màn hình</p>
                <img
                  src="/images/img-screen.png"
                  alt="Seating Arrangement"
                  className="mb-4 w-full justify-center max-w-[auto] rounded"
                />

                <div className="flex flex-wrap justify-center">
                  {ghes.map((ghe) => (
                    <div key={ghe.maXuatChieu} className="w-1/10 p-1">
                      <button
                        className={`flex text-white py-2 px-4 rounded ${
                          ghe.trangThai === "Đã đặt"
                            ? "bg-yellow-500 opacity-50 cursor-not-allowed" // Unclickable for initially "Đã đặt"
                            : ghe.trangThai === "Ghế Bạn Đã Đặt"
                            ? "bg-blue-500" // Blue for "Ghế Bạn Đã Đặt"
                            : "bg-yellow-500" // Default styling for "Trống"
                        }`}
                        disabled={ghe.trangThai === "Đã đặt"} // Disable button for "Đã đặt" seats
                        onClick={() => handleSeatSelect(ghe)}
                      >
                        {ghe.tenGhe}
                      </button>
                    </div>
                  ))}
                </div>
                <div />

                <div className="flex justify-center mt-6 space-x-4">
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-yellow-500 border mr-2 inline-block"></span>
                    <span className="text-gray-400">Ghế Trống</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-yellow-500 opacity-50 border mr-2 inline-block"></span>
                    <span className="text-gray-400">Ghế Đã Đặt</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-blue-500 border mr-2 inline-block"></span>
                    <span className="text-gray-400">Ghế Bạn Đã Đặt</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

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
            <button className="mt-8 bg-[#F5CF49] text-black px-4 py-2 rounded" onClick={calculateTotal}>
              Continue
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MovieBookingPage;