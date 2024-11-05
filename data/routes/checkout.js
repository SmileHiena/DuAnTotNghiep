var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');
const connectDb = require('../models/db');
const { getUserFromToken } = require('./middleware');
let currentId = 0; 

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

      res.status(200).json(hoadon);
    } catch (error) {
      console.error("Error fetching hoadon:", error);
      res.status(500).json({ message: "Failed to fetch hoadon" });
    }
});

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
        } = req.body;

        if (!NgayMua || !Rap || !PhuongThucThanhToan || !TenPhim || !ThoiGian || !NgayChieu || !SoGhe || !PhongChieu || !GiaVe || !TongTien || !TenKhachHang || !Email || !Combo) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const userId = req.user.userId; // Lấy userId từ token
        const newInvoiceId = ++currentId;

        const db = await connectDb();
        const invoicesCollection = db.collection('hoadon');

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
            Combo,
            createdAt: new Date(),
        };

        const result = await invoicesCollection.insertOne(newInvoice);
        res.status(201).json({ id: newInvoiceId, ...newInvoice });
    } catch (error) {
        console.error('Error creating invoice:', error);
        res.status(500).json({ message: 'Failed to create invoice' });
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

module.exports = router;
