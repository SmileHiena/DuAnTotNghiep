const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const connectDb = require('../models/db');

// API lấy chi tiết giờ chiếu theo ID
router.get('/:id', async (req, res) => {
  try {
    const db = await connectDb();
    const gioChieuCollection = db.collection('giochieu');

    // Lấy ID giờ chiếu từ params
    const gioChieuId = req.params.id;
    const gioChieu = await gioChieuCollection.findOne({ _id: ObjectId(gioChieuId) });

    if (!gioChieu) {
      return res.status(404).json({ message: 'Giờ chiếu không tồn tại' });
    }

    res.status(200).json(gioChieu);
  } catch (error) {
    console.error('Lỗi khi lấy giờ chiếu:', error);
    res.status(500).json({ message: 'Không thể lấy dữ liệu giờ chiếu' });
  }
});

// API lấy danh sách giờ chiếu với các tùy chọn lọc
router.get('/', async (req, res) => {
  try {
    const db = await connectDb();
    const gioChieuCollection = db.collection('giochieu');

    // Nhận các tham số lọc từ query
    const { IdPhong, Gio, TrangThai } = req.query;

    // Xây dựng query dựa trên tham số lọc
    const query = {};
    if (IdPhong) query.IdPhong = parseInt(IdPhong); // Chuyển thành số nếu cần
    if (Gio) query.Gio = Gio;
    if (TrangThai) query.TrangThai = TrangThai;

    // Tìm danh sách giờ chiếu dựa trên query
    const gioChieuList = await gioChieuCollection.find(query).toArray();

    res.status(200).json(gioChieuList);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách giờ chiếu:', error);
    res.status(500).json({ message: 'Không thể lấy dữ liệu giờ chiếu' });
  }
});

module.exports = router;
