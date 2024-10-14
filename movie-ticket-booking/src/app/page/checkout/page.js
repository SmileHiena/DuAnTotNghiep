import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import styles from './../../../../public/styles/checkout.css';

import '../../../../public/styles/checkout.css';

const CheckoutPage = () => {
  return (
    <div className="checkout">
      <div className="checkout-Container">
        <h3>Trang thanh toán</h3>
        <hr />
        <div className="checkoutBox">
          <div className="customerInfo">
            <div className='name'>
              <p>Tên khách hàng</p>
              <h5 className='infor_custoumer'>Nguyễn Văn A</h5>
            </div>
            <div className='name'>
              <p>Số điện thoại</p>
              <h5 className='infor_custoumer'>0123456789</h5>
            </div>
            <div className='name'>
              <p>Email</p>
              <h5 className='infor_custoumer'>A123@gmail.com</h5>
            </div>
          </div>
        </div>
        <div className="box-pay">
          <div className="box-check">
            <div className="paymentMethods">
              <div className="paymentOption">
                <input type="radio" id="momo" name="payment" className="font-input"/>
                <label htmlFor="momo" className="paymentLabel">
                  <span className="text-forn">
                    <img src="/image/images.png" alt="Thẻ nội địa" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                    <p>Thanh toán qua momo</p>
                  </span>
                </label>
              </div>
              <div className="paymentOption">
                <input type="radio" id="domestic" name="payment" className="font-input" />
                <label htmlFor="domestic" className="customRadio">
                  <span className="text-forn">
                    <img src="/image/napas.png" alt="Thẻ nội địa" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                    <p>Thanh toán qua Thẻ nội địa</p>
                  </span>
                </label>
              </div>
              <div className="paymentOption">
                <input type="radio" id="international" name="payment" className="font-input"/>
                <label htmlFor="international" className="paymentLabel">
                  <span className="text-forn">
                    <img src="/image/visalogo.jpg" alt="Thẻ nội địa" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                    <p>Thanh toán qua Thẻ quốc tế</p>
                  </span>
                </label>
              </div>
              <div className="paymentOption">
                <input type="radio" id="payrap" name="payment" className="font-input"/>
                <label htmlFor="rap" className="paymentLabel">
                  <span className="text-forn">
                    <img src="/images/phim/cam.jpg" alt="Thẻ nội địa" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                    <p>Thanh toán tại rạp</p>
                  </span>
                </label>
              </div>
            </div>
            <div className="discountCode">
              <label htmlFor="discount" className="discountLabel">
                Chọn hoặc nhập mã giảm giá
              </label>
              <div className="discount-input-container">
                {/* <FontAwesomeIcon icon={faTag} className="discount-icon" /> */}
                <input
                  type="text"
                  id="discount"
                  placeholder="Bạn đang có mã giảm giá"
                  className="discount-input"
                />
              </div>
            </div>
            <div className="actionButtons">
              <button className="backButton">Quay Lại</button>
              <button className="payButton">Thanh Toán</button>
            </div>
          </div>
          <div className="box-infor">
            <div className="movieDetails">
              <div className="movieHeader">
                <h5 className='color-toge'>Làm Giàu Với Ma (T16)</h5>
                <p className="timeHold">
                  Thời gian giữ vé: <span className="checkout-clock">04:00</span>
                </p>
              </div>
              <p className="color-toge movieWarning">
                Phim dành cho khán giả từ 16 tuổi trở lên (16+)
              </p>
              <p>
                Rạp: Ticket Quận 12, 271 Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, TP Hồ Chí Minh
              </p>
              <p className="color-toge">Thời gian:</p> <samp>16:25 Thứ Bảy 21/09/2024</samp>
              <p>Phòng: 06 | Loại vé: Ghế Thường | Ghế: E01</p>
              <p>Số lượng vé: 1 Người Lớn</p>
            </div>
            <p>Combo: Bắp nước *1</p>
            <hr />
            <div className="totalAmount">
              <h6 className="color-toge">SỐ TIỀN CẦN THANH TOÁN:</h6>
              <p className="amount">70,000 VND</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;