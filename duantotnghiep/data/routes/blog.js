var express = require("express");
var router = express.Router();
const multer = require("multer");
const { ObjectId } = require("mongodb");
const connectDb = require("../models/db");
const cors = require("cors");

// Sử dụng CORS
router.use(cors()); // Thêm middleware CORS

// Thiết lập nơi lưu trữ và tên file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/"); // Thư mục lưu trữ ảnh
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Tên file độc nhất
  },
});

// Kiểm tra file upload (chỉ chấp nhận ảnh)
function checkFileUpload(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Bạn chỉ được upload file ảnh"));
  }
  cb(null, true);
}

// Upload file với kiểm tra ảnh
let upload = multer({ storage: storage, fileFilter: checkFileUpload });

// API lấy danh sách blog
router.get("/", async (req, res) => {
  try {
    const db = await connectDb();
    const blogCollection = db.collection("blog");
    const blogs = await blogCollection.find().toArray();

    if (blogs.length > 0) {
      res.status(200).json(blogs);
    } else {
      res.status(404).json({ message: "Không có blog nào được tìm thấy" });
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bl og:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
});

module.exports = router;