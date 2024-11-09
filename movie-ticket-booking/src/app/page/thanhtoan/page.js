"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from 'axios';
import https from 'https';

const PaymentPage = () => {
  const router = useRouter();
  const [bankCode, setBankCode] = useState("VNBANK");
  const [language, setLanguage] = useState("vn");
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState("bank");
  const [paymentUrl, setPaymentUrl] = useState("");

  // Tạo một axios client với agent https để bỏ qua xác thực SSL
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  const axiosClient = axios.create({
    baseURL: 'http://localhost:3000/order',
    httpsAgent: agent,
  });

  axiosClient.interceptors.request.use((config) => {
    config.headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Max-Age": "1800",
      "Access-Control-Allow-Headers": "content-type",
      "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH, OPTIONS",
      ...config.headers,
    };
    return config;
  });

  axiosClient.interceptors.response.use(
    (response) => {
      if (response.status === 200 && response.data) {
        return response.data;
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Lấy thông tin thanh toán từ cookies khi component load
  useEffect(() => {
    const paymentData = Cookies.get("paymentInfo");
    if (paymentData) {
      setPaymentInfo(JSON.parse(paymentData));
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Đảm bảo thông tin thanh toán hợp lệ
    if (!paymentInfo || !paymentInfo.TongTien || !paymentInfo.orderId) {
      alert("Thông tin thanh toán không đầy đủ.");
      return;
    }
  
    const amount = paymentInfo.TongTien;
    const orderId = paymentInfo.orderId;
  
    if (selectedPaymentType === "bank") {
      try {
        const response = await axiosClient.post("/create_payment_url", {
          amount: amount,
          orderId: orderId,
          bankCode: bankCode,
          language: language,
        });
  
        console.log("Response from API:", response); // Kiểm tra response trả về
  
        // Kiểm tra nếu response là một chuỗi URL
        if (typeof response === 'string' && response.startsWith("http")) {
          setPaymentUrl(response);  // Lưu URL thanh toán vào state
          router.push(response);    // Chuyển hướng đến trang thanh toán
        } else {
          console.warn("paymentUrl không hợp lệ hoặc không có.");
          alert("Lỗi khi tạo liên kết thanh toán");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Đã xảy ra lỗi khi thanh toán.");
      }
    }
  };
  

  if (!paymentInfo) {
    return <p>Đang tải thông tin thanh toán...</p>;
  }
  // console.log(paymentInfo.orderId);
  // console.log(paymentInfo.Email);

  return (
    <>
 <div className="container mx-auto my-10 max-w-lg p-8 bg-white rounded-lg shadow-lg">
  <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Thanh toán cho hóa đơn {paymentInfo.orderId}</h1>

  <div className="bg-gray-100 p-4 rounded mb-6">
    <h3 className="text-xl font-semibold mb-2 text-blue-700">Thông tin thanh toán:</h3>
    <p><span className="font-semibold text-gray-700">Tên khách hàng: {paymentInfo.TenKhachHang}</span></p>
    <p><span className="font-semibold text-gray-700">Email: {paymentInfo.Email}</span></p>
    <p><span className="font-semibold text-gray-700">Số diện thoại: {paymentInfo.SoDienThoai}</span></p>
  </div>

  <h3 className="text-2xl font-bold text-center mb-4 text-blue-700">Thanh toán</h3>
  <form id="createOrder" onSubmit={handleSubmit} className="space-y-4">
    <div className="form-group">
      <label htmlFor="amount" className="block font-semibold mb-1 text-gray-600">Số tiền</label>
      <input
        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
        id="amount"
        name="amount"
        placeholder="Số tiền"
        value={paymentInfo.TongTien}
        disabled
      />
    </div>

    <div className="form-group">
      <label className="block font-semibold mb-2 text-gray-600">Chọn Phương thức thanh toán:</label>
      <div className="space-y-2">
        {/* <label className="flex items-center space-x-2 text-gray-600">
          <input type="radio" name="bankCode" value="VNPAYQR" checked={bankCode === "VNPAYQR"} onChange={() => { setBankCode("VNPAYQR"); setSelectedPaymentType("bank"); }} />
          <span>Thanh toán qua ứng dụng hỗ trợ VNPAYQR</span>
        </label> */}
        <label className="flex items-center space-x-2 text-gray-600">
          <input type="radio" name="bankCode" value="VNBANK" checked={selectedPaymentType === "bank" && bankCode === "VNBANK"} onChange={() => { setBankCode("VNBANK"); setSelectedPaymentType("bank"); }} />
          <span>Thanh toán qua ATM-Tài khoản ngân hàng nội địa</span>
        </label>
        {/* <label className="flex items-center space-x-2 text-gray-600">
          <input type="radio" name="bankCode" value="INTCARD" checked={bankCode === "INTCARD"} onChange={() => { setBankCode("INTCARD"); setSelectedPaymentType("card"); }} />
          <span>Thanh toán qua thẻ quốc tế</span>
        </label> */}
      </div>
    </div>

    <div className="form-group">
      <label className="block font-semibold mb-2 text-gray-600">Ngôn ngữ:</label>
      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-gray-600">
          <input type="radio" name="language" value="vn" checked={language === "vn"} onChange={() => setLanguage("vn")} />
          <span>Tiếng Việt</span>
        </label>
        <label className="flex items-center space-x-2 text-gray-600">
          <input type="radio" name="language" value="en" checked={language === "en"} onChange={() => setLanguage("en")} />
          <span>Tiếng Anh</span>
        </label>
      </div>
    </div>

    <button type="submit" className="w-full p-3 text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-md transition">Thanh toán</button>
  </form>
</div>

    </>
  );
};

export default PaymentPage;
