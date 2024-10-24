const express = require('express');
const router = express.Router();
const connectDb = require('../models/db');
const { ObjectId } = require('mongodb');

// Lấy danh sách suất chiếu với thông tin phim và rạp
router.get('/', async (req, res) => {
    try {
        const db = await connectDb();
        const collection = db.collection('suatchieu');
        const suatChieu = await collection.aggregate([
            {
                $lookup: {
                    from: "phim",
                    localField: "idPhim",
                    foreignField: "_id",
                    as: "phim"
                }
            },
            {
                $lookup: {
                    from: "rap",
                    localField: "idRap",
                    foreignField: "_id",
                    as: "rap"
                }
            },
            {
                $project: {
                    _id: 1,
                    ThoiGianChieu: 1,
                    GiaVe: 1,
                    "phim.TenPhim": 1,
                    "rap.TenRap": 1
                }
            }
        ]).toArray();
        res.json(suatChieu);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
});

// Lấy thông tin suất chiếu theo id với thông tin phim và rạp
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = await connectDb();
        const collection = db.collection('suatchieu');
        const suatChieu = await collection.aggregate([
            {
                $match: { _id: new ObjectId(id) }
            },
            {
                $lookup: {
                    from: "phim",
                    localField: "idPhim",
                    foreignField: "_id",
                    as: "phim"
                }
            },
            {
                $lookup: {
                    from: "rap",
                    localField: "idRap",
                    foreignField: "_id",
                    as: "rap"
                }
            },
            {
                $project: {
                    _id: 1,
                    ThoiGianChieu: 1,
                    GiaVe: 1,
                    "phim.TenPhim": 1,
                    "rap.TenRap": 1
                }
            }
        ]).toArray();

        if (suatChieu.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy suất chiếu' });
        }
        res.json(suatChieu[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
});

// Thêm suất chiếu mới
router.post('/add', async (req, res) => {
    try {
        const { idRap, idPhim, ThoiGianChieu, GiaVe } = req.body;

        const db = await connectDb();
        const collection = db.collection('suatchieu');

        // Kiểm tra xem idRap và idPhim có tồn tại không
        const rapExists = await db.collection('rap').findOne({ _id: new ObjectId(idRap) });
        const phimExists = await db.collection('phim').findOne({ _id: new ObjectId(idPhim) });

        if (!rapExists || !phimExists) {
            return res.status(400).json({ message: 'Rạp hoặc phim không tồn tại' });
        }

        const newSuatChieu = {
            idRap: new ObjectId(idRap),
            idPhim: new ObjectId(idPhim),
            ThoiGianChieu,
            GiaVe
        };

        const result = await collection.insertOne(newSuatChieu);
        res.status(201).json({ message: 'Suất chiếu đã được thêm thành công', suatChieu: result.ops[0] });
    } catch (error) {
        console.error('Có lỗi xảy ra khi thêm suất chiếu:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra trong quá trình thêm suất chiếu', error: error.message });
    }
});

// Sửa thông tin suất chiếu
router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { idRap, idPhim, ThoiGianChieu, GiaVe } = req.body;
        const db = await connectDb();
        const collection = db.collection('suatchieu');

        // Kiểm tra xem idRap và idPhim có tồn tại không
        const rapExists = await db.collection('rap').findOne({ _id: new ObjectId(idRap) });
        const phimExists = await db.collection('phim').findOne({ _id: new ObjectId(idPhim) });

        if (!rapExists || !phimExists) {
            return res.status(400).json({ message: 'Rạp hoặc phim không tồn tại' });
        }

        const updatedSuatChieu = {
            idRap: new ObjectId(idRap),
            idPhim: new ObjectId(idPhim),
            ThoiGianChieu,
            GiaVe
        };

        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedSuatChieu });
        if (result.modifiedCount === 0) {
            res.status(404).json({ message: 'Không tìm thấy suất chiếu để cập nhật' });
        } else {
            res.json({ message: 'Cập nhật thông tin suất chiếu thành công' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
});

// Xóa suất chiếu (giữ nguyên như trước)

module.exports = router;