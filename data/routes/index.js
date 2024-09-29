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

// Kiểm tra file upload
function checkFileUpLoad(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Bạn chỉ được upload file ảnh'));
  }
  cb(null, true);
}

// Upload file
let upload = multer({ storage: storage, fileFilter: checkFileUpLoad });
const connectDb = require('../models/db');

router.get('/', async (req, res, next) => {
  res.render('api');
});

// Trả về json danh sách sản phẩm
router.get('/phim', async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection('phim');
  const phim = await productCollection.find().toArray();
  if (phim) {
    res.status(200).json(phim);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

// Thêm API để lấy danh sách sự kiện
router.get('/sukien', async (req, res, next) => {
  const db = await connectDb();
  const sukienCollection = db.collection('sukien');
  const sukien = await sukienCollection.find().toArray();
  if (sukien) {
    res.status(200).json(sukien);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

module.exports = router;
