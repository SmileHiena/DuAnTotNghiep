// pages/api/order/create_payment_url.js
import axios from 'axios';
import https from 'https';

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

// Xuất đối tượng handleTransaction với phương thức bank
const handleTransaction = {
    bank: async (amount, orderId) => {
      try {
        const response = await axiosClient.post("/create_payment_url", {
          amount: amount,
          orderId: orderId,
          bankCode: "VNBANK",
          language: "vn",
        });
        console.log("Response from API: ", response); // Kiểm tra response trả về
        // Kiểm tra lại trước khi trả về response
        console.log({
            amount,
            orderId,
            bankCode,
            language,
            paymentUrl,
        });
  
        return response.data; // Đảm bảo rằng đây là data trả về từ API
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    },
  };
  

export default handleTransaction;
