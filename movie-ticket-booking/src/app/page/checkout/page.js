'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

const CheckoutPage = () => {
  const router = useRouter();
  const [buttonColor1, setButtonColor1] = useState('#F5CF49');
  const [buttonColor2, setButtonColor2] = useState('#F5CF49');
  const [bookingInfo, setBookingInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [remainingTime, setRemainingTime] = useState(300); // 5 minutes
  const [paymentMethod, setPaymentMethod] = useState(null); // State for payment method selection
  const [error, setError] = useState(''); // State for error message

  useEffect(() => {
    const data = Cookies.get("bookingInfo");
    if (data) {
      const info = JSON.parse(data);
      setBookingInfo(info);

      const tokenValue = Cookies.get("token");
      if (tokenValue) {
        fetchUserDetails(tokenValue);
      } else {
        alert("Vui lòng đăng nhập lại.");
      }
    }
  }, []);
  const tokenValue = Cookies.get("token"); // Ensure this cookie is set correctly

  const fetchUserDetails = async (tokenValue) => {
    try {
      const response = await fetch("http://localhost:3000/users/detailuser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenValue}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data1 = await response.json();
        setUserInfo(data1);
      } else {
        console.error("Failed to fetch user data", response.status, response.statusText);
        alert("Vui lòng đăng nhập lại.");
      }
    } catch (error) {
      console.error("An error occurred while fetching user data:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  // fetchUserDetails();


  const handlePayment = async () => {
    // Check if a payment method has been selected
    const tokenValue = Cookies.get("token");
    if (!paymentMethod) {
      setError('Bạn phải chọn phương thức thanh toán.'); // Set error message if not selected
      return;
    }
    setError(''); // Clear error message if a payment method is selected

    const paymentData = {
      NgayMua: new Date().toISOString(), // Replace with actual purchase date if needed
      Rap: "Ticket Quận 12",
      userId: userInfo ? userInfo.userId : 'Chưa có  thông tin',
      PhuongThucThanhToan: paymentMethod, // Save selected payment method
      TenPhim: bookingInfo ? bookingInfo.movieName : "Chưa có thông tin",
      ThoiGian: bookingInfo ? bookingInfo.showtimeTime : "Chưa có thông tin",
      NgayChieu: bookingInfo ? bookingInfo.showtimeDate : "Chưa có thông tin", // Ensure this field exists in bookingInfo
      SoGhe: bookingInfo ? bookingInfo.selectedSeats.join(", ") : "chưa có thống tin", // Count of selected seats
      PhongChieu: bookingInfo ? bookingInfo.room : "Chưa có thông tin",
      GiaVe: bookingInfo ? bookingInfo.ticketTypes.map(ticket => ticket.price).reduce((a, b) => a + b, 0) : 0, // Sum of ticket prices
      TongTien: bookingInfo ? bookingInfo.totalAmount : 0, // Total amount from bookingInfo
      TenKhachHang: userInfo ? userInfo.Ten : "Chưa có thông tin", // Replace with actual customer name if needed
      Email: userInfo ? userInfo.Email : "Chưa có thông tin", // Replace with actual customer email if needed
      Combo: bookingInfo ? bookingInfo.combos.map(combo => combo.name).join(", ") : "null", // Join combo names with commas
    };

    try {
      const response = await fetch('http://localhost:3000/checkout/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokenValue}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error('Failed to create invoice');
      }

      const result = await response.json();
      console.log('Invoice created:', result);

      // Redirect to invoice details page using the id
      if (result.id) { // Ensure that result.id exists
        router.push(`/page/chitiethoadon/${result.id}`); // Redirect to the details page with the invoice ID
      } else {
        setError('Không có ID hóa đơn để chuyển hướng.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError('Đã xảy ra lỗi khi thanh toán.');
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <section className="text-white bg-[rgba(0,0,0,0.3)]">
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold">TRANG THANH TOÁN</h1>
        <hr className="border-gray-600 mb-4" />
        {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message if exists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1410px] mx-auto">
          <div>
            <div className="mb-4">
              <div className="flex justify-between p-4 bg-[rgba(0,0,0,0.7)]">
                <div>
                  <p className="font-bold">Tên khách hàng</p>
                  <p>{userInfo ? userInfo.Ten : "Tạm chưa có thông tin"}</p> {/* Display user name */}
                </div>
                <div>
                  <p className="font-bold">Số điện thoại</p>
                  <p>{userInfo ? userInfo.SDT : "Tạm chưa có thông tin"}</p> {/* Display user phone */}
                </div>
                <div>
                  <p className="font-bold">Email</p>
                  <p>{userInfo ? userInfo.Email : "Tạm chưa có thông tin"}</p> {/* Display user email */}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {/* Payment Method Selection */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold">Chọn phương thức thanh toán</span>
                  {error && <span className="text-red-500 text-sm">{error}</span>} {/* Display error message if exists */}
                </div>
                <label className="w-full flex items-center p-3 border border-gray-600 rounded-lg cursor-pointer mb-2">
                  <input className="mr-2" name="payment" type="radio" onChange={() => setPaymentMethod('momo')} />
                  <img alt="Momo logo" className="mr-2" height="24" src="https://storage.googleapis.com/a1aa/image/9wrjggel7jXQcCNtBhX99ZH3wSe0ZP3MLp2PuOTVD3jqJCnTA.jpg" width="24" />
                  <span>Thanh toán qua Momo</span>
                </label>
                <label className="w-full flex items-center p-3 border border-gray-600 rounded-lg cursor-pointer mb-2">
                  <input className="mr-2" name="payment" type="radio" onChange={() => setPaymentMethod('localCard')} />
                  <img
                    alt="Nội địa logo"
                    className="mr-2"
                    height="24"
                    src="https://storage.googleapis.com/a1aa/image/BMhFtv7NofUuDyLI2zUYcccGbHCsByXh6jcSNVwWljV0EhzJA.jpg"
                    width="24"
                  />
                  <span>Thanh toán qua Thẻ nội địa</span>
                </label>
                <label className="w-full flex items-center p-3 border border-gray-600 rounded-lg cursor-pointer mb-2">
                  <input className="mr-2" name="payment" type="radio" onChange={() => setPaymentMethod('internationalCard')} />
                  <img
                    alt="Quốc tế logo"
                    className="mr-2"
                    height="24"
                    src="https://storage.googleapis.com/a1aa/image/eSRLxk1FwCQlGS1yllkaauZIYG6KHdVRgAowAyn6rtn1EhzJA.jpg"
                    width="24"
                  />
                  <span>Thanh toán qua thẻ quốc tế</span>
                </label>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <i className="fas fa-tag text-[#F5CF49] mr-2"></i>
                <span className="font-bold">Chọn hoặc nhập mã giảm giá</span>
              </div>
              <input
                className="w-full mt-2 p-2 border border-gray-600 rounded bg-black text-white"
                placeholder="Nhập mã giảm giá"
                type="text"
              />
            </div>
            <div className="flex justify-start mt-4 space-x-4">
              <button
                className="py-2 font-semibold rounded w-[150px]"
                style={{ backgroundColor: buttonColor1, color: 'black' }}
                onMouseOver={() => setButtonColor1('#FFD700')}
                onMouseOut={() => setButtonColor1('#F5CF49')}
                onClick={() => window.history.back()}
              >
                QUAY LẠI
              </button>
              <button
                className="py-2 font-semibold rounded w-[150px]"
                style={{ backgroundColor: buttonColor2, color: 'black' }}
                onMouseOver={() => setButtonColor2('#FFD700')}
                onMouseOut={() => setButtonColor2('#F5CF49')}
                onClick={handlePayment}
              >
                THANH TOÁN
              </button>
            </div>
          </div>
          <div>
            <div className="bg-[rgba(0,0,0,0.7)] p-4 rounded-lg">
              <h2 className="font-bold text-lg">{bookingInfo ? bookingInfo.movieName : "Không có tên phim"}</h2>
              <div className="flex justify-between items-center">
                <span className="text-[#F5CF49]">Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)</span>
                <span className="bg-[#F5CF49] text-[14px] text-black px-2 py-1 rounded">THỜI GIAN GIỮ VÉ: {formatTime(remainingTime)}</span>
              </div>
              <p className="mt-2">Ticket Quận 12</p>
              <p className="text-gray-400">271 Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, Thành Phố Hồ Chí Minh</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-bold">THỜI GIAN</p>
                  <p>{bookingInfo ? bookingInfo.showtimeTime : "Tạm chưa có thống tin"}</p>
                </div>
                <div>
                  <p className="font-bold">NGÀY CHIẾU</p>
                  <p>{bookingInfo ? bookingInfo.showtimeDate : "Tạm chưa có thống tin"}</p>
                </div>
                <div>
                  <p className="font-bold">PHÒNG</p>
                  <p>{bookingInfo ? bookingInfo.room : "Tạm chưa có thống tin"}</p>
                </div>
                <div>
                  <p className="font-bold">SỐ VÉ</p>
                  <p>{bookingInfo ? bookingInfo.selectedSeats.length : "Tạm chưa có thống tin"}</p>
                </div>
                <div>
                  <p className="font-bold">LOẠI VÉ</p>
                  <p>{bookingInfo ? bookingInfo.ticketTypes.map(ticket => `${ticket.name}`).join(", ") : "Tạm chưa có thống tin"}</p>
                </div>
                <div>
                  <p className="font-bold">SỐ GHẾ</p>
                  <p>{bookingInfo ? bookingInfo.selectedSeats.join(", ") : "Tạm chưa có thống tin"}</p>
                </div>
                <div>
                  <p className='font-bold'>Combo</p>
                  <p>
                    {bookingInfo && bookingInfo.combos && bookingInfo.combos.length > 0
                      ? bookingInfo.combos.map(ticket => ticket.name).join(", ")
                      : "Tạm chưa có thông tin"}
                  </p>
                </div>
              </div>
              <hr className="border-gray-600 my-4" />
              <div className="flex justify-between items-center">
                <span className="font-bold">SỐ TIỀN CẦN THANH TOÁN</span>
                <span className="text-2xl font-bold">{bookingInfo ? bookingInfo.totalAmount.toLocaleString() : "Tạm chưa có thống tin"} VND</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;