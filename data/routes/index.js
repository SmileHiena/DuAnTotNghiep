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
const connectDb = require('../model/db');

//---------------------------Products--------------------------------//
// Generate a token for password reset
function generateToken() {
  return crypto.randomBytes(20).toString('hex');
}

router.get('/', async (req, res, next) => {
  res.render('api');
});


// Lấy sản phẩm hot
router.get('/products/hot', async (req, res, next) => {
  try {
    const db = await connectDb();
    const productCollection = db.collection('products');
    const hotProducts = await productCollection.find({ hot: 1 }).toArray();
    if (hotProducts.length > 0) {
      res.status(200).json(hotProducts);
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm nào được đánh dấu là hot" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// Lấy sản phẩm bestsale
router.get('/products/bestsale', async (req, res, next) => {
  try {
    const db = await connectDb();
    const productCollection = db.collection('products');
    const bestsaleProducts = await productCollection.find({ bestsale: 1 }).toArray();
    if (bestsaleProducts.length > 0) {
      res.status(200).json(bestsaleProducts);
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm nào được đánh dấu là bestsale" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

//Trả về json danh sách sản phẩm
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



module.exports = router;

