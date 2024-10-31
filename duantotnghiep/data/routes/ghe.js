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
router.get("/:id/xuatchieu", async (req, res) => {
  const gheid = parseInt(req.params.id); // Chuyển đổi ID từ chuỗi sang số
  console.log(`Fetching details for schedule with ID: ${gheid}`);

  try {
    const db = await connectDb(); // Kết nối đến MongoDB
    const xuatchieuCollection = db.collection("xuatchieu");
    const ghecollection = db.collection("ghe"); // Chỉnh sửa tên biến từ lichDetailCollection thành ghecollection

    // Tìm lịch theo ID
    const lich = await xuatchieuCollection.findOne({ id: gheid });
    console.log("Schedule found:", lich);

    if (lich) {
      // Nếu tìm thấy lịch, tìm tất cả chi tiết phòng tương ứng bằng idLichChieu
      const phongDetails = await ghecollection
        .find({ maXuatChieu: lich.id })
        .toArray(); // Sử dụng find và toArray để lấy tất cả

      console.log("Phong details found:", phongDetails); // Sửa tên biến từ blogDetails thành phongDetails

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

// // API đặt ghế
// router.post("/datve", async (req, res) => {
//   const { id } = req.body;

//   if (!id) {
//     return res.status(400).json({ message: "ID ghế không được cung cấp!" });
//   }

//   try {
//     const db = await connectDb();
//     const gheCollection = db.collection("ghe");

//     const ghe = await gheCollection.findOne({ id: id });
    
//     if (!ghe) {
//       console.error("Ghế không tìm thấy:", id);
//       return res.status(404).json({ message: "Ghế không tìm thấy!" });
//     }

//     if (ghe.trangThai !== "Trống") {
//       console.log("Ghế đã được đặt:", ghe);
//       return res.status(400).json({ message: "Ghế đã được đặt!" });
//     }

//     await gheCollection.updateOne(
//       { id: id },
//       { $set: { trangThai: "Đã đặt" } }
//     );

//     console.log("Đặt ghế thành công:", ghe);
//     return res.status(200).json({ message: "Đặt ghế thành công!", ghe });
//   } catch (error) {
//     console.error("Error while booking seat:", error);
//     return res.status(500).json({ message: "Lỗi server!" });
//   }
// });



module.exports = router; // Đảm bảo rằng router được xuất khẩu
