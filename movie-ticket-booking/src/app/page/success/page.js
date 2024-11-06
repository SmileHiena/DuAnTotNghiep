// import styles from '../styles/PaymentSuccess.module.css';
"use client";
import { useRouter } from "next/navigation";

const PaymentSuccess = () => {
  const router = useRouter();
//   const { } = router.query;

  return (
    <div className={"container"} style={{ textAlign: "center" }}>
      <h1>Thanh toán thành công!</h1>
      {/* <p>Mã đơn hàng: <strong>{orderId}</strong></p>
      <p>Số tiền: <strong>{amount} VND</strong></p>
      <p>Trạng thái: <strong>{message}</strong></p>
      <p>Mã phản hồi: <strong>{code}</strong></p> */}
      <p><a href="/">Quay lại trang chủ</a></p>
    </div>
  );
};

export default PaymentSuccess;
