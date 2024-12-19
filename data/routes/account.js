const express = require('express');
const router = express.Router();
const connectDb = require('../models/db');
const { ObjectId } = require('mongodb');

// Lấy danh sách tài khoản
router.get('/', async (req, res) => {
  try {
    const db = await connectDb();
    const collection = db.collection('taikhoan'); 
    const accounts = await collection.find().toArray();
    res.json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});


// Xóa tài khoản
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDb();
    const collection = db.collection('taikhoan');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Không tìm thấy tài khoản để xóa' });
    } else {
      res.json({ message: 'Tài khoản đã được xóa thành công' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

// Khóa tài khoản (đóng băng tài khoản)
router.put('/lock/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDb();
    const collection = db.collection('taikhoan');

    // Cập nhật trạng thái khóa tài khoản
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { IsLocked: true } });

    if (result.modifiedCount === 0) {
      res.status(404).json({ message: 'Không tìm thấy tài khoản để khóa' });
    } else {
      res.json({ message: 'Tài khoản đã bị khóa và đóng băng' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

// Mở khóa tài khoản
router.put('/unlock/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDb();
    const collection = db.collection('taikhoan');

    // Cập nhật trạng thái mở khóa tài khoản
    const result = await collection.updateOne(
      { _id: new ObjectId(id) }, 
      { $set: { IsLocked: false } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy tài khoản để mở khóa' });
    } else {
      return res.json({ message: 'Tài khoản đã được mở khóa' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
  }
});

module.exports = router;