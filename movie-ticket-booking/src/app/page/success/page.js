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
  const [hasSavedInvoice, setHasSavedInvoice] = useState(false);
  const orderId = searchParams.get("vnp_OrderInfo");
  const amount = searchParams.get("vnp_Amount");
  const message = searchParams.get("message");
  const code = searchParams.get("code");

  useEffect(() => {
    let isInvoiceSaved = false; // Biến cờ để đảm bảo chỉ gửi một lần

    const saveInvoice = async () => {
      if (isInvoiceSaved) return; // Nếu đã gửi thì dừng lại
      isInvoiceSaved = true;

      // Lấy thông tin thanh toán từ cookie
      const tokenValue = Cookies.get("paymentInfo");
      if (!tokenValue) {
        setError("Không tìm thấy thông tin thanh toán.");
        return;
      }

      const info = JSON.parse(tokenValue);
      setPaymentInfo(info);
      console.log("Payment Info:", info);

      if (!info) {
        setError("Thông tin thanh toán không hợp lệ.");
        return;
      }

      const token = Cookies.get("token");
      if (!token) {
        setError("Không tìm thấy token xác thực.");
        return;
      }

      // Kiểm tra xem thông tin suất chiếu có đầy đủ không
      if (!info.PhongChieu || !info.ThoiGian || !info.SoGhe) {
        setError("Thông tin suất chiếu không hợp lệ.");
        return;
      }

      // Chuyển đổi ghế thành định dạng mong muốn nếu cần
      let formattedSeats = [];
      if (Array.isArray(info.SoGhe)) {
        // Nếu SoGhe là mảng, xử lý bình thường
        formattedSeats = info.SoGhe.map(ghe => ghe.replace(/^[A-Za-z]-/, "").replace(/\s+/g, ""));
      } else if (typeof info.SoGhe === "string") {
        // Nếu SoGhe là chuỗi, chuyển đổi nó thành mảng
        formattedSeats = info.SoGhe.split(",").map(ghe => ghe.replace(/^[A-Za-z]-/, "").replace(/\s+/g, ""));
      } else {
        // Nếu SoGhe không phải mảng hoặc chuỗi, báo lỗi
        setError("Dữ liệu ghế không hợp lệ.");
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
        SoGhe: formattedSeats, // Đảm bảo sử dụng ghế đã được định dạng lại
        PhongChieu: info.PhongChieu,
        GiaVe: info.GiaVe,
        TongTien: info.TongTien,
        TenKhachHang: info.TenKhachHang,
        Email: info.Email,
        Combo: info.Combo,
        IdPhong: info.IdPhong,
      };

      console.log("Invoice Data:", invoiceData);

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

        // Kiểm tra nếu có ID hóa đơn để chuyển hướng
        if (result.id) {
          // Chuyển hướng sau 7 giây
          setTimeout(() => {
            router.push(`/page/chitiethoadon/${result.id}`);
          }, 5000); // 5000ms = 5 giây
        } else {
          setError("Không có ID hóa đơn để chuyển hướng.");
        }

        // Gọi API cập nhật ghế đã đặt sau khi tạo hóa đơn thành công
        const updateSeatsResponse = await fetch("http://localhost:3000/suatchieu/capnhatghedadat", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            IdPhong: info.IdPhong,  // Đảm bảo IdPhong là đúng
            GioChieu: info.ThoiGian,   // Đảm bảo GioChieu là đúng
            SoGhe: formattedSeats,      // Đảm bảo SoGhe là mảng đã được xử lý
          }),
        });

        if (updateSeatsResponse.ok) {
          console.log("Cập nhật ghế đã đặt thành công.");
        } else {
          console.error("Không thể cập nhật ghế.");
        }

      } catch (error) {
        console.error("Lỗi thanh toán:", error);
        setError("Đã xảy ra lỗi khi thanh toán.");
      }
    };

    saveInvoice();
  }, []); // Chỉ chạy một lần khi component được mount

  return (
    <>
      <div className="container mx-auto my-10 flex justify-center items-center">
        <div className="bg-green-500 text-white rounded-lg shadow-lg p-10 text-center max-w-lg w-full">
          <h1 className="text-3xl font-bold mb-4">Thanh toán thành công!</h1>
          <p className="text-lg">Cảm ơn bạn đã hoàn tất thanh toán. Chúc bạn có một ngày vui vẻ!</p>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}
    </>
  );
};

export default PaymentSuccess;
