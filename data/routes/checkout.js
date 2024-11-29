var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');
const connectDb = require('../models/db');
const { getUserFromToken } = require('./middleware');
const nodemailer = require('nodemailer');

const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
// POST: Tạo hóa đơn mới
router.post('/', getUserFromToken, async (req, res) => {
    try {
        const {
            NgayMua,
            Rap,
            PhuongThucThanhToan,
            TenPhim,
            ThoiGian,
            NgayChieu,
            SoGhe,
            PhongChieu,
            GiaVe,
            TongTien,
            TenKhachHang,
            Email,
            Combo,
            IdPhong,
        } = req.body;

        if (!NgayMua || !Rap || !PhuongThucThanhToan || !TenPhim || !ThoiGian || !NgayChieu || !SoGhe || !PhongChieu || !GiaVe || !TongTien || !TenKhachHang || !Email || !IdPhong) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const userId = req.user.userId; // Lấy userId từ token

        // Connect to the database
        const db = await connectDb();
        const invoicesCollection = db.collection('hoadon');

        // Calculate new invoice ID
        const newInvoiceId = (await invoicesCollection.countDocuments()) + 1;

        const newInvoice = {
            id: newInvoiceId,
            userId,
            NgayMua,
            Rap,
            PhuongThucThanhToan,
            TenPhim,
            ThoiGian,
            NgayChieu,
            SoGhe,
            PhongChieu,
            GiaVe,
            TongTien,
            TenKhachHang,
            Email,
            Combo: Combo || null,
            IdPhong: IdPhong,
            TrangThai: "Đã Đặt",  // Thêm trạng thái "Đã Đặt"
            createdAt: new Date(),
        };

        // Insert the new invoice
        const result = await invoicesCollection.insertOne(newInvoice);
        res.status(201).json({ id: newInvoiceId, ...newInvoice });
    } catch (error) {
        console.error('Error creating invoice:', error);
        res.status(500).json({ message: 'Failed to create invoice' });
    }
});


// Tạo transporter cho Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'toan2211w1@gmail.com',
      pass: 'rqaq axfn avib gnut', // Thay thế bằng mật khẩu app hoặc OAuth token khi triển khai thật
    },
  });
  
  router.post('/send-email', async (req, res) => {
      try {
        const { email, invoiceData } = req.body;
    
        // Parse the showtime and show date into a Date object
        const showDateTime = new Date(`${invoiceData.ThoiGian}`);
        const currentDateTime = new Date();
        const timeDifferenceInHours = (currentDateTime - showDateTime) / (1000 * 60 * 60);
        let status = "Hoạt động";
        if (timeDifferenceInHours > 3) {
          status = "Không hoạt động"; // Inactive if the showtime is more than 3 hours ago
        }
    
        // Create QR data for the invoice
        const qrData = `
          Ngày mua: ${invoiceData.NgayMua}
          Rạp: ${invoiceData.Rap}
          Phương thức thanh toán: ${invoiceData.PhuongThucThanhToan}
          Tên phim: ${invoiceData.TenPhim}
          Thời gian chiếu: ${invoiceData.ThoiGian}
          Ngày chiếu: ${invoiceData.NgayChieu}
          Số ghế: ${invoiceData.SoGhe}
          Phòng chiếu: ${invoiceData.PhongChieu}
          Giá vé: ${invoiceData.GiaVe} VND
          Tổng tiền: ${invoiceData.TongTien} VND
          Tên khách hàng: ${invoiceData.TenKhachHang}
          Email: ${invoiceData.Email}
          Combo: ${invoiceData.Combo || "Không có"}
          Phòng Số: ${invoiceData.IdPhong}
          Trạng thái: ${status}  <!-- Add status here -->
        `;
    
        // Generate the QR code buffer
        const qrCode = await QRCode.toBuffer(qrData);
    
        // Create the HTML content for the email
        const emailContent = `
          <div style="font-family: 'Arial', sans-serif; padding: 20px; background-color: #f4f7fc; border-radius: 10px; max-width: 600px; margin: auto;">
            <div style="text-align: center; padding-bottom: 30px;">
              <h3 style="font-size: 24px; color: #4a4a4a; font-weight: bold;">Thông tin hóa đơn đặt vé</h3>
              <h4 style="color: #7b7b7b;">Cảm ơn bạn đã đặt vé tại hệ thống của chúng tôi! Dưới đây là thông tin chi tiết của vé đặt mua.</h4>
            </div>
            
            <div style="padding-bottom: 30px; border-bottom: 1px solid #dcdcdc;">
              <ul style="list-style: none; padding: 0; color: #4a4a4a;">
                <li style="padding: 8px 0; font-size: 16px;"><b>Ngày mua:</b> ${invoiceData.NgayMua}</li>
                <li style="padding: 8px 0; font-size: 16px;"><b>Rạp:</b> ${invoiceData.Rap}</li>
                <li style="padding: 8px 0; font-size: 16px;"><b>Phương thức thanh toán:</b> ${invoiceData.PhuongThucThanhToan}</li>
                <li style="padding: 8px 0; font-size: 16px;"><b>Tên phim:</b> ${invoiceData.TenPhim}</li>
                <li style="padding: 8px 0; font-size: 16px;"><b>Thời gian chiếu:</b> ${invoiceData.ThoiGian}</li>
                <li style="padding: 8px 0; font-size: 16px;"><b>Ngày chiếu:</b> ${invoiceData.NgayChieu}</li>
                <li style="padding: 8px 0; font-size: 16px;"><b>Số ghế:</b> ${invoiceData.SoGhe}</li>
                <li style="padding: 8px 0; font-size: 16px;"><b>Phòng chiếu:</b> ${invoiceData.PhongChieu}</li>
                <li style="padding: 8px 0; font-size: 16px;"><b>Giá vé:</b> ${invoiceData.GiaVe} VND</li>
                <li style="padding: 8px 0; font-size: 16px;"><b>Tổng tiền:</b> ${invoiceData.TongTien} VND</li>
                <li style="padding: 8px 0; font-size: 16px;"><b>Tên khách hàng:</b> ${invoiceData.TenKhachHang}</li>
                <li style="padding: 8px 0; font-size: 16px;"><b>Email:</b> ${invoiceData.Email}</li>
                <li style="padding: 8px 0; font-size: 16px;"><b>Combo:</b> ${invoiceData.Combo || "Không có"}</li>
                <li style="padding: 8px 0; font-size: 16px;"><b>Phòng Số:</b> ${invoiceData.IdPhong}</li>
                <li style="padding: 8px 0; font-size: 16px;"><b>Trạng thái:</b> ${status}</li> <!-- Add status to email content -->
              </ul>
            </div>
    
            <div style="text-align: center; padding: 30px 0;">
              <h4 style="font-size: 20px; color: #4a4a4a;">Mã QR của bạn:</h4>
              <img src="cid:qrCode" alt="QR Code" style="border-radius: 8px; box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);" />
            </div>
    
            <div style="text-align: center; padding-top: 20px;">
              <p style="color: #4a4a4a;">Ngày tạo: ${new Date().toLocaleString()}</p>
              <p style="color: #7b7b7b; font-size: 14px;">Chúc bạn có một ngày tuyệt vời!</p>
            </div>
          </div>
        `;
    
        // Configure mail options
        const mailOptions = {
          from: 'toan2211w1@gmail.com', // Sender email address
          to: email, // Recipient email address
          subject: `Xác nhận đặt vé - ${invoiceData.TenPhim}`, // Subject of the email
          html: emailContent, // HTML email content
          attachments: [{
            filename: 'qr-code.png',
            content: qrCode, // QR code content
            cid: 'qrCode', // Content-ID for the QR code in the email
          }],
        };
    
        // Configure Nodemailer transporter
        const transporter = nodemailer.createTransport({
          service: 'gmail', // Using Gmail to send the email
          auth: {
            user: 'toan2211w1@gmail.com', // Gmail address for sending emails
            pass: 'rqaq axfn avib gnut', // Gmail app password (use an actual app password here)
          },
          logger: true,  // Enable logger to monitor request in console
          debug: true,   // Enable debug mode to check detailed request logs
        });
    
        // Send email
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email: ' + error.message);
      }
    });
      

