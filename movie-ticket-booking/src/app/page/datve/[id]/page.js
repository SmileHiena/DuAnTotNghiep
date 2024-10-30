"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const DatVe = () => {
  const { id } = useParams();

  const [showtimes, setShowtimes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCinema, setShowCinema] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null); // Lưu ID phòng đã chọn
  const [selectedDate, setSelectedDate] = useState(null); // Lưu Ngày đã chọn

  useEffect(() => {
    const fetchData = async () => {
      try {
        const showtimeResponse = await fetch(
          `http://localhost:3000/suatchieu/phim/${id}`
        );
        const showtimesData = await showtimeResponse.json();
        setShowtimes(showtimesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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

  const handleGioChieuClick = (showtime) => {
    setSelectedRoomId(showtime.IdPhong); // Lưu ID phòng khi nhấp vào giờ chiếu
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Lọc và nhóm giờ chiếu theo phòng chiếu cho ngày đã chọn
  const groupedRooms = rooms.reduce((acc, room) => {
    const showtimesForRoom = showtimes.filter(
      (showtime) =>
        showtime.IdPhong === room.IdPhong &&
        showtime.NgayChieu === selectedDate
    );

    if (showtimesForRoom.length > 0) {
      // Kiểm tra nếu phòng chưa tồn tại trong acc
      const existingRoom = acc.find(
        (r) => r.IdPhong === room.IdPhong
      );

      if (!existingRoom) {
        acc.push({
          ...room,
          showtimes: showtimesForRoom,
        });
      }
    }

    return acc;
  }, []).sort((a, b) => a.TenPhongChieu.localeCompare(b.TenPhongChieu)); // Sắp xếp theo tên phòng chiếu

  const getDayOfWeek = (dateString) => {
    const [day, month, year] = dateString.split("/").map(Number);
    const date = new Date(year, month - 1, day); // Tạo đối tượng Date
    const days = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
    return days[date.getDay()]; // Lấy tên ngày từ mảng
  };

  return (
    <div className="justify-center mx-auto text-white bg-[rgba(0,0,0,0.6)] shadow-lg w-full max-w-[1410px] mx-auto">
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
          ).map(([_, showtime], index) => (
            <div
              key={index} // Tạo key duy nhất từ IdPhong và NgayChieu
              onClick={() => {
                handleSuatChieuClick(showtime);
                handleGioChieuClick(showtime);
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
    </div>
  );
};

export default DatVe;
