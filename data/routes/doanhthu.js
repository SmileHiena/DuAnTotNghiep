const express = require('express');
const router = express.Router();
const connectDb = require('../models/db'); 

// API để hiển thị doanh thu
router.get('/doanhthu', async (req, res) => {
    try {
        const db = await connectDb();
        const hoaDonCollection = db.collection('hoadon');

        // Lấy dữ liệu tổng số vé đã bán và tổng doanh thu
        const doanhThu = await hoaDonCollection.aggregate([
            {
                $group: {
                    _id: null,
                    totalTicketsSold: { $sum: "$SoLuongVe" }, // Tổng số vé đã bán
                    totalRevenue: { $sum: { $multiply: ["$GiaVe", "$SoLuongVe"] } } // Tổng doanh thu
                }
            }
        ]).toArray();

        if (doanhThu.length > 0) {
            res.status(200).json({
                totalTicketsSold: doanhThu[0].totalTicketsSold,
                totalRevenue: doanhThu[0].totalRevenue
            });
        } else {
            res.status(404).json({ message: 'Không có dữ liệu doanh thu.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
});

module.exports = router;
