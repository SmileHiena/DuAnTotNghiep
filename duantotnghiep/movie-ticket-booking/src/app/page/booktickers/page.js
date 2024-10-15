const BookTicker = () => {
  const HoaDon = [
    {
      id: "123456789",
      NgayMua: "01/01/2024",
      Rap: "Ticker Man",
      Pttt: "Momo",
      TenPhim: "Làm giàu với ma",
      ThoiGian: "18h:30",
      NgayChieu: "02/01/2024",
      SoGhe: "A3",
      PhongChieu: "Phòng 1",
    },
  ];

  return (
    <div className="max-w-full mx-auto p-4 sm:p-8 bg-[rgba(0,0,0,0.6)]" style={{ maxWidth: '1410px' }}>
      <h2 className="text-xl sm:text-2xl font-semibold text-white">CHI TIẾT HÓA ĐƠN</h2>
      <hr className="border-white" />
      <div className="mx-auto p-4 sm:p-6 bg-black shadow-lg rounded-lg border-2 border-customBorder w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[854px] h-auto my-12">
        {HoaDon.map((hoaDon) => (
          <div key={hoaDon.id} className="space-y-4 text-white">
            <h2 className=" text-center text-xl sm:text-2xl font-semibold">CHI TIẾT HÓA ĐƠN</h2>

            <div className="ml-2 sm:ml-4">
              <div>
                <span className="font-medium">Mã hóa đơn: </span>{hoaDon.id}
              </div>

              <div>
                <span className="font-medium">Ngày mua: </span>{hoaDon.NgayMua}
              </div>

              <div>
                <span className="font-medium">Rạp: </span>{hoaDon.Rap}
              </div>

              <div>
                <span className="font-medium">Phương thức thanh toán: </span>{hoaDon.Pttt}
              </div>

              <br />

              <div>
                <span className="font-medium">Tên phim: </span>{hoaDon.TenPhim}
              </div>

              <div>
                <span className="font-medium">Thời gian chiếu: </span>{hoaDon.ThoiGian}, {hoaDon.NgayChieu}
              </div>

              <div>
                <span className="font-medium">Số ghế: </span>{hoaDon.SoGhe}
              </div>

              <div>
                <span className="font-medium">Phòng chiếu: </span>{hoaDon.PhongChieu}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
              <button 
                style={{ backgroundColor: '#F5CF49' }} 
                className="hover:bg-yellow-600 text-black py-2 px-4 rounded"
              >
                Tải Xuống
              </button>
              <button 
                style={{ backgroundColor: '#F5CF49' }} 
                className="hover:bg-yellow-600 text-black py-2 px-4 rounded"
              >
                Chia Sẻ
              </button>
              <button 
                style={{ backgroundColor: '#F5CF49' }} 
                className="hover:bg-yellow-600 text-black py-2 px-4 rounded"
              >
                Hủy Đơn
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookTicker;