"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [paymentInfo, setPaymentInfo] = useState({});
  const [error, setError] = useState("");

  const orderId = searchParams.get("vnp_OrderInfo");
  const amount = searchParams.get("vnp_Amount");
  const message = searchParams.get("message");
  const code = searchParams.get("code");

  useEffect(() => {
    const saveInvoice = async () => {
      // Lấy thông tin thanh toán từ cookie
      const tokenValue = Cookies.get("paymentInfo");
      if (!tokenValue) {
        setError("Không tìm thấy thông tin thanh toán.");
        return;
      }

      const info = JSON.parse(tokenValue);
      setPaymentInfo(info);
      console.log("Payment Info:", info); // Kiểm tra thông tin thanh toán

      // Kiểm tra thông tin thanh toán đã đầy đủ chưa
      if (!info) {
        setError("Thông tin thanh toán không hợp lệ.");
        return;
      }

      // Lấy token từ cookie
      const token = Cookies.get("token");
      if (!token) {
        setError("Không tìm thấy token xác thực.");
        return;
      }

      const invoiceData = {
        NgayMua: info.NgayMua,
        orderId: info.orderId,
        Rap: info.Rap,
        userId: info.userId,
        PhuongThucThanhToan: info.PhuongThucThanhToan,
        TenPhim: info.TenPhim,
        ThoiGian: info.ThoiGian,
        NgayChieu: info.NgayChieu,
        SoGhe: info.SoGhe,
        PhongChieu: info.PhongChieu,
        GiaVe: info.GiaVe,
        TongTien: info.TongTien,
        TenKhachHang: info.TenKhachHang,
        Email: info.Email,
        Combo: info.Combo,
      };

      console.log("Invoice Data:", invoiceData); // Kiểm tra payload

      // Gửi yêu cầu tạo hóa đơn
      try {
        const response = await fetch("http://localhost:3000/checkout/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(invoiceData),
        });

        if (!response.ok) {
          throw new Error("Không thể tạo hóa đơn.");
        }

        const result = await response.json();
        console.log("Hóa đơn đã được tạo:", result);

        if (result.id) {
          // Chuyển hướng sau 7 giây
          setTimeout(() => {
            router.push(`/page/chitiethoadon/${result.id}`);
          }, 7000);
        } else {
          setError("Không có ID hóa đơn để chuyển hướng.");
        }
      } catch (error) {
        console.error("Lỗi thanh toán:", error);
        setError("Đã xảy ra lỗi khi thanh toán.");
      }
    };

    saveInvoice();
  }, [router]);

  return (
    <div className="container">
      <h1>Thanh toán thành công!</h1>
      <p>Mã đơn hàng: <strong>{orderId}</strong></p>
      <p>Số tiền: <strong>{amount} VND</strong></p>
      <p>Trạng thái: <strong>{message}</strong></p>
      <p>Mã phản hồi: <strong>{code}</strong></p>
      {error && <p className="error-message">{error}</p>}
      <p><a onClick={() => router.push("/")} href="#">Quay lại trang chủ</a></p>
    </div>
  );
};

export default PaymentSuccess;
