import React, { useEffect } from "react";

const PaymentResult = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const vnpResponseCode = urlParams.get("vnp_ResponseCode");
    const orderId = urlParams.get("vnp_OrderId");

    // Xử lý kết quả thanh toán dựa trên vnp_ResponseCode
    if (vnpResponseCode === "00") {
      console.log("Thanh toán thành công cho Mã Đơn Hàng:", orderId);
      // Cập nhật trạng thái đơn hàng trong cơ sở dữ liệu của bạn
    } else {
      console.log("Thanh toán thất bại cho Mã Đơn Hàng:", orderId);
      // Xử lý thất bại thanh toán
    }
  }, []);

  return (
    <div>
      <h2>Kết Quả Thanh Toán</h2>
      {/* Hiển thị kết quả thanh toán cho người dùng */}
    </div>
  );
};

export default PaymentResult;
