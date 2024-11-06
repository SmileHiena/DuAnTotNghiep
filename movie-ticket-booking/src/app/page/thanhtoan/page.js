"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from 'axios';
import https from 'https';

const PaymentPage = () => {
  const router = useRouter();
  const [bankCode, setBankCode] = useState("");
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
    if (!paymentInfo) {
      alert("Không tìm thấy thông tin thanh toán.");
      return;
    }

    // Cập nhật thông tin bankCode và language nếu cần
    const amount = paymentInfo.TongTien;
    const orderId = paymentInfo.orderId;

    if (selectedPaymentType === "bank") {
      try {
        const response = await axiosClient.post("/create_payment_url", {
          amount: amount,
          orderId: orderId,
          bankCode: bankCode,  // Sử dụng bankCode đã chọn
          language: language,  // Sử dụng ngôn ngữ đã chọn
        });

        console.log("Response from API: ", response); // Kiểm tra response trả về
        if (response) {
          // setPaymentUrl(response.paymentUrl);  // Lưu URL thanh toán vào state
          router.push(response);  // Chuyển hướng đến trang thanh toán
        } else {
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

  return (
    <>
      <div>
        <h1>Thanh toán cho hóa đơn</h1>
        <div>
          <h3>Thông tin thanh toán:</h3>
          <p>Phương thức thanh toán: {paymentInfo.PhuongThucThanhToan}</p>
          <p>Số tiền: {paymentInfo.TongTien}</p>
          <p>Tên khách hàng: {paymentInfo.TenKhachHang}</p>
          <p>Email: {paymentInfo.Email}</p>
        </div>
      </div>

      <div className="container">
        <h3>Thanh toán</h3>
        <div className="table-responsive">
          <form id="createOrder" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="amount">Số tiền</label>
              <input
                className="form-control"
                id="amount"
                name="amount"
                placeholder="Số tiền"
                value={paymentInfo.TongTien}
                disabled
              />
            </div>

            <div className="form-group">
              <label>Chọn Phương thức thanh toán:</label>
              <div className="controls">
                <label className="radio-inline">
                  <input
                    type="radio"
                    name="bankCode"
                    value="VNPAYQR"
                    checked={bankCode === "VNPAYQR"}
                    onChange={() => {
                      setBankCode("VNPAYQR");
                      setSelectedPaymentType("bank");
                    }}
                  />
                  Thanh toán qua ứng dụng hỗ trợ VNPAYQR
                </label>
              </div>
              <div className="controls">
                <label className="radio-inline">
                  <input
                    type="radio"
                    name="bankCode"
                    value="VNBANK"
                    checked={selectedPaymentType === "bank" && bankCode === "VNBANK"}
                    onChange={() => {
                      setBankCode("VNBANK");
                      setSelectedPaymentType("bank");
                    }}
                  />
                  Thanh toán qua ATM-Tài khoản ngân hàng nội địa
                </label>
              </div>
              <div className="controls">
                <label className="radio-inline">
                  <input
                    type="radio"
                    name="bankCode"
                    value="INTCARD"
                    checked={bankCode === "INTCARD"}
                    onChange={() => {
                      setBankCode("INTCARD");
                      setSelectedPaymentType("card");
                    }}
                  />
                  Thanh toán qua thẻ quốc tế
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Ngôn ngữ:</label>
              <div className="controls">
                <label className="radio-inline">
                  <input
                    type="radio"
                    name="language"
                    value="vn"
                    checked={language === "vn"}
                    onChange={() => setLanguage("vn")}
                  />
                  Tiếng việt
                </label>
              </div>
              <div className="controls">
                <label className="radio-inline">
                  <input
                    type="radio"
                    name="language"
                    value="en"
                    checked={language === "en"}
                    onChange={() => setLanguage("en")}
                  />
                  Tiếng anh
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-default" id="btnPopup">
              Thanh toán
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
