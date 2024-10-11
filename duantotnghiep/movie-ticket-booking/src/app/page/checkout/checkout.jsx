import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

const CheckoutPage = () => {
  return (
    <div className="flex justify-center items-center  text-white pt-3 mb-4 ">
      <div className="max-w-[73vw]">
        <h3 className="text-xl mb-4">Trang thanh toán</h3>
        <hr className="mb-4" />
        <div className="">
        <div className="mb-5 mx-[60px] bg-black flex justify-between px-5 border  rounded-md">
            <div>
              <p className="text-gray-300">Tên khách hàng</p>
              <h5>Nguyễn Văn A</h5>
            </div>
            <div>
              <p className="text-gray-300">Số điện thoại</p>
              <h5>0123456789</h5>
            </div>
            <div>
              <p className="text-gray-300">Email</p>
              <h5>A123@gmail.com</h5>
            </div>
          </div>
        </div>
        <div className="flex my- mx-[60px]">
          <div className="w-1/2">
            <div className="mb-4">
              <div className="flex items-center bg-gray-800 p-3 rounded-lg border border-white mb-3">
                <input type="radio" id="momo" name="payment" className="hidden" />
                <label htmlFor="momo" className="flex items-center space-x-2 cursor-pointer">
                  <img src="/images/images.png" alt="Thẻ nội địa" className="w-8 h-8" />
                  <p>Thanh toán qua momo</p>
                </label>
              </div>
              <div className="flex items-center bg-gray-800 p-3 rounded-lg border border-white mb-3">
                <input type="radio" id="domestic" name="payment" className="hidden" />
                <label htmlFor="domestic" className="flex items-center space-x-2 cursor-pointer">
                  <img src="/images/napas.png" alt="Thẻ nội địa" className="w-8 h-8" />
                  <p>Thanh toán qua Thẻ nội địa</p>
                </label>
              </div>
              <div className="flex items-center bg-gray-800 p-3 rounded-lg border border-white mb-3">
                <input type="radio" id="international" name="payment" className="hidden" />
                <label htmlFor="international" className="flex items-center space-x-2 cursor-pointer">
                  <img src="/images/visalogo.jpg" alt="Thẻ nội địa" className="w-8 h-8" />
                  <p>Thanh toán qua Thẻ quốc tế</p>
                </label>
              </div>
              <div className="flex items-center bg-gray-800 p-3 rounded-lg border border-white">
                <input type="radio" id="payrap" name="payment" className="hidden" />
                <label htmlFor="payrap" className="flex items-center space-x-2 cursor-pointer">
                  <img src="/images/phim/cam.jpg" alt="Thẻ nội địa" className="w-8 h-8" />
                  <p>Thanh toán tại rạp</p>
                </label>
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="discount" className="block mb-2 text-gray-300">Chọn hoặc nhập mã giảm giá</label>
              <div className="flex">
                <input
                  type="text"
                  id="discount"
                  placeholder="Bạn đang có mã giảm giá"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-yellow-400"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button className="px-4 py-2 bg-yellow-400 text-black font-bold rounded-lg">Quay Lại</button>
              <button className="px-4 py-2 bg-yellow-400 text-black font-bold rounded-lg">Thanh Toán</button>
            </div>
          </div>
          <div className="w-1/2 ml-5 bg-black p-4 rounded-lg border border-gray-700">
            <div className="flex justify-between mb-3">
              <h5>Làm Giàu Với Ma (T16)</h5>
              <p className="bg-yellow-400 text-gray-900  rounded">04:00</p>
            </div>
            <p className="text-yellow-400">Phim dành cho khán giả từ 16 tuổi trở lên (16+)</p>
            <p>Rạp: Ticket Quận 12, 271 Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, TP Hồ Chí Minh</p>
            <p className="text-yellow-400">Thời gian:</p> <samp>16:25 Thứ Bảy 21/09/2024</samp>
            <p>Phòng: 06 | Loại vé: Ghế Thường | Ghế: E01</p>
            <p>Số lượng vé: 1 Người Lớn</p>
            <p>Combo: Bắp nước *1</p>
            <hr className="border-gray-700 my-3" />
            <div className="flex justify-between">
              <p className="text-yellow-400 font-bold">SỐ TIỀN CẦN THANH TOÁN:</p>
              <h6 className="text-base: 1rem">70,000 VND</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;