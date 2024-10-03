var express = require('express');
var router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const crypto = require('crypto');

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

//---------------------------Products--------------------------------//

// Lấy dAnh sách phim
router.get('/', async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection('phim');
  const phim = await productCollection.find().toArray();
  if (phim) {
    res.status(200).json(phim);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});


// Thêm phim mới
router.post('/', upload.single('Anh'), async (req, res, next) => {
  const { id, Ten, TheLoai, IdDanhMuc, TrangThai, MoTa, ThongTinPhim, Anh: AnhInput } = req.body;
  const Anh = req.file ? req.file.filename : AnhInput; // Lấy file ảnh hoặc từ input
  
  // Kiểm tra các trường bắt buộc
  if (!id || !Ten || !TheLoai || !IdDanhMuc || !TrangThai || !MoTa || !ThongTinPhim || !Anh) {
    return res.status(400).json({ message: 'Missing required fields. Please make sure all fields are filled.' });
  }

  try {
    const db = await connectDb();
    const productCollection = db.collection('phim');

    const newPhim = {
      id,
      Ten,
      TheLoai,
      Anh, // Có thể là tên file hoặc URL từ input
      IdDanhMuc,
      TrangThai,
      MoTa,
      ThongTinPhim,
      createdAt: new Date()
    };

    const result = await productCollection.insertOne(newPhim);
    res.status(201).json({ message: 'Thêm phim thành công', phim: result.ops[0] });
  } catch (error) {
    console.error("Lỗi khi thêm phim:", error);
    res.status(500).json({ message: 'Lỗi khi thêm phim', error: error.message });
  }
});


// Sửa phim
router.put('/phim:id', upload.single('Anh'), async (req, res, next) => {
  const { id } = req.params;
  const { Ten, TheLoai, IdDanhMuc, TrangThai, MoTa, ThongTinPhim } = req.body;
  const Anh = req.file ? req.file.filename : null;

  const db = await connectDb();
  const productCollection = db.collection('phim');

  const updatedPhim = {
    Ten,
    TheLoai,
    IdDanhMuc,
    TrangThai,
    MoTa,
    ThongTinPhim,
    ...(Anh && { Anh }) // Chỉ cập nhật Anh nếu người dùng upload ảnh mới
  };

  try {
    const result = await productCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedPhim }
    );
    
    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Cập nhật phim thành công' });
    } else {
      res.status(404).json({ message: 'Phim không tồn tại' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật phim', error: error.message });
  }
});

// Cập nhật phim theo ID
router.put('/product/:id', upload.single('Anh'), async (req, res, next) => {
  let id = req.params.id;
  const db = await connectDb();
  const phimCollection = db.collection('phim');

  // Lấy thông tin từ request body
  let { Ten, TheLoai, IdDanhMuc, TrangThai, MoTa, ThongTinPhim } = req.body;

  // Xử lý ảnh
  let Anhfile;
  if (req.file) {
    Anhfile = req.file.filename; // Nếu có file ảnh, sử dụng tên file
  } else {
    // Nếu không có file, tìm phim trong cơ sở dữ liệu
    let phim = await phimCollection.findOne({ _id: new ObjectId(id) }); // Khởi tạo ObjectId với new
    if (phim) {
      Anhfile = phim.Anh; // Lấy ảnh cũ
    } else {
      return res.status(404).json({ message: 'Phim không tồn tại' }); // Phim không tồn tại
    }
  }

  // Tạo đối tượng để cập nhật
  let editphim = {
    Ten,
    TheLoai,
    IdDanhMuc,
    TrangThai,
    MoTa,
    ThongTinPhim,
    Anh: Anhfile // Đảm bảo sử dụng Anhfile
  };

  try {
    const result = await phimCollection.updateOne({ _id: new ObjectId(id) }, { $set: editphim }); // Cập nhật phim
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Cập nhật phim thành công', phim: editphim });
    } else {
      res.status(404).json({ message: 'Phim không tồn tại hoặc không có thay đổi' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật phim', error });
  }
});


// Xóa phim
router.delete('/phim:id', async (req, res, next) => {
  const { id } = req.params;

  // Kiểm tra ID có độ dài 24 ký tự và chỉ chứa các ký tự hex
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID không hợp lệ' });
  }

  const db = await connectDb();
  const phimCollection = db.collection('phim');

  try {
    const result = await phimCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Xóa phim thành công' });
    } else {
      res.status(404).json({ message: 'Phim không tồn tại' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa phim', error: error.message });
  }
});


module.exports = router;
