'use client';
import React, { useState } from 'react';

const CheckoutPage = () => {
  const [buttonColor1, setButtonColor1] = useState('#F5CF49');
  const [buttonColor2, setButtonColor2] = useState('#F5CF49');

  return (
    <section className="text-white bg-[rgba(0,0,0,0.3)]">
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold">
          TRANG THANH TOÁN
        </h1>
        <hr className="border-gray-600 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1410px] mx-auto">
          <div>
            <div className="mb-4">
              <div className="flex justify-between p-4 bg-[rgba(0,0,0,0.7)]">
                <div>
                  <p className="font-bold">Tên khách hàng</p>
                  <p>Nguyễn Văn A</p>
                </div>
                <div>
                  <p className="font-bold">Số điện thoại</p>
                  <p>0123456789</p>
                </div>
                <div>
                  <p className="font-bold">Email</p>
                  <p>A123@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <label className="w-full flex items-center p-3 border border-gray-600 rounded-lg cursor-pointer">
                <input className="mr-2" name="payment" type="radio" />
                <img
                  alt="Momo logo"
                  className="mr-2"
                  height="24"
                  src="https://storage.googleapis.com/a1aa/image/9wrjggel7jXQcCNtBhX99ZH3wSe0ZP3MLp2PuOTVD3jqJCnTA.jpg"
                  width="24"
                />
                <span>Thanh toán qua Momo</span>
              </label>
              <label className="w-full flex items-center p-3 border border-gray-600 rounded-lg cursor-pointer">
                <input className="mr-2" name="payment" type="radio" />
                <img
                  alt="Nội địa logo"
                  className="mr-2"
                  height="24"
                  src="https://storage.googleapis.com/a1aa/image/BMhFtv7NofUuDyLI2zUYcccGbHCsByXh6jcSNVwWljV0EhzJA.jpg"
                  width="24"
                />
                <span>Thanh toán qua Thẻ nội địa</span>
              </label>
              <label className="w-full flex items-center p-3 border border-gray-600 rounded-lg cursor-pointer">
                <input className="mr-2" name="payment" type="radio" />
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
                className=" py-2 font-semibold rounded w-[150px]" // Sử dụng lớp Tailwind để đặt chiều dài
                style={{ backgroundColor: buttonColor1, color: 'black' }}
                onMouseOver={() => setButtonColor1('#FFD700')}
                onMouseOut={() => setButtonColor1('#F5CF49')}
              >
                QUAY LẠI
              </button>
              <button
                className=" py-2 font-semibold rounded w-[150px]" // Sử dụng lớp Tailwind để đặt chiều dài
                style={{ backgroundColor: buttonColor2, color: 'black' }}
                onMouseOver={() => setButtonColor2('#FFD700')}
                onMouseOut={() => setButtonColor2('#F5CF49')}
              >
                THANH TOÁN
              </button>
            </div>

          </div>
          <div>
            <div className="bg-[rgba(0,0,0,0.7)] p-4 rounded-lg">
              <h2 className="font-bold text-lg">LÀM GIÀU VỚI MA (T16)</h2>
              <div className="flex justify-between items-center">
                <span className="text-[#F5CF49]">
                  Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)
                </span>
                <span className="bg-[#F5CF49] text-[14px] text-black px-2 py-1 rounded">
                  THỜI GIAN GIỮ VÉ: 04:00
                </span>
              </div>
              <p className="mt-2">Ticker Quận 12</p>
              <p className="text-gray-400">
                271 Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, Thành Phố Hồ Chí Minh
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-bold">THỜI GIAN</p>
                  <p>16:25 Thứ Bảy 21/09/2024</p>
                </div>
                <div>
                  <p className="font-bold">PHÒNG</p>
                  <p>06</p>
                </div>
                <div>
                  <p className="font-bold">SỐ VÉ</p>
                  <p>1</p>
                </div>
                <div>
                  <p className="font-bold">LOẠI VÉ</p>
                  <p>Người Lớn</p>
                </div>
                <div>
                  <p className="font-bold">LOẠI VÉ</p>
                  <p>Ghế Thường</p>
                </div>
                <div>
                  <p className="font-bold">SỐ GHẾ</p>
                  <p>E01</p>
                </div>
                <div>
                  <p className="font-bold">Bắp nước</p>
                </div>
              </div>
              <hr className="border-gray-600 my-4" />
              <div className="flex justify-between items-center">
                <span className="font-bold">SỐ TIỀN CẦN THANH TOÁN</span>
                <span className="text-2xl font-bold">70,000VND</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
