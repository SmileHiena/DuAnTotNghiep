var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');
const connectDb = require('../models/db');
const { getUserFromToken } = require('./middleware');

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