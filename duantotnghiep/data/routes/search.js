const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const connectDb = require('../models/db'); // Đảm bảo rằng bạn có hàm này để kết nối đến cơ sở dữ liệu

// API tìm kiếm theo tên phim, diễn viên hoặc đạo diễn
router.get('/results', async (req, res) => {
    try {
        const { search_query } = req.query; // Lấy từ khóa tìm kiếm từ query

        // Kết nối tới cơ sở dữ liệu MongoDB
        const db = await connectDb();
        const collection = db.collection('phim');

        // Tạo điều kiện tìm kiếm
        let query = {};
        if (search_query) {
            const regex = new RegExp(search_query, 'i'); // Tạo biểu thức chính quy không phân biệt chữ hoa chữ thường
            query = {
                $or: [
                    { Ten: regex },
                    { "MoTa.DienVien": regex },
                    { "MoTa.DaoDien": regex }
                ]
            };
        }

        // Thực hiện truy vấn
        const results = await collection.find(query).toArray();

        // Trả về kết quả
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
});

// Xuất router
module.exports = router;

