var express = require("express");
var router = express.Router();
const multer = require("multer");
const connectDb = require("../models/db");
const path = require("path");
const { ObjectId } = require("mongodb");

// Thiết lập nơi lưu trữ và tên file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/"); // Thư mục lưu ảnh
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    ); // Tạo tên file duy nhất
  },
});

// Kiểm tra file upload (chỉ chấp nhận file ảnh)
function checkFileUpLoad(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Bạn chỉ được upload file ảnh"));
  }
  cb(null, true);
}

// Upload file
let upload = multer({ storage: storage, fileFilter: checkFileUpLoad });

// Lấy tất cả khách hàng
router.get("/", async (req, res) => {
  try {
    const db = await connectDb();
    const khachhangCollection = db.collection("khachhang");
    const khachhang = await khachhangCollection.find().toArray();
    res.status(200).json(khachhang);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ message: "Failed to fetch customers" });
  }
});

// Route để tìm khách hàng theo ID
router.get("/:id", async (req, res) => {
  const { id } = req.params; // Lấy ID từ params

  try {
    const db = await connectDb();
    const khachhangCollection = db.collection("khachhang");
    
    // Tìm khách hàng theo ID
    const customer = await khachhangCollection.findOne({ _id: new ObjectId(id) });
    
    if (!customer) {
      return res.status(404).json({ message: "Khách hàng không tồn tại" });
    }

    res.status(200).json(customer); // Trả về thông tin khách hàng
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ message: "Lỗi khi tìm khách hàng" });
  }
});

router.post('/', upload.single('Anh'), async (req, res, next) => {
  try {
    const {Ten, DiaChi, SDT, NgaySinh} = req.body;
    const Anh = req.file ? req.file.filename : null;
    const db = await connectDb();
    const usersCollection = db.collection('khachhang');
    const lastUser = await usersCollection.find().sort({ id: -1 }).limit(1).toArray();
    const id = lastUser[0] ? lastUser[0].id + 1 : 1;
    const newUser = {
    id,
    Ten, 
    DiaChi,
    SDT,
    NgaySinh,
    Anh
  };
    await usersCollection.insertOne(newUser);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Thêm người dùng
// router.post('/', upload.single('Anh'), async (req, res) => {
//   try {
//     const { Ten, DiaChi, SDT, NgaySinh } = req.body;
//     const Anh = req.file ? req.file.filename : null; // Lấy tên file từ req.file

//     const newCustomer = {
//       Ten,
//       DiaChi,
//       SDT,
//       NgaySinh,
//       Anh,
//     };

//     // Lưu khách hàng vào database
//     await usersCollection.insertOne(newCustomer);
//     res.status(201).json(newCustomer); // Trả về khách hàng vừa thêm
//   } catch (error) {
//     console.error("Error adding customer:", error);
//     res.status(500).json({ message: error.message });
//   }
// });

// Sửa thông tin khách hàng
router.put('/:id', upload.single('image'), async (req, res) => { // Thêm middleware upload
  try {
    const id = req.params.id;

    // Kiểm tra định dạng ObjectId hợp lệ
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID không hợp lệ.' });
    }

    const db = await connectDb();
    const usersCollection = db.collection('khachhang');

    // Lấy thông tin từ request body
    const updateData = {
      Ten: req.body.Ten,
      DiaChi: req.body.DiaChi,
      SDT: req.body.SDT,
      NgaySinh: req.body.NgaySinh,
      Anh: req.file ? req.file.filename : undefined, // Nếu có ảnh mới thì cập nhật
    };

    // Xóa các trường undefined
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
    }

    res.status(200).json({ message: "Cập nhật thành công", updatedUser: updateData });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật thông tin người dùng.' });
  }
});

// Xóa khách hàng
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connectDb();
    const khachhangCollection = db.collection("khachhang");
    const result = await khachhangCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Khách hàng không tồn tại" });
    }

    res.status(200).json({ message: "Xóa khách hàng thành công" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ message: "Failed to delete customer" });
  }
});

module.exports = router;
