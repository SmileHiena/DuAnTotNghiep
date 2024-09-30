var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');
const connectDb = require('../models/db');

// Lấy danh sách tất cả thể loại
router.get('/', async (req, res) => {
    const db = await connectDb();
    const categories = await db.collection('theloai').find().toArray();
    res.status(200).json(categories);
});

// Lấy thể loại theo _ID
router.get('/:id', async (req, res) => {
    const db = await connectDb();
    const category = await db.collection('theloai').findOne({ _id: ObjectId(req.params.id) });
    if (category) {
        res.status(200).json(category);
    } else {
        res.status(404).json({ message: 'Không tìm thấy thể loại' });
    }
});

// Thêm thể loại mới
router.post('/add', async (req, res) => {
    const db = await connectDb();
    const newCategory = {
        Ten: req.body.Ten
    };
    const lastCategory = await db.collection('theloai').find().sort({ id: -1 }).limit(1).toArray();
    newCategory.id = lastCategory.length > 0 ? lastCategory[0].id + 1 : 1;

    const result = await db.collection('theloai').insertOne(newCategory);
    res.status(201).json({ message: 'Thể loại đã được thêm', id: result.insertedId });
});

// Sửa thể loại theo _ID
router.put('/edit/:id', async (req, res) => {
    const db = await connectDb();
    const updatedCategory = {
        Ten: req.body.Ten
    };
    const result = await db.collection('theloai').updateOne({ _id: ObjectId(req.params.id) }, { $set: updatedCategory });
    if (result.modifiedCount > 0) {
        res.status(200).json({ message: 'Thể loại đã được cập nhật' });
    } else {
        res.status(404).json({ message: 'Không tìm thấy thể loại để cập nhật' });
    }
});

// Xóa thể loại theo _ID
router.delete('/delete/:id', async (req, res) => {
    const db = await connectDb();
    const result = await db.collection('theloai').deleteOne({ _id: ObjectId(req.params.id) });
    if (result.deletedCount > 0) {
        res.status(200).json({ message: 'Thể loại đã được xóa' });
    } else {
        res.status(404).json({ message: 'Không tìm thấy thể loại để xóa' });
    }
});

module.exports = router;
