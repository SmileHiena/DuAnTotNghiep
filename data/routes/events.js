var express = require('express');
var router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

// Thiết lập nơi lưu trữ và tên file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/'); // Thư mục lưu trữ ảnh
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Tên file độc nhất
  }
});

// Kiểm tra file upload (chỉ chấp nhận ảnh)
function checkFileUpload(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Bạn chỉ được upload file ảnh'));
  }
  cb(null, true);
}

// Upload file với kiểm tra ảnh
let upload = multer({ storage: storage, fileFilter: checkFileUpload });
const connectDb = require('../model/db');

// API lấy danh sách sự kiện
router.get('/', async (req, res) => {
  try {
    const db = await connectDb();
    const eventCollection = db.collection('Sukien');
    const events = await eventCollection.find().toArray();

    if (events.length > 0) {
      res.status(200).json(events);
    } else {
      res.status(404).json({ message: 'Không có sự kiện nào được tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

// API thêm sự kiện (với upload ảnh)
router.post('/event', upload.single('Anh'), async (req, res) => {
  try {
    const { Ten, Noidung } = req.body;
    const Anh = req.file ? req.file.path : null;

    if (!Ten || !Noidung || !Anh) {
      return res.status(400).json({ message: 'Thiếu thông tin cần thiết' });
    }

    const db = await connectDb();
    const eventCollection = db.collection('sukien');

    const newEvent = { Ten, Noidung, Anh };
    await eventCollection.insertOne(newEvent);

    res.status(201).json({ message: 'Thêm sự kiện thành công', newEvent });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

// API xóa sự kiện theo ID
router.delete('/event/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    const db = await connectDb();
    const eventCollection = db.collection('sukien');

    const result = await eventCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Xóa sự kiện thành công' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy sự kiện' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

module.exports = router;