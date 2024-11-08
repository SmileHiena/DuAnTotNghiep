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
        // Destructure required fields from the request body
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
            SoDienThoai,


        } = req.body;

        // Check for missing required fields
        const missingFields = [];
        if (!NgayMua) missingFields.push("NgayMua");
        if (!Rap) missingFields.push("Rap");
        if (!PhuongThucThanhToan) missingFields.push("PhuongThucThanhToan");
        if (!TenPhim) missingFields.push("TenPhim");
        if (!ThoiGian) missingFields.push("ThoiGian");
        if (!NgayChieu) missingFields.push("NgayChieu");
        if (!SoGhe) missingFields.push("SoGhe");
        if (!PhongChieu) missingFields.push("PhongChieu");
        if (!GiaVe) missingFields.push("GiaVe");
        if (!TongTien) missingFields.push("TongTien");
        if (!TenKhachHang) missingFields.push("TenKhachHang");
        if (!Email) missingFields.push("Email");
        if (!SoDienThoai) missingFields.push("SoDienThoai");

        // If any fields are missing, return an error with details
        if (missingFields.length > 0) {
            return res.status(400).json({ message: `Missing required fields: ${missingFields.join(", ")}` });
        }

        const userId = req.user.userId; // Get userId from the token

        // Connect to the database
        const db = await connectDb();
        const invoicesCollection = db.collection('hoadon');

        // Calculate new invoice ID by checking the highest existing ID and incrementing
        const lastInvoice = await invoicesCollection.findOne({}, { sort: { id: -1 } });
        const newInvoiceId = lastInvoice ? lastInvoice.id + 1 : 1;

        // Create new invoice object
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
            SoDienThoai,
            Combo: Combo || null,
            createdAt: new Date(),
        };

        // Insert the new invoice into the collection
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


// DELETE: Hủy hóa đơn theo ID
router.delete('/:id', async (req, res) => {
    try {
        const db = await connectDb();
        const invoicesCollection = db.collection('hoadon');

        const invoiceId = parseInt(req.params.id, 10); // Get the ID from the URL

        // Check if the ID is valid
        if (isNaN(invoiceId) || invoiceId <= 0) {
            return res.status(400).json({ message: 'Invalid invoice ID' });
        }

        // Find and delete the invoice
        const result = await invoicesCollection.deleteOne({ id: invoiceId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        res.status(200).json({ message: 'Invoice deleted successfully' });
    } catch (error) {
        console.error('Error deleting invoice:', error);
        res.status(500).json({ message: 'Failed to delete invoice' });
    }
});


module.exports = router;