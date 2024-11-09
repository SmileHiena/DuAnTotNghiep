// admin.js
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const bcrypt = require("bcrypt");
const { ObjectId } = require('mongodb');
const path = require('path');
// Thiết lập nơi lưu trữ và tên file
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        // Thêm timestamp để tránh xung đột tên file
        cb(null, Date.now() + '-' + file.originalname);
    },
});

// Kiểm tra file upload
function checkFileUpLoad(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("Bạn chỉ được upload file ảnh"));
    }
    cb(null, true);
}

// Upload file
let upload = multer({ storage: storage, fileFilter: checkFileUpLoad });

// Import model
const connectDb = require("../models/db");

router.post("/login", async (req, res, next) => {
    const { usernameOrEmail, MatKhau } = req.body;

    try {
        const db = await connectDb();
        const employeeCollection = db.collection("admin");
        let user = await employeeCollection.findOne({
            TenDangNhap: usernameOrEmail.toLowerCase(),
        });

        if (!user) {
            return res.status(404).json({ message: "Tên đăng nhập không đúng" });
        }

        // Kiểm tra mật khẩu
        const isPasswordCorrect = await bcrypt.compare(MatKhau, user.MatKhau);
        if (!isPasswordCorrect) {
            return res.status(403).json({ message: "Mật khẩu không chính xác" });
        }

        // Tạo JWT token
        const adminToken = jwt.sign(
            {
                id: user._id,
                TenDangNhap: user.TenDangNhap,
                Email: user.Email,
                SDT: user.SDT,
                HoTen: user.HoTen,
                IsAdmin: user.IsAdmin,
                ChucVu: user.ChucVu,
                Quyen: user.Quyen,
            },
            process.env.JWT_SECRET || "secretkey",
            { expiresIn: "1h" }
        );

        // Trả về thông tin nhân viên và adminToken
        res.status(200).json({
            adminToken: adminToken,
            TenDangNhap: user.TenDangNhap,
            Email: user.Email,
            SDT: user.SDT,
            HoTen: user.HoTen,
            IsAdmin: user.IsAdmin,
            ChucVu: user.ChucVu,
            Quyen: user.Quyen,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server, vui lòng thử lại." });
    }
});


// API để lấy thông tin nhân viên chi tiết
router.get('/detailadmin', async (req, res, next) => {
    const adminToken = req.headers.authorization;

    if (!adminToken) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const bearerToken = adminToken.split(' ')[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET || "secretkey", async (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Token không hợp lệ" });
        }

        // Kiểm tra xem người dùng có phải là admin không
        if (user.IsAdmin !== 0) {
            return res.status(403).json({ message: "Chỉ nhân viên có quyền truy cập" });
        }

        const db = await connectDb();
        const employeeCollection = db.collection('admin');
        const userInfo = await employeeCollection.findOne({ TenDangNhap: user.TenDangNhap });

        if (userInfo) {
            res.status(200).json(userInfo);
        } else {
            res.status(404).json({ message: "Không tìm thấy nhân viên" });
        }
    });
});


module.exports = router;