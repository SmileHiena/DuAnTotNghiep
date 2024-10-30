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
;


router.get("/:id/xuatchieu", async (req, res) => {
    const phongId = parseInt(req.params.id); // Chuyển đổi ID từ chuỗi sang số
    console.log(`Fetching details for schedule with ID: ${phongId}`);
  
    try {
      const db = await connectDb(); // Kết nối đến MongoDB
      const phongCollection = db.collection('Phong');
      const xuatchieuCollection = db.collection('xuatchieu'); // Chỉnh sửa tên biến từ lichDetailCollection thành xuatchieuCollection
  
      // Tìm lịch theo ID
      const lich = await phongCollection.findOne({ id: phongId });
      console.log('Schedule found:', lich);
  
      if (lich) {
        // Nếu tìm thấy lịch, tìm tất cả chi tiết phòng tương ứng bằng idLichChieu
        const phongDetails = await xuatchieuCollection.find({ maPhong: lich.id }).toArray(); // Sử dụng find và toArray để lấy tất cả
  
        console.log('Phong details found:', phongDetails); // Sửa tên biến từ blogDetails thành phongDetails
  
        if (phongDetails.length > 0) {
          res.status(200).json(phongDetails); // Trả về mảng các chi tiết phòng
        } else {
          res.status(404).json({ message: "Chi tiết phòng không tìm thấy!" });
        }
      } else {
        res.status(404).json({ message: "Xuatchieu không tìm thấy!" });
      }
    } catch (error) {
      console.error("Error fetching schedule detail:", error);
      res.status(500).json({ message: "Lỗi server!" });
    }
  });
  
module.exports = router; // Đảm bảo rằng router được xuất khẩu