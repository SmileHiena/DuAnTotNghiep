var express = require("express");
var router = express.Router();
const { ObjectId } = require("mongodb");
const connectDb = require("../models/db"); // Giả sử đây là file kết nối DB
const multer = require("multer");
const path = require("path");



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Create multer instance
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Bạn chỉ được upload file ảnh"));
    }
    cb(null, true);
  },
});


router.get("/", async (req, res) => {
    try {
      const db = await connectDb();
      const blogCollection = db.collection("Lichchieu");
      const blogs = await blogCollection.find().toArray();
  
      if (blogs.length > 0) {
        res.status(200).json(blogs);
      } else {
        res.status(404).json({ message: "No blogs found" });
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });




  router.get("/:id/phong", async (req, res) => {
    const lichId = parseInt(req.params.id); // Chuyển đổi ID từ chuỗi sang số
    console.log(`Fetching details for schedule with ID: ${lichId}`);
  
    try {
      const db = await connectDb(); // Kết nối đến MongoDB
      const lichCollection = db.collection('Lichchieu');
      const phongCollection = db.collection('Phong'); // Chỉnh sửa tên biến từ lichDetailCollection thành phongCollection
  
      // Tìm lịch theo ID
      const lich = await lichCollection.findOne({ id: lichId });
      console.log('Schedule found:', lich);
  
      if (lich) {
        // Nếu tìm thấy lịch, tìm tất cả chi tiết phòng tương ứng bằng idLichChieu
        const phongDetails = await phongCollection.find({ idLichChieu: lich.id }).toArray(); // Sử dụng find và toArray để lấy tất cả
  
        console.log('Phong details found:', phongDetails); // Sửa tên biến từ blogDetails thành phongDetails
  
        if (phongDetails.length > 0) {
          res.status(200).json(phongDetails); // Trả về mảng các chi tiết phòng
        } else {
          res.status(404).json({ message: "Chi tiết phòng không tìm thấy!" });
        }
      } else {
        res.status(404).json({ message: "Lịch không tìm thấy!" });
      }
    } catch (error) {
      console.error("Error fetching schedule detail:", error);
      res.status(500).json({ message: "Lỗi server!" });
    }
  });
  
  module.exports = router;