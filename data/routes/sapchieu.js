var express = require('express');
var router = express.Router();
const multer = require('multer');
const connectDb = require('../models/db');
const { ObjectId } = require('mongodb'); // Thêm ObjectId để sử dụng

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

//---------------------------Movies--------------------------------//

// Lấy danh sách phim
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

// Thêm phim mới
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const db = await connectDb();
    const movieCollection = db.collection('phim');
    const newMovie = {
      Ten: req.body.Ten,
      TheLoai: JSON.parse(req.body.TheLoai), // Chuyển đổi chuỗi JSON thành object
      Anh: req.file.filename, // Tên file đã được lưu
      IdDanhMuc: req.body.IdDanhMuc,
      TrangThai: req.body.TrangThai,
      MoTa: JSON.parse(req.body.MoTa), // Chuyển đổi chuỗi JSON thành object
      ThongTinPhim: req.body.ThongTinPhim
    };

    const result = await movieCollection.insertOne(newMovie);
    res.status(201).json({ message: 'Movie added successfully', movieId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Error adding movie', error });
  }
});

// Sửa phim theo ID
router.put('/:id', upload.single('image'), async (req, res) => {
  const movieId = req.params.id;

  try {
    const db = await connectDb();
    const movieCollection = db.collection('phim');
    
    const updateData = {
      Ten: req.body.Ten,
      TheLoai: JSON.parse(req.body.TheLoai),
      Anh: req.file ? req.file.filename : undefined, // Nếu có ảnh mới thì cập nhật
      IdDanhMuc: req.body.IdDanhMuc,
      TrangThai: req.body.TrangThai,
      MoTa: JSON.parse(req.body.MoTa),
      ThongTinPhim: req.body.ThongTinPhim
    };

    // Xóa các trường undefined
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    const result = await movieCollection.updateOne({ _id: new ObjectId(movieId) }, { $set: updateData });
    
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Movie updated successfully' });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating movie', error });
  }
});

// Xóa phim theo ID
router.delete('/:id', async (req, res) => {
  const movieId = req.params.id;

  try {
    const db = await connectDb();
    const movieCollection = db.collection('phim');
    const result = await movieCollection.deleteOne({ _id: new ObjectId(movieId) });
    
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Movie deleted successfully' });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting movie', error });
  }
});

module.exports = router;
