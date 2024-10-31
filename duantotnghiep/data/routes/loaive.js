var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');
const connectDb = require('../models/db');
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, (file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Bạn chỉ được upload file ảnh"));
    }
    cb(null, true);
  }
});


// Fetch all suatchieu
router.get("/", async (req, res) => {
    try {
      const db = await connectDb();
      const suatchieuCollection = db.collection("loaive");
      const suatchieu = await suatchieuCollection.find().toArray();
  
      if (suatchieu.length > 0) {
        res.status(200).json(suatchieu);
      } else {
        res.status(404).json({ message: "No suatchieu found" });
      }
    } catch (error) {
      console.error("Error fetching suatchieu:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  // Route để tính tổng tiền
router.post('/total', async (req, res) => {
  try {
    const { comboQuantities, loaiVeQuantities } = req.body; // Lấy thông tin số lượng từ body

    const db = await connectDb();
    
    // Lấy danh sách combo
    const comboCollection = db.collection('combo');
    const combos = await comboCollection.find({}).toArray();

    // Lấy danh sách loại vé
    const loaiVeCollection = db.collection('loaive');
    const loaiVe = await loaiVeCollection.find({}).toArray();

    let totalPrice = 0;

    // Tính tổng tiền cho combo
    combos.forEach(combo => {
      const quantity = comboQuantities[combo.id] || 0; // Số lượng combo từ yêu cầu
      totalPrice += combo.Gia * quantity;
    });

    // Tính tổng tiền cho loại vé
    loaiVe.forEach(ve => {
      const quantity = loaiVeQuantities[ve.id] || 0; // Số lượng loại vé từ yêu cầu
      totalPrice += ve.GiaVe * quantity;
    });

    res.status(200).json({ totalPrice: totalPrice });
  } catch (error) {
    console.error("Error calculating total price:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


  module.exports = router;