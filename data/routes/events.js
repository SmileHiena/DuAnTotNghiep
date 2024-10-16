var express = require('express');
var router = express.Router();
const multer = require('multer');
const { ObjectId } = require('mongodb');
const connectDb = require('../models/db');
const cors = require('cors');

// Sử dụng CORS
router.use(cors()); // Thêm middleware CORS

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

// API lấy danh sách sự kiện
router.get('/', async (req, res) => {
  try {
    const db = await connectDb();
    const eventCollection = db.collection('sukien');
    const events = await eventCollection.find().toArray();

    if (events.length > 0) {
      res.status(200).json(events);
    } else {
      res.status(404).json({ message: 'Không có sự kiện nào được tìm thấy' });
    }
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sự kiện:', error); // Ghi lại lỗi ra console
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

// API lấy sự kiện theo _ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra tính hợp lệ của ID
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    const db = await connectDb();
    const eventCollection = db.collection('sukien');

    // Tìm sự kiện theo _id
    const event = await eventCollection.findOne({ _id: new ObjectId(id) });

    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: 'Không tìm thấy sự kiện' });
    }
  } catch (error) {
    console.error('Lỗi khi lấy sự kiện:', error); // Ghi lại lỗi ra console
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

// API thêm sự kiện (với upload ảnh)
router.post('/add', upload.single('Anh'), async (req, res) => {
  try {
    const { Ten, Noidung, idPhim, NgayBatDau, NgayKetThuc } = req.body;
    const Anh = req.file ? req.file.path : null;

    if (!Ten || !Noidung || !idPhim || !NgayBatDau || !NgayKetThuc || !Anh) {
      return res.status(400).json({ message: 'Thiếu thông tin cần thiết' });
    }

    const db = await connectDb();
    const eventCollection = db.collection('sukien');

    // Lấy sự kiện cuối cùng để tự động tăng ID
    const lastEvent = await eventCollection.find({}).sort({ id: -1 }).limit(1).toArray();
    let id = lastEvent.length > 0 ? lastEvent[0].id + 1 : 1;

    const newEvent = {
      id,
      Ten,
      Noidung,
      idPhim,
      NgayBatDau,
      NgayKetThuc,
      Anh
    };

    await eventCollection.insertOne(newEvent);

    res.status(201).json({ message: 'Thêm sự kiện thành công', newEvent });
  } catch (error) {
    console.error('Lỗi khi thêm sự kiện:', error); // Ghi lại lỗi ra console
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

// API sửa sự kiện theo _ID
router.put('/edit/:id', upload.single('Anh'), async (req, res) => {
  try {
    const { id } = req.params;
    const { Ten, Noidung, idPhim, NgayBatDau, NgayKetThuc } = req.body;
    const Anh = req.file ? req.file.path : null;

    // Kiểm tra tính hợp lệ của ID
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    const db = await connectDb();
    const eventCollection = db.collection('sukien');

    const updatedEvent = {
      Ten,
      Noidung,
      idPhim,
      NgayBatDau,
      NgayKetThuc,
      ...(Anh && { Anh })
    };

    const result = await eventCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedEvent }
    );

    if (result.matchedCount === 1) {
      res.status(200).json({ message: 'Cập nhật sự kiện thành công' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy sự kiện' });
    }
  } catch (error) {
    console.error('Lỗi khi cập nhật sự kiện:', error); // Ghi lại lỗi ra console
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

// API xóa sự kiện theo _ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra tính hợp lệ của ID
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
    console.error('Lỗi khi xóa sự kiện:', error); // Ghi lại lỗi ra console
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

module.exports = router;
