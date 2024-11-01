"use client";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import QRCodeGenerator from '../../component/QRCodeGenerator'; // Đảm bảo bạn đã nhập đúng đường dẫn

const PaymentPage = () => {
  const [bookingInfo, setBookingInfo] = useState(null);

  useEffect(() => {
    // Retrieve booking information from cookies
    const bookingData = Cookies.get('bookingInfo');
    const info = bookingData ? JSON.parse(bookingData) : null;
    setBookingInfo(info);
  }, []);

  // Generate custom link if needed
  const customLink = bookingInfo ? `https://me.momo.vn/screentime/9wdLZD2KEwpwajP?amount=${bookingInfo.totalAmount}` : null;

  return (
    <section className="text-white bg-[rgba(0,0,0,0.3)]">
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold">TRANG THANH TOÁN</h1>
        <hr className="border-gray-600 mb-4" />
        
        <p>Xin cảm ơn bạn đã chọn dịch vụ của chúng tôi!</p>
        <p>Vui lòng nhấn vào mã QR hoặc nút bên dưới để thanh toán qua MoMo.</p>

        {/* Display QR code generator with amount */}
        {bookingInfo && (
          <QRCodeGenerator amount={bookingInfo.totalAmount} customValue={customLink} />
        )}

        <div className="text-center">
          <p className="font-bold">Tổng tiền cần thanh toán:</p>
          <p className="text-2xl font-bold">
            {bookingInfo ? bookingInfo.totalAmount.toLocaleString() : "00"} VND
          </p>
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;
