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


router.get('/:id', async (req, res) => {
  try {
    const db = await connectDb();
    const moviesCollection = db.collection('phim');

    // Lấy thông tin phim theo ID
    const movieId = req.params.id;
    const movie = await moviesCollection.findOne({ id: movieId });

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Lấy phim tương tự theo thể loại của phim hiện tại
    const similarMovies = await moviesCollection
      .find({ "TheLoai.KieuPhim": movie.TheLoai.KieuPhim, id: { $ne: movieId } })
      .limit(4) // Giới hạn số lượng phim tương tự
      .toArray();

    // Trả về cả phim chi tiết và phim tương tự
    res.status(200).json({
      movie,
      similarMovies
    });
  } catch (error) {
    console.error('Error fetching movie and similar movies:', error);
    res.status(500).json({ message: 'Failed to fetch movie data' });
  }
});


router.get('/', async (req, res) => {
  try {
    const trangThai = req.query.trangThai; // Lấy trạng thái từ query (nếu có)
    const theLoai = req.query.theLoai; // Lấy thể loại từ query (nếu có)
    
    const db = await connectDb();
    const moviesCollection = db.collection('phim'); // Đảm bảo collection tên đúng

    // Xây dựng query để lọc
    const query = {};

    // Nếu có trạng thái, thêm điều kiện lọc theo trạng thái
    if (trangThai) {
      query.TrangThai = trangThai;
    }

    // Nếu có thể loại, thêm điều kiện lọc theo thể loại
    if (theLoai) {
      query['TheLoai.KieuPhim'] = { $regex: new RegExp(theLoai, 'i') }; // Tìm kiếm không phân biệt hoa thường
    }

    // Tìm phim dựa trên query đã xây dựng
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