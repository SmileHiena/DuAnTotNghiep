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

module.exports = router; // Đảm bảo rằng router được xuất khẩu