// GET: Lấy hóa đơn cho người dùng dựa trên token
router.get("/", getUserFromToken, async (req, res) => {
    try {
        const movieId = req.query.movieId;
        const userId = req.user.userId; // Lấy userId từ token

        const db = await connectDb();
        const hoadonCollection = db.collection("hoadon");

        const query = { userId };

        if (movieId) {
            query.movieId = movieId;
        }

        const hoadon = await hoadonCollection.find(query).toArray();

        // Thêm trạng thái "TrangThai" vào mỗi hóa đơn trả về (nếu chưa có)
        hoadon.forEach(invoice => {
            if (!invoice.TrangThai) {
                invoice.TrangThai = "Đã Đặt"; // Nếu không có TrangThai, mặc định là "Đã Đặt"
            }
        });

        res.status(200).json(hoadon);
    } catch (error) {
        console.error("Error fetching hoadon:", error);
        res.status(500).json({ message: "Failed to fetch hoadon" });
    }
});



// GET: Lấy hóa đơn theo ID
router.get('/:id', async (req, res) => {
    try {
        const db = await connectDb();
        const invoicesCollection = db.collection('hoadon');

        const invoiceId = parseInt(req.params.id, 10);

        if (isNaN(invoiceId) || invoiceId <= 0) {
            return res.status(400).json({ message: 'Invalid invoice ID' });
        }

        const invoice = await invoicesCollection.findOne({ id: invoiceId });

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        res.status(200).json(invoice);
    } catch (error) {
        console.error('Error fetching invoice:', error);
        res.status(500).json({ message: 'Failed to fetch invoice' });
    }
});


// DELETE: Hủy hóa đơn theo ID
router.delete('/:id', async (req, res) => {
    try {
        const db = await connectDb();
        const invoicesCollection = db.collection('hoadon');

        const invoiceId = parseInt(req.params.id, 10); // Lấy ID từ URL

        // Kiểm tra nếu ID không hợp lệ
        if (isNaN(invoiceId) || invoiceId <= 0) {
            return res.status(400).json({ message: 'Invalid invoice ID' });
        }

        // Tìm hóa đơn và thay đổi trạng thái
        const result = await invoicesCollection.updateOne(
            { id: invoiceId }, // Tìm hóa đơn theo ID
            { $set: { TrangThai: "Đã Hủy" } } // Cập nhật trạng thái thành "Đã Hủy"
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        res.status(200).json({ message: 'Invoice status updated to "Đã Hủy"' });
    } catch (error) {
        console.error('Error updating invoice status:', error);
        res.status(500).json({ message: 'Failed to update invoice status' });
    }
});



module.exports = router;