var express = require('express');
var router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');


//Thiết lập nơi lưu trữ và tên file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/'); // Thư mục lưu trữ ảnh
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Tên file độc nhất
  }
});

//Kiểm tra file upload
function checkFileUpLoad(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Bạn chỉ được upload file ảnh'));
  }
  cb(null, true);
}

//Upload file
let upload = multer({ storage: storage, fileFilter: checkFileUpLoad });
const connectDb = require('../models/db');

//---------------------------Products--------------------------------//
// Generate a token for password reset
function generateToken() {
  return crypto.randomBytes(20).toString('hex');
}

router.get('/', async (req, res) => {
  try {
    const trangThai = req.query.trangThai; // Lấy trạng thái từ query
    const db = await connectDb();
    const moviesCollection = db.collection('phim'); // Đảm bảo collection tên đúng

    // Nếu có trạng thái, lọc theo trạng thái
    const query = trangThai ? { TrangThai: trangThai } : {};
    const movies = await moviesCollection.find(query).toArray();

    res.status(200).json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: 'Failed to fetch movies' });
  }
});


// //Trả về json danh sách sản phẩm
// router.get('/api/Movie', async (req, res, next) => {
//   const db = await connectDb();
//   const productCollection = db.collection('phim');
//   const phim = await productCollection.find().toArray();
//   if (phim) {
//     res.status(200).json(phim);
//   } else {
//     res.status(404).json({ message: 'Not found' });
//   }
// });



module.exports = router;