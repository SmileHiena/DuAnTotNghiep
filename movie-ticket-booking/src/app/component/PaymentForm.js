// Form thanh toán

// components/PaymentForm.js
import { useState } from 'react';

const PaymentForm = () => {
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gọi API thanh toán
    console.log('Thông tin thanh toán:', paymentInfo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="cardNumber"
        placeholder="Số thẻ"
        value={paymentInfo.cardNumber}
        onChange={handleChange}
      />
      <input
        type="text"
        name="expiryDate"
        placeholder="Ngày hết hạn"
        value={paymentInfo.expiryDate}
        onChange={handleChange}
      />
      <input
        type="text"
        name="cvv"
        placeholder="CVV"
        value={paymentInfo.cvv}
        onChange={handleChange}
      />
      <button type="submit">Thanh toán</button>
    </form>
  );
};

export default PaymentForm;