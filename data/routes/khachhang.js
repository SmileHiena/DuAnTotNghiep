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
let upload = multer({ storage: storage, fileFilter: checkFileUpLoad }).single(
  "avatar"
);

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


// Thêm khách hàng mới
router.post("/", async (req, res) => {
  const { Ten, DiaChi, SDT, NgaySinh } = req.body;
  const Anh = req.file ? req.file.filename : null; // Lấy tên file ảnh đã upload

  const newCustomer = {
    Ten,
    DiaChi,
    SDT,
    NgaySinh,
    Anh,
  };

  try {
    const db = await connectDb();
    const khachhangCollection = db.collection("khachhang");
    await khachhangCollection.insertOne(newCustomer);
    res.status(201).json({ message: "Thêm khách hàng thành công" });
  } catch (error) {
    console.error("Error adding customer:", error);
    res.status(500).json({ message: "Failed to add customer" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      HoTen,
      TenDangNhap,
      MatKhau,
      DiaChi,
      NgaySinh,
      GioTinh,
      SDT,
      ChucVu,
    } = req.body;

    const db = await connectDb();
    const collection = db.collection("khachhang"); // Đảm bảo bạn đang truy cập đúng collection

    const updatedCustomer = {
      HoTen,
      TenDangNhap,
      MatKhau,
      DiaChi,
      NgaySinh,
      GioTinh,
      SDT,
      ChucVu,
    };

    // Nếu có ảnh mới, cập nhật tên file ảnh
    if (req.file) {
      updatedCustomer.Anh = req.file.filename; // Lưu tên file ảnh mới
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedCustomer }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Không tìm thấy khách hàng để cập nhật" });
    } else {
      return res.json({ message: "Cập nhật thông tin khách hàng thành công" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra", error: error.message });
  }
});


// Xóa khách hàng
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connectDb();
    const khachhangCollection = db.collection("khachhang");
    await khachhangCollection.deleteOne({ _id: ObjectId(id) });
    res.status(200).json({ message: "Xóa khách hàng thành công" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ message: "Failed to delete customer" });
  }
});

module.exports = router;